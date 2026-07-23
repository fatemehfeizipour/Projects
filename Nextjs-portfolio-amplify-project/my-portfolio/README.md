# my-portfolio

Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. UI was scaffolded with Vercel's **v0** AI tool and iterated on by hand.

This is the **application** repo/folder. Hosting and CI/CD are provisioned separately as code — see [`../portfolio-infrastructure`](../portfolio-infrastructure).

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Icons: [lucide-react](https://lucide.dev)
- UI generated with [v0](https://v0.dev)

## Getting Started

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build — this is exactly what AWS Amplify runs in CI |
| `npm run start` | Serve the production build locally |

Always confirm `npm run build` succeeds locally before pushing — Amplify's build step will fail the same way CI would.

## Project Structure

```
my-portfolio/
├── src/
│   └── app/
│       ├── page.tsx        # homepage
│       ├── layout.tsx      # root layout
│       └── globals.css
├── next.config.ts
└── package.json
```

## Deployment

This app is deployed via **AWS Amplify Hosting**, connected to this repo's `main` branch. Every push to `main` triggers an automatic build and deploy — no manual steps required.

The Amplify App resource, build spec, and branch configuration are **not** defined here — they're provisioned as Infrastructure as Code in the sibling [`portfolio-infrastructure`](../portfolio-infrastructure) CDK project. Changing the build command, environment variables, or hosting config means editing that project and running `cdk deploy`, not editing anything in this folder.

## Environment Notes

- If `output: 'export'` is set in `next.config.ts`, this app builds as a fully static export (`out/`). If it's omitted, Amplify serves it with SSR support. Check the CDK stack's `baseDirectory` setting to see which mode the current deployment expects — the two need to agree.
