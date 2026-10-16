<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Git and deployment workflow

- `main` is the production branch. Perform all website development on `staging`.
- Before changes, inspect the active branch, working tree, and remote branches. Preserve existing work. Never reset branches, discard changes, or force-push.
- Reuse `staging` safely and keep it tracking `origin/staging`. Never directly commit or push development changes to `main`.
- Before committing website changes, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`; test the website locally. Report failures and do not describe unverified changes as tested.
- Push tested changes to `staging`, then verify the Vercel Preview deployment and test the preview. If dashboard access is unavailable, report that verification is pending.
- Create a pull request with base `main` and head `staging` after successful verification. Merge only after the user's explicit approval. Retain `staging` after merging.
- Vercel must use `main` for Production and `staging` for Preview in the existing project. Preserve the production domain and production environment variables. Do not create duplicate projects or expose secrets.
- Do not trigger production deployments during development or workflow setup. An approved merge to `main` is a separate production release action.
- Do not change GitHub repository settings without user approval. Ask before potentially destructive operations.
