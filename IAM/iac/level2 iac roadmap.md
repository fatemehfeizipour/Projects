# Level 2: Infrastructure as Code — Terraform, CloudFormation, CDK

**Goal:** recreate the Level 1 console-built IAM structure (groups, policies, users, password policy, MFA enforcement) using all three major IaC approaches, to build fluency in each and produce a direct comparison.

This is documented as a separate phase/repo folder from Level 1, since the console build and the IaC build are different skills being demonstrated, and mixing them muddies both.

---

## Scope for Level 2

Same IAM structure as Level 1, defined as code instead of console clicks:

- 5 IAM groups (Developers, Operations, Finance, Analysts, Administrators)
- Group policies (managed + custom inline, matching Level 1 exactly)
- IAM users, group memberships
- Account password policy
- `Require-MFA` policy, attached to all groups
- *(Stretch)* VPC + subnets + NAT Gateway + ALB + S3 gateway endpoint, to also codify the architecture, not just IAM

**Out of scope for Level 2 initially:** EC2/RDS instance provisioning itself (focus stays on IAM + optionally networking, since that's the core of the security exercise) - can be added as Level 3 if useful.

---

## 1. Terraform

**Why first:** most transferable skill across cloud providers, largest community/job-market relevance, and IAM resources map close to 1:1 (`aws_iam_group`, `aws_iam_policy`, `aws_iam_user`, `aws_iam_group_membership`, `aws_iam_group_policy_attachment`).

**Structure to build:**
```
iac/terraform/
├── main.tf
├── variables.tf
├── outputs.tf
├── iam-groups.tf
├── iam-policies.tf         # custom policy JSON as heredocs or separate .json files
├── iam-users.tf
├── account-settings.tf     # password policy
└── modules/
    └── (optional) vpc/     # stretch goal
```

**Things worth documenting as you build:**
- How Terraform state works and why `.tfstate` shouldn't be committed to the repo (add to `.gitignore`, mention remote state / S3 backend as the production-correct approach)
- How to reference custom policy JSON - inline `jsonencode()` vs. separate `.json` files loaded via `file()` - and which you chose and why
- Any place Terraform's plan/apply caught a mistake before it hit AWS (a good talking point - "IaC caught this before I even ran it" is a strong interview anecdote)

---

## 2. AWS CloudFormation

**Why second:** native AWS service, no state file to manage (AWS manages it via stacks), useful to understand since many existing AWS shops still use it.

**Structure to build:**
```
iac/cloudformation/
├── iam-stack.yaml          # or .json, your choice — document which and why
└── parameters.json         # if using parameterized values (bucket names, etc.)
```

**Things worth documenting:**
- How CloudFormation's declarative YAML compares to Terraform's HCL for the same resource (put a side-by-side snippet in your docs - e.g., one IAM group definition in both languages)
- Stack rollback behavior - what happens if a deploy fails partway through, compared to Terraform's plan/apply model
- Drift detection - a CloudFormation-specific concept worth knowing and mentioning

---

## 3. AWS CDK

**Why third (after the other two are solid):** CDK compiles down to CloudFormation under the hood, so having CloudFormation experience first makes CDK's abstractions easier to understand rather than feeling like magic.

**Structure to build:**
```
iac/cdk/
├── bin/
│   └── app.ts               # or .py, depending on language chosen
├── lib/
│   └── iam-stack.ts
└── cdk.json
```

**Language choice:** TypeScript or Python are the two most common - pick based on which is more relevant to your target job market, and note that choice explicitly in your docs.

**Things worth documenting:**
- How CDK constructs (e.g., `iam.Group`, `iam.Policy`) compare to writing raw CloudFormation/Terraform - where the abstraction saves real effort vs. where it obscures what's actually being created
- `cdk synth` output - show that it produces the same underlying CloudFormation template, closing the loop with section 2

---

## Comparison table (fill in once all three are built)

| | Terraform | CloudFormation | CDK |
|---|---|---|---|
| Language | HCL | YAML/JSON | TypeScript/Python/etc. |
| State management | Self-managed (local/remote backend) | AWS-managed | AWS-managed (via CFN) |
| Learning curve | | | |
| Readability for this project's size | | | |
| Multi-cloud portability | Yes | No (AWS-only) | No (AWS-only) |
| Best for... | | | |

*(Fill in the blank cells after building all three - this table is the actual payoff of doing the exercise three times, and a strong artifact for interviews.)*

---

## Suggested order of work

1. Terraform - full IAM structure, tested against your existing AWS account (in a way that doesn't conflict with the console-built resources - consider a separate account or clearly-prefixed resource names, e.g., `tf-Developers` vs. `Developers`)
2. Write the Terraform section of the comparison table while it's fresh
3. CloudFormation - same structure
4. Write that section of the table
5. CDK - same structure, referencing the CloudFormation output via `cdk synth`
6. Finish the comparison table, write a short closing section: "which would I reach for, and when"

## Documentation deliverable for Level 2

A separate `iac/README.md` (not merged into the Level 1 documentation) covering:
- Why each tool was approached in this order
- The comparison table above, completed
- Any bugs/gotchas hit per tool
- Final recommendation: which tool for which situation (e.g., "Terraform for multi-cloud or team standardization, CDK when the team is already TypeScript/Python-heavy and wants programmatic constructs, CloudFormation when working in an AWS-only shop with existing CFN investment")
