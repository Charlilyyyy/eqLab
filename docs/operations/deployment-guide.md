# Deployment guide

How to deploy **MarkGauge** to production and verify it end to end.

---

## Prerequisites

| Service | Purpose | Notes |
|---------|---------|-------|
| [Vercel](https://vercel.com) | Hosting (Next.js) | Recommended target |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database | Free tier works for testing |
| [Finnhub](https://finnhub.io) | Market data | Free API key |
| [Inngest](https://www.inngest.com) | Background jobs | Event + signing keys |
| [Google AI Studio](https://aistudio.google.com) | Gemini | Personalized email content |
| Gmail (or SMTP) | Email delivery | App password for Nodemailer |

---

## 1. Environment variables

Copy `.env.example` and fill every value. All keys below must be set in the
Vercel project (Settings → Environment Variables) for the Production and
Preview environments.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | yes | Public site URL, e.g. `https://markgauge.vercel.app` |
| `FINNHUB_API_KEY` | yes | Server-side Finnhub key |
| `NEXT_PUBLIC_FINNHUB_API_KEY` | yes | Client-visible Finnhub key |
| `FINNHUB_BASE_URL` | yes | `https://finnhub.io/api/v1` |
| `MONGODB_URI` | yes | Atlas connection string |
| `BETTER_AUTH_SECRET` | yes | Random 32+ char secret |
| `BETTER_AUTH_URL` | yes | Same as the deployed base URL |
| `GEMINI_API_KEY` | yes | Gemini API key |
| `NODEMAILER_EMAIL` | yes | Sender email address |
| `NODEMAILER_PASSWORD` | yes | SMTP / Gmail app password |
| `INNGEST_EVENT_KEY` | yes | Inngest event key |
| `INNGEST_SIGNING_KEY` | yes | Inngest signing key |

> Keep `BETTER_AUTH_URL` and `NEXT_PUBLIC_BASE_URL` in sync with the actual
> deployment domain or authentication redirects will fail.

---

## 2. Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, **New Project → Import** the repo.
3. Framework preset is detected automatically (Next.js).
4. Add all environment variables above.
5. Deploy. Vercel runs `next build` and serves the app.

---

## 3. Connect Inngest

1. In the Inngest dashboard, create an app and add the production keys to Vercel.
2. Register the serve endpoint: `https://<your-domain>/api/inngest`.
3. Confirm these functions appear:
   - `sign-up-email`
   - `daily-news-summary` (cron `0 12 * * *`)
   - `send-price-alert`
   - `check-price-alerts` (cron `*/5 * * * *`)

---

## 4. Smoke test

Run through the critical path after every production deploy:

1. **Sign up** with a new email → welcome email arrives.
2. **Sign in / out** → session persists and clears correctly.
3. **Search** a symbol (Cmd/Ctrl+K) → results render.
4. **Add to watchlist** from search or a stock page → star fills.
5. **Open the watchlist** → live price, change %, market cap, and P/E load.
6. **Create an alert** → it appears in the Alerts panel.
7. **Trigger check** → `POST /api/trigger-alert` queues an alert email.
8. **Database health** → `GET /api/health/db` returns `200`.

---

## 5. Optional: Docker

The app is a standard Next.js project and can run in any Node 20+ container.
Build with `npm run build` and start with `npm run start`, injecting the same
environment variables at runtime.

---

## Related docs

- [Non-functional requirements](../requirements/non-functional-requirements.md)
- [External services](../requirements/external-services.md)
- [Background jobs](../architecture/background-jobs.md)
- [QA checklist](./qa-checklist.md)
