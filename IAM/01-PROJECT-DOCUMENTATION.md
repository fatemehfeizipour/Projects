# AWS Cloud Security Consulting Project: IAM Access Control for a Fitness App Startup

**Role:** Cloud Engineer Consultant (portfolio project)
**Client (fictional):** StartupCo — early-stage fitness tracking app, 10 employees, 3 months on AWS

---

## 1. Problem Statement

StartupCo launched quickly and, like many early-stage startups, deferred security fundamentals to hit their launch date. By the time this engagement started, the situation was:

- All 10 employees shared root account credentials
- No separation of permissions between Developers, Operations, Finance, and Data Analysts
- No MFA, no password policy
- Root credentials shared via team chat
- Infrastructure: EC2, S3, RDS, CloudWatch, with separate dev/prod environments — all accessed the same way, by everyone

The risk: any single leaked credential (or disgruntled/careless employee) has unrestricted control over production infrastructure and customer fitness data. There is no audit trail distinguishing who did what, and no way to revoke one person's access without rotating credentials for the entire company.

**Goal:** design and implement a least-privilege IAM structure, secure the root user, and document an architecture that reflects both the current infrastructure and security-hardened improvements — without over-engineering for a 10-person company.

---

## 2. Architecture

### 2.1 Infrastructure diagram

Two environments (`VPC-Development`, `VPC-Production`), each with:

- **Public subnet:** Application Load Balancer (ALB), NAT Gateway
- **Private subnet:** EC2 (application server), RDS
- **S3 Gateway Endpoint:** private-subnet resources reach S3 without traversing the NAT Gateway or public internet
- **CloudWatch:** drawn *outside* both VPCs, since it is a regional/account-level service, not a VPC-scoped resource — EC2 and RDS in both environments push logs/metrics to it (dashed connections in the diagram, distinct from solid network-path arrows)

**Traffic flow (inbound):**
```
User → Internet Gateway → ALB (public subnet) → EC2 (private subnet)
```
The ALB terminates the user's connection and opens a *new*, separate connection to EC2 over the VPC's internal network. EC2 never has a public IP or a route to the Internet Gateway — its security group only accepts inbound traffic from the ALB's security group, not from `0.0.0.0/0`. This means EC2 is unreachable from the internet under any circumstance, even if its private IP were somehow discovered.

**Traffic flow (outbound, e.g., OS patches/dependencies):**
```
EC2 (private subnet) → NAT Gateway (public subnet) → Internet Gateway → internet
```

*[Insert final architecture diagram image here]*

### 2.2 Dev/Prod separation — decision and trade-offs

The brief specifies "several development and production environments" without prescribing an isolation strategy. Three options were evaluated:

| Option | Isolation strength | Complexity | Cost |
|---|---|---|---|
| Separate AWS accounts | Strongest — enforced by AWS itself | Highest (cross-account roles needed for any legitimate cross-env access) | Higher ops overhead |
| Separate VPCs, same account, tag-based IAM conditions | Network-isolated; IAM isolation depends on consistent tagging | Moderate | Two NAT Gateways + two ALBs running continuously |
| Same VPC, naming convention only | Weakest — no structural enforcement | Lowest | Lowest |

**Decision:** Separate VPCs within a single account, with IAM policy conditions on the `environment` resource tag (e.g., `aws:ResourceTag/environment = dev`). This gives real network isolation and a genuine (if tag-dependent) IAM boundary, appropriate for a 10-person company, without the operational overhead of full multi-account management.

**Documented limitation:** tag-based conditions only govern *existing* tagged resources; a policy would need an additional `ec2:CreateTags`-scoped statement to prevent creation of untagged resources that could otherwise slip outside the condition. Recommended as a future enhancement.

**Recommendation to the client:** as the company scales past ~20-30 employees or handles more sensitive data volume, migrate to separate AWS accounts (via AWS Organizations) for stronger isolation.

**Cost trade-off noted:** running two NAT Gateways and two ALBs continuously has an ongoing hourly cost. For a startup this size, scaling down or removing the dev NAT Gateway outside working hours is a reasonable cost-control measure.

### 2.3 Access/permission model diagram

