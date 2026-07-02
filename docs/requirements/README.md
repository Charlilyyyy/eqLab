# Requirements

Research and requirements documentation for **MarkGauge** v1 — competitor context, user journeys, functional and non-functional specs, integrations, and an implementation checklist.

---

## Purpose

Discovery ([../discovery/README.md](../discovery/README.md)) established *why* to build MarkGauge and *what* belongs in v1. This folder defines *how* the product behaves and *what to verify* before and during implementation.

---

## Documents

| File | Focus |
|------|-------|
| [competitor-analysis.md](competitor-analysis.md) | Yahoo Finance, TradingView, brokers, gaps and positioning |
| [user-flows.md](user-flows.md) | F1–F9 journeys, anchor path, route matrix |
| [functional-requirements.md](functional-requirements.md) | FR-* IDs: auth, dashboard, detail, watchlist, alerts, jobs |
| [non-functional-requirements.md](non-functional-requirements.md) | NFR-* IDs: security, performance, rate limits, uptime |
| [external-services.md](external-services.md) | MongoDB, Better Auth, Finnhub, Inngest, Nodemailer, Gemini |
| [feature-checklist.md](feature-checklist.md) | P0/P1 checkboxes, smoke test, release gate |

---

## Reading Order

1. [Competitor analysis](competitor-analysis.md) — market context
2. [User flows](user-flows.md) — journeys to support
3. [Functional requirements](functional-requirements.md) — what the system does
4. [Non-functional requirements](non-functional-requirements.md) — how well it must perform
5. [External services](external-services.md) — third-party dependencies
6. [Feature checklist](feature-checklist.md) — track build and QA progress

---

## Requirements Summary

### Primary user journey

```
Sign up → Dashboard → Search symbol → Stock detail
  → Add watchlist → Set alert → Job checks price → Email delivered
```

### Functional scope (v1)

| Area | Capabilities |
|------|--------------|
| Auth | Register, sign in, sign out, session, welcome email |
| Dashboard | Market widgets, navigation to search and watchlist |
| Stock detail | Quote, chart embed, profile, watchlist + alert actions |
| Watchlist | Add/remove, live table, optional news |
| Alerts | Create/list/delete, upper/lower rules, background trigger |
| Email | Welcome and alert templates |
| AI | Optional bounded summaries (should-have) |

### Non-functional highlights

- Session-protected routes; user-scoped data only
- Quote caching and API rate-limit handling
- Alert idempotency and email on trigger
- Target 99.5% uptime on managed hosting
- ESLint clean; production build passes

### Integrations

| Service | Role |
|---------|------|
| MongoDB | Watchlist and alert persistence |
| Better Auth | Authentication |
| Finnhub | Market data |
| Inngest | Scheduled jobs |
| Nodemailer | Transactional email |
| Gemini | AI summaries |
| TradingView | Chart embed |

---

## Traceability

| Discovery | Requirements |
|-----------|--------------|
| [Problem statement](../discovery/problem-statement.md) | Competitor gaps, NFR honesty rules |
| [Personas](../discovery/personas.md) | User flows F1–F9 |
| [Value propositions](../discovery/value-propositions.md) | Functional modules FR-* |
| [Goals and scope](../discovery/goals-and-scope.md) | Feature checklist P0/P1 |
| [Non-goals](../discovery/non-goals.md) | FR-X05, excluded checklist items |

---

## Decision

**Go** — requirements complete; architecture documented in [architecture index](../architecture/README.md).

---

## Next Milestone

**Project setup & environment** — initialize Next.js, tooling, `.env.example`, shadcn/ui, and core dependencies.
