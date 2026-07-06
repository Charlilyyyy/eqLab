# MarkGauge

Personal equity monitoring workspace — live quotes, watchlists, and price alerts in one place.

## Prerequisites

- Node.js 20.17+ (recommended)
- npm 10+
- MongoDB Atlas cluster or local MongoDB instance
- API keys: Finnhub, Better Auth secret, Gemini (optional), SMTP credentials, Inngest (for background jobs)

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Fill in .env.local (see Environment variables below)

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Yes | App URL (`http://localhost:3000` in dev) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Yes | Random secret for session signing |
| `BETTER_AUTH_URL` | Yes | Same as base URL in dev |
| `FINNHUB_API_KEY` | Yes | Finnhub API key (server-side) |
| `NODEMAILER_EMAIL` | Yes | SMTP sender email |
| `NODEMAILER_PASSWORD` | Yes | SMTP password or app password |
| `INNGEST_EVENT_KEY` | For jobs | Inngest event key |
| `INNGEST_SIGNING_KEY` | For jobs | Inngest webhook signing key |
| `GEMINI_API_KEY` | Optional | AI summaries in emails |

## Local background jobs

In a second terminal, run the Inngest dev server after `npm run dev`:

```bash
npx inngest-cli@latest dev
```

## Project structure

```
app/           # Next.js App Router pages and API routes
components/    # UI components (shadcn/ui + feature components)
database/      # Mongoose connection and models
hooks/         # Client React hooks
lib/           # Server actions, auth, integrations
docs/          # Product, requirements, and architecture docs
types/         # Shared TypeScript declarations
```

## Documentation

- [Discovery](docs/discovery/README.md) — problem, vision, personas, scope
- [Requirements](docs/requirements/README.md) — flows, functional specs, checklist
- [Architecture](docs/architecture/README.md) — stack, data flows, folder layout

## Current status

Project scaffold is complete:

- Next.js 15 + TypeScript + Tailwind CSS 4
- shadcn/ui component library
- Integration stubs: Better Auth, MongoDB, Inngest, Nodemailer
- Route groups: dashboard, watchlist, auth pages
- ESLint and production build passing

Next implementation milestone: database models and auth flows.

## License

Private — see repository owner for terms.
