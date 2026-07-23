# portfolio-infrastructure

Infrastructure as Code (AWS CDK, TypeScript) that provisions AWS Amplify Hosting for the [`my-portfolio`](../Nextjs-portfolio-amplify-project/my-portfolio) Next.js application.

This folder defines the Amplify App, its connected GitHub branch, and the build spec. It does **not** contain application code — see the sibling app folder for that.

## Why This Is Separate From the App

Application code and infrastructure code are kept apart deliberately:

- **Different lifecycles** — the app changes constantly; the hosting/build config changes rarely.
- **Different blast radius** — a bad app commit breaks a page; a bad infra change can break the whole deployment pipeline.
- **Cleaner CI/CD** — pushing to the app repo triggers Amplify's build. Changing *how* Amplify builds requires a deliberate `cdk deploy`, not an accidental side effect of an app commit.

## Prerequisites

- AWS CLI configured with credentials for the target account
- AWS CDK CLI: `npm install -g aws-cdk`
- A GitHub Personal Access Token (classic, with `repo` + `admin:repo_hook` scopes) stored in AWS Secrets Manager — see [Secrets](#secrets) below

## Setup

```bash
npm install
```

`aws-cdk-lib` and `@aws-cdk/aws-amplify-alpha` must be on matching version numbers (e.g. `2.261.0` and `2.261.0-alpha.0`). The Amplify `App` / `GitHubSourceCodeProvider` constructs live in the alpha package — `aws-cdk-lib/aws-amplify` only exposes low-level CloudFormation-mapped constructs.

One-time per AWS account/region, before the first deploy ever run in this account:

```bash
cdk bootstrap
```

## Secrets

The GitHub token Amplify uses to authenticate and create its webhook is stored in Secrets Manager, not in this repo:

```bash
aws secretsmanager create-secret \
  --name github-token \
  --secret-string "YOUR_TOKEN_HERE"
```

The stack reads this secret by name at synth/deploy time. To rotate it:

```bash
aws secretsmanager update-secret \
  --secret-id github-token \
  --secret-string "YOUR_NEW_TOKEN_HERE"
```

> Never commit a token to this repo or paste a live token anywhere outside the AWS CLI/console. If one is ever exposed, revoke it on GitHub immediately and replace it here.

## Stack Overview

`lib/portfolio-infrastructure-stack.ts` defines:

- An `amplify.App` connected to the app's GitHub repository
- A tracked branch (`main`) with auto-build enabled
- A build spec covering install → build → artifact output for the Next.js app

Notes specific to this setup, since the app lives in a subfolder of a monorepo rather than at the repo root:

- `repository` points at the monorepo (`Projects`), not at `my-portfolio` directly.
- `preBuild` includes a `cd` into the app's actual path before running install/build.
- `baseDirectory` in the build spec must match the app's build output — `out/` if the app is a static export (`output: 'export'` in `next.config.ts`), or the appropriate SSR output path otherwise.

## Commands

```bash
cdk synth    # render the CloudFormation template without deploying
cdk diff     # compare deployed stack against local changes
cdk deploy   # provision/update the Amplify App in AWS
cdk destroy  # tear down the stack
```

## Changing the Build or Hosting Config

Any change to the build command, environment variables, branch settings, or the Amplify resource itself happens **here**, not in the app repo:

1. Edit `lib/portfolio-infrastructure-stack.ts`
2. `cdk diff` to review the change
3. `cdk deploy` to apply it

Pushing to the app's `main` branch does not pick up changes made in this stack — those only take effect after a `cdk deploy`.