*[Insert access model diagram image here]*

Groups map directly to the brief's team structure, plus one additional group for administrative access:

- `Developers` (4 users)
- `Operations` (2 users)
- `Finance` (1 user)
- `Analysts` (3 users)
- `Administrators` (break-glass/setup access, MFA-enforced, used sparingly)

---

## 3. Securing the Root User

Root user and root account are the same identity in AWS — a client-side terminology note clarified early in the project (the brief said "root account," which is informally used interchangeably with "root user").

Actions taken:

1. **MFA enabled** on the root user via virtual MFA app (free, no hardware dependency for a small team)
2. **Root access keys checked and confirmed absent** (or deleted, if present) — root should never have programmatic access keys, since they bypass MFA for API calls
3. **Root password rotated** (previous one was compromised by being shared in team chat) and stored in a password manager, access restricted to 1–2 people (CTO + one Ops lead)
4. **Root reserved for account-level actions only** (closing the account, changing support plan, certain billing/tax settings) — every day-to-day action now goes through the role-based IAM structure below
5. **Root login detection/alerting configured** (detective control, complementing the preventive controls above):

```
Root login event
    → CloudTrail (records login as a management event)
    → CloudWatch Logs (CloudTrail delivers events here)
    → CloudWatch Metric Filter (pattern: userIdentity.type = "Root")
    → CloudWatch Alarm (triggers if metric ≥ 1)
    → SNS Topic → email notification
```

Metric filter pattern used:
```
{ $.userIdentity.type = "Root" && $.eventType != "AwsServiceEvent" }
```

This ensures that even if root usage policy is violated, it's detected immediately rather than relying on trust alone.

*[Insert screenshot: MFA device assigned confirmation]*
*[Insert screenshot: Security credentials page — "Access keys: none"]*
*[Insert screenshot: CloudWatch alarm in "OK" / triggered state]*

---

## 4. IAM Users, Groups, and Permissions

### 4.1 Administrators group

An IAM user with `AdministratorAccess` was created to replace day-to-day root usage during setup and ongoing administration. This account is MFA-enforced and reserved for IAM/security configuration tasks — not routine daily work, which is handled through the role-based groups below.

### 4.2 Developers

| Requirement (brief) | Implementation |
|---|---|
| EC2 management | `AmazonEC2FullAccess` |
| S3 access for application files | Custom inline policy, scoped to the specific app-files bucket (both bucket and object ARNs), with read/write/delete — developers deploy files themselves in this setup |
| CloudWatch logs viewing | Custom inline policy: `logs:GetLogEvents`, `logs:DescribeLogGroups`, `logs:DescribeLogStreams`, `logs:FilterLogEvents` (no write/delete) |

**Why custom policies for S3 and Logs instead of AWS managed policies:** `AmazonS3ReadOnlyAccess` (the closest managed policy) grants access to *every* bucket in the account, including the bucket storing user data — not just application files. Scoping to a named bucket ARN enforces the boundary the brief implies but doesn't state explicitly.

**Why EC2 stayed as the broad managed policy:** the brief doesn't request per-environment restriction for Developers' EC2 access explicitly; a tag-conditioned version (limiting full access to `environment=dev` resources, read-only in `prod`) was designed and is documented as a planned enhancement (see §2.2 and Level 2 roadmap).

### 4.3 Operations

| Requirement (brief) | Implementation |
|---|---|
| Full EC2 access | `AmazonEC2FullAccess` |
| Full CloudWatch access | `CloudWatchFullAccess` |
| Systems Manager access | `AmazonSSMFullAccess` |
| RDS management | `AmazonRDSFullAccess` |

**Note:** CloudWatch (`cloudwatch:*`) and CloudWatch Logs (`logs:*`) are distinct AWS action namespaces despite both falling under the "CloudWatch" product umbrella. An early draft of this policy mistakenly attached `CloudWatchEventsFullAccess` (a third, unrelated namespace for EventBridge-style scheduled rules) — caught and corrected during review. Worth verifying `CloudWatchFullAccess` includes `logs:*` actions if Operations needs full log management, not just metrics/alarms/dashboards.

