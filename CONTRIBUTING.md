# Contributing to MarkGauge

Thanks for your interest in improving MarkGauge. This guide covers the local
workflow and conventions used in this repository.

## Getting set up

1. Fork and clone the repository.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the required keys
   (see the [README](README.md#environment-variables)).
4. Start the dev server: `npm run dev`.
5. For background jobs, run `npx inngest-cli@latest dev` in a second terminal.

## Branching

- Create a feature branch off `main`: `git checkout -b feat/short-description`.
- Keep changes focused; prefer small, reviewable commits.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add price alert cooldown
fix: handle missing quote in watchlist table
docs: expand deployment guide
test: cover market cap formatting
chore: bump dependencies
```

Write the subject in the imperative mood and keep it under ~72 characters.

## Quality gates

Run all of these before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

- ESLint must pass with no warnings.
- New logic should ship with unit tests where practical (`tests/`).
- Do not commit secrets. `.env*` files are git-ignored.

## Code style

- TypeScript everywhere; avoid `any` unless unavoidable.
- Prefer server actions in `lib/actions` for data access.
- Reuse shared UI primitives in `components/ui` and feature components in `components`.
- Add comments only for non-obvious intent or constraints.

## Pull requests

- Describe what changed and why.
- Link related issues.
- Include screenshots for UI changes.
- Note any new environment variables or migrations.

## Reporting issues

Open a GitHub issue with clear reproduction steps, expected vs. actual
behavior, and environment details. Please do not include secrets or personal
data in issues.
