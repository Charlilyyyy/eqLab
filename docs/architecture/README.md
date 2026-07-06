# Architecture

Technical architecture for **MarkGauge** v1 — stack decisions, system design, data flows, background jobs, and repository layout. This milestone bridges [requirements](../requirements/README.md) and project scaffolding in the next implementation milestone.

---

## Purpose

Before initializing the Next.js codebase, we document:

1. **What we build with** — framework, database, auth, integrations
2. **How pieces connect** — layers, deployment, security zones
3. **How data moves** — user actions, market reads, alert → email
4. **How async work runs** — Inngest functions and events
5. **Where code lives** — folders, naming, import rules

---

## Documents

| File | Focus |
|------|-------|
| [tech-stack.md](tech-stack.md) | D1–D12 decision record with rationale and alternatives |
| [system-architecture.md](system-architecture.md) | Context diagram, layers, components, deployment |
| [data-flows.md](data-flows.md) | DF-01–DF-12 sequences for reads, writes, and jobs |
| [background-jobs.md](background-jobs.md) | Inngest functions, events, cron, local dev |
| [folder-structure.md](folder-structure.md) | `app/`, `components/`, `lib/`, `database/`, `hooks/` layout |

---

## Reading Order

1. [Tech stack](tech-stack.md) — confirm technology choices
2. [System architecture](system-architecture.md) — see the big picture
3. [Data flows](data-flows.md) — trace request and job paths
4. [Background jobs](background-jobs.md) — alert scheduling and email pipeline
5. [Folder structure](folder-structure.md) — map design to directories

---

## Architecture Summary

### Stack (headline)

Next.js 15 App Router · TypeScript · Tailwind + shadcn/ui · MongoDB · Better Auth · Finnhub · Inngest · Nodemailer · Gemini · TradingView embed · Vercel

### System shape

```
Browser → Next.js (RSC + server actions) → MongoDB
                    ↓
              External APIs (Finnhub, SMTP, Gemini)
                    ↑
              Inngest cron/webhooks → alert checks → email
```

### Core runtime paths

| Path | Mechanism |
|------|-----------|
| Auth | Better Auth cookies + MongoDB adapter |
| Pages | Server Components in `app/(root)/` |
| Mutations | Server actions in `lib/actions/` |
| Market data | `lib/actions/finnhub.actions.ts` with cache |
| Alerts | MongoDB + Inngest cron every 5 min |
| Email | Nodemailer HTML templates |

### Repository layout (top level)

| Directory | Role |
|-----------|------|
| `app/` | Routes, layouts, API handlers |
| `components/` | UI and forms |
| `lib/` | Actions, auth, inngest, email, finnhub |
| `database/` | Mongoose models |
| `hooks/` | Client hooks (debounce, TradingView) |

---

## Traceability

| Requirements | Architecture |
|--------------|--------------|
| [Functional FR-*](../requirements/functional-requirements.md) | Components in system-architecture map |
| [User flows F1–F9](../requirements/user-flows.md) | Data flows DF-* |
| [NFR security/perf](../requirements/non-functional-requirements.md) | Security zones, caching, idempotency |
| [External services](../requirements/external-services.md) | Tech stack D4–D10 |
| [Feature checklist](../requirements/feature-checklist.md) | Folder scaffold order |

---

## Key Diagrams (quick links)

- [System context](system-architecture.md#system-context)
- [Layered architecture](system-architecture.md#layered-architecture)
- [Auth sequence](system-architecture.md#authentication-architecture)
- [Anchor data flow](data-flows.md#end-to-end-anchor-flow-data-perspective)
- [Alert cron flow](background-jobs.md#fn-1--check-price-alerts-cron)
- [Folder tree](folder-structure.md#top-level-tree)

---

## Decision

**Go** — project setup complete. Runnable `npm run dev` skeleton with lint and build passing.

---

## Next Milestone

**Database and data models** — Mongoose models for watchlist and alerts, connection wiring, and sample data validation.
