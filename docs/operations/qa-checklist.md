# QA checklist

Pre-release verification for **MarkGauge**. Run locally with all env vars set
and the Inngest dev server active (`npx inngest-cli dev`).

---

## Automated gates

```bash
npm run lint       # ESLint, zero warnings
npm run typecheck  # tsc --noEmit
npm test           # Vitest unit suite
npm run build      # Production build succeeds
```

All four must pass before shipping.

---

## Authentication

- [ ] Sign up creates an account and redirects to the dashboard.
- [ ] Welcome email is received (check spam).
- [ ] Sign in with valid credentials succeeds.
- [ ] Sign in with wrong password shows an error toast.
- [ ] Protected routes redirect to `/sign-in` when signed out.
- [ ] Signed-in users visiting `/sign-in` are redirected to `/`.
- [ ] Log out clears the session.

## Market data

- [ ] Dashboard TradingView widgets render.
- [ ] Search (Cmd/Ctrl+K) returns popular stocks with no query.
- [ ] Search returns matches for a typed query.
- [ ] Stock detail page loads charts and company profile.

## Watchlist

- [ ] Adding a symbol updates the star state optimistically.
- [ ] Watchlist table shows price, change %, market cap, and P/E.
- [ ] Removing a symbol also deactivates its alerts.
- [ ] Empty watchlist shows the empty state with a search prompt.
- [ ] Watchlist news renders related headlines.

## Alerts

- [ ] Create alert from the watchlist table succeeds.
- [ ] Alert appears in the Alerts panel.
- [ ] Edit alert updates its threshold/type.
- [ ] Delete alert removes it.
- [ ] `check-price-alerts` emits events when thresholds are met.
- [ ] Triggered alert sends an email and records `lastSent`.

## Health & jobs

- [ ] `GET /api/health/db` returns `200` when the DB is reachable.
- [ ] `POST /api/trigger-alert` queues a price alert event.
- [ ] Inngest dashboard lists all four functions.

---

## Related docs

- [Deployment guide](./deployment-guide.md)
- [Feature checklist](../requirements/feature-checklist.md)
