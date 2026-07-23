# Nextjs-portfolio-amplify-project

A cloud-native personal portfolio: a Next.js site deployed to AWS Amplify Hosting, provisioned entirely through Infrastructure as Code (AWS CDK). The deployment pipeline is as much the point of this project as the site itself — every push to `main` triggers an automated build and deploy, with no manual console steps.

This folder holds two independent projects, kept separate on purpose:

```
Nextjs-portfolio-amplify-project/
├── my-portfolio/               # the Next.js application
└── portfolio-infrastructure/   # the CDK app that provisions AWS Amplify Hosting for it
```

| Folder | What it is | README |
|---|---|---|
| `my-portfolio/` | Application code — Next.js, TypeScript, Tailwind | [`my-portfolio/README.md`](./my-portfolio/README.md) |
| `portfolio-infrastructure/` | Infrastructure as Code — AWS CDK, provisions Amplify Hosting | [`portfolio-infrastructure/README.md`](./portfolio-infrastructure/README.md) |

## Why Two Projects

App code and infrastructure code are split deliberately: the app changes constantly and infrastructure changes rarely, a bug in one has a very different blast radius than a bug in the other, and it keeps CI/CD clean — a push to the app repo triggers a rebuild, while changing *how* the app is built or hosted is a deliberate, separate `cdk deploy`.

## Architecture

```
GitHub (main branch)
      │  push
      ▼
AWS Amplify Hosting  ──── auto build + deploy via webhook
      │
      ├── CloudFront   (CDN)
      ├── S3           (static assets)
      └── Route 53     (custom domain, optional)

Provisioning path:
portfolio-infrastructure (AWS CDK) → CloudFormation → Amplify App resource
```

## Quick Start

Run the app locally:

```bash
cd my-portfolio
npm install
npm run dev        # http://localhost:3000
```

Deploy or change hosting/build configuration:

```bash
cd portfolio-infrastructure
npm install
cdk bootstrap       # once per AWS account/region
cdk deploy
```

Full details, including secrets setup, build spec configuration, and troubleshooting notes, live in each subfolder's own README linked above.

Loom video: https://lnkd.in/g-_ZAGv8

## Tech Stack

Next.js · TypeScript · Tailwind CSS · AWS Amplify Hosting · AWS CDK · CloudFront · S3 · Route 53 (optional) · AWS Secrets Manager · GitHub (source + webhook trigger)