### 4.4 Finance

| Requirement (brief) | Implementation |
|---|---|
| Cost Explorer | Custom inline policy: `ce:GetCostAndUsage`, `ce:GetCostForecast`, `ce:GetDimensionValues`, `ce:GetTags` |
| AWS Budgets | `AWSBudgetsReadOnlyAccess` |
| Read-only resource access | `ViewOnlyAccess` |
| (Supporting) Billing visibility | `AWSBillingReadOnlyAccess` + `Billing` |

**Note:** Billing, Cost Explorer, and Budgets are three distinct permission surfaces in AWS, despite reading as one concept ("cost management") in the brief's summary. Each required its own policy.

**Open decision documented:** `AWSBudgetsReadOnlyAccess` allows viewing budgets but not creating/editing them. If the Finance Manager needs to create new budget alerts independently (rather than have them pre-configured), `AWSBudgetsActionsWithAWSResourceControlAccess` should be substituted.

### 4.5 Analysts

| Requirement (brief) | Implementation |
|---|---|
| Read-only S3 | `AmazonS3ReadOnlyAccess` (or custom bucket-scoped equivalent — see note) |
| Read-only database access | `AmazonRDSReadOnlyAccess` |

**Important distinction documented:** IAM-level RDS read-only access controls the RDS *API/metadata* (viewing instance configuration, status, snapshots) — it does **not** grant read access to rows/tables inside the database. That requires a separate database-level read-only credential (e.g., a Postgres/MySQL user with `SELECT`-only grants), which is outside IAM's scope and would need to be provisioned separately if Analysts need to query actual application data.

### 4.6 Account-wide security settings

**Password policy:**
- Minimum length: 14 characters
- Requires uppercase, lowercase, number, and symbol
- Expiration: 90 days
- Password reuse prevention: last 5 passwords
- Users may change their own password

**MFA enforcement:** a standalone customer-managed policy (`Require-MFA`) attached to all five groups. It allows any authenticated user to manage their own MFA device, but denies nearly all other actions unless `aws:MultiFactorAuthPresent` is true. This converts "users should have MFA" from a policy expectation into a technically enforced requirement — a user without MFA configured can do nothing except set it up.

*[Insert screenshot: IAM groups list]*
*[Insert screenshot: one group's attached policies]*
*[Insert screenshot: password policy settings]*
*[Insert screenshot: MFA devices list]*

---

## 5. Key Learnings

- **The brief's summary section and detailed implementation section are not redundant** — the detailed section is the authoritative source, and several requirements (CloudWatch for Developers, RDS read-only for Analysts, the specific service list for Operations' "full access") only appear there.
- **CloudWatch is not one thing.** Core CloudWatch (`cloudwatch:*`), CloudWatch Logs (`logs:*`), and CloudWatch Events/EventBridge (`events:*`) are separate permission namespaces that are easy to conflate when browsing the managed policy list.
- **IAM read-only ≠ database read-only.** IAM controls the AWS API surface; it has no visibility into what's inside a database or an S3 object. This distinction matters when a "read-only" requirement in a brief could mean either.
- **AWS managed policies are broad by design.** They're a good starting point but often don't respect resource-level boundaries a business actually needs (e.g., one bucket vs. all buckets). Custom inline policies with explicit ARNs are the difference between "access to the service" and "access to *this* resource."
- **Tag-based conditional access is powerful but fragile** — it depends entirely on consistent resource tagging, which is a process/discipline problem as much as a technical one.

---

## 6. Deliverables Checklist

- [x] Architecture diagram (infrastructure)
- [x] Architecture diagram (access/permission model)
- [x] Root user secured (MFA, credential rotation, key removal, login alerting)
- [x] IAM groups and users created
- [x] Least-privilege policies implemented per group
- [x] Account-wide MFA enforcement and password policy
- [x] Documentation (this file)
- [ ] Infrastructure as Code — Terraform / CloudFormation / CDK (see `LEVEL2-IAC-ROADMAP.md`)

---

*This project was built as a hands-on portfolio exercise for a fictional client scenario, to practice AWS IAM design, least-privilege policy authorship, and cloud security fundamentals.*
