# Product Discovery

This folder holds **MarkGauge** discovery work: validating that a focused equity monitoring product solves a real problem worth building before architecture and implementation begin.

---

## Purpose

Before research documents, tech stack decisions, or application code, we capture:

1. **The problem** — fragmented tools, missed price moves, and attention wasted on tab-hopping
2. **The vision** — product name, elevator pitch, and strategic north star
3. **The people** — retail holders, active traders, enthusiasts, and part-time monitors
4. **The value** — live data, watchlists, alerts, and bounded AI insight
5. **The scope** — v1 goals, anchor scenario, and in-scope capabilities
6. **The boundaries** — explicit non-goals that prevent scope creep

---

## Documents

| File | Focus |
|------|-------|
| [problem-statement.md](problem-statement.md) | Who hurts, what breaks, why now |
| [vision.md](vision.md) | MarkGauge naming, pitch, and vision statement |
| [personas.md](personas.md) | Four target user types and v1 primary user |
| [value-propositions.md](value-propositions.md) | Four pillars and prioritization |
| [goals-and-scope.md](goals-and-scope.md) | v1 goals, metrics, anchor scenario, in/deferred scope |
| [non-goals.md](non-goals.md) | Explicit exclusions and discovery completion |

---

## Reading Order

1. [Problem statement](problem-statement.md) — establish the pain
2. [Vision](vision.md) — understand the product promise
3. [Personas](personas.md) — ground decisions in real user types
4. [Value propositions](value-propositions.md) — connect pains to deliverables
5. [Goals and scope](goals-and-scope.md) — draw the v1 boundary
6. [Non-goals](non-goals.md) — lock exclusions and go/no-go handoff

---

## Idea Brief (Summary)

### Problem

Individual investors lack one dependable place to monitor live market data, maintain a personal symbol list, and receive timely price alerts. They overpay in attention or underreact when prices move.

### Audience

Retail long-term holders, active traders, portfolio enthusiasts tracking many names, and part-time monitors who rely on email over all-day screen time.

### Goals (v1)

- One authenticated web workspace for quotes, watchlist, and symbol detail
- Price alerts with background checks and email on trigger
- Trustworthy data with honest error states
- Foundation architecture for later features without rewriting core flows

### Non-goals (v1)

- Brokerage, robo-advice, social feeds, portfolio cost-basis tracking
- Native mobile apps, SMS/push, team workspaces, public API
- Crypto/forex, advanced screening, and autonomous AI trading

### Anchor proof

Register → add symbols to watchlist → set price alert → receive email when threshold crosses.

### Decision

**Go** — proceed to research and requirements (competitors, user flows, functional and non-functional specs, external services).

---

## Next Milestone

Handoff to **research and requirements** is complete. Continue with [requirements index](../requirements/README.md) for competitor analysis, user flows, functional specs, and the feature checklist.
