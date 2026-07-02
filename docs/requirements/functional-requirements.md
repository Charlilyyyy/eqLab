# Functional Requirements

Functional specification for **MarkGauge** v1. Requirements trace to [user flows](user-flows.md) and discovery scope. Each item uses **FR-** IDs for checklist mapping in a later document.

**Priority key:** `P0` = must ship for v1 gate | `P1` = should ship | `P2` = optional polish

---

## 1. Authentication & Account

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-A01 | User can register with full name, email, password, and country | P0 | F1 |
| FR-A02 | User can optionally provide investment goals, risk tolerance, and preferred industry on sign-up | P1 | F1 |
| FR-A03 | System validates email format and password strength before account creation | P0 | F1 |
| FR-A04 | System rejects duplicate email with user-safe error message | P0 | F1 |
| FR-A05 | User can sign in with email and password | P0 | F2 |
| FR-A06 | System establishes authenticated session on successful sign-in or sign-up | P0 | F1, F2 |
| FR-A07 | User can sign out; session is destroyed server-side | P0 | F2 |
| FR-A08 | Protected routes redirect unauthenticated users to sign in | P0 | F2 |
| FR-A09 | Header shows sign in / sign up when logged out; user menu when logged in | P0 | F1, F2 |
| FR-A10 | System sends welcome email on successful registration | P0 | F1 |
| FR-A11 | User dropdown displays account identity and sign-out action | P0 | F2 |

**Pages:** `/sign-up`, `/sign-in`

**Server actions / handlers:** sign-up, sign-in, sign-out, session resolution

---

## 2. Navigation & Layout

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-N01 | App provides root layout with header and footer on main routes | P0 | All |
| FR-N02 | Auth routes use minimal auth layout without full marketing chrome | P0 | F1, F2 |
| FR-N03 | Header includes brand link to dashboard, watchlist link, and search entry | P0 | F3–F5 |
| FR-N04 | Navigation items adapt to session (auth links vs. user menu) | P0 | F2 |
| FR-N05 | Footer includes standard legal / product links per design | P1 | All |
| FR-N06 | Global dark theme with consistent brand accent color | P0 | All |
| FR-N07 | Toast notifications confirm successful mutations (watchlist, alerts) | P1 | F5, F6 |

**Pages:** shared layouts for `(root)` and `(auth)` route groups

---

## 3. Dashboard (Home)

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-D01 | Authenticated user lands on dashboard at app root | P0 | F1, F3 |
| FR-D02 | Dashboard displays market overview widgets (indices, heatmap-style view, top stories) | P0 | F3 |
| FR-D03 | Widgets load via embedded chart provider or server-fetched market data | P0 | F3 |
| FR-D04 | Widget failure shows fallback UI; page shell remains usable | P0 | F3 |
| FR-D05 | Dashboard provides clear path to search and watchlist | P0 | F3 |

**Pages:** `/` (root dashboard)

---

## 4. Search & Stock Detail

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-S01 | User can open global search from header (command palette or search field) | P0 | F4 |
| FR-S02 | Search queries are debounced before server lookup | P0 | F4 |
| FR-S03 | Search returns matching symbols and company names | P0 | F4 |
| FR-S04 | User can select a result and navigate to stock detail | P0 | F4 |
| FR-S05 | Stock detail shows symbol, company name, live quote, and change percent | P0 | F4 |
| FR-S06 | Stock detail embeds interactive price chart widget | P0 | F4 |
| FR-S07 | Stock detail shows company profile / summary metrics from market data API | P0 | F4 |
| FR-S08 | Unknown or invalid symbol shows dedicated not-found state | P0 | F4 |
| FR-S09 | Quote fetch failure shows explicit error; no placeholder price | P0 | F4 |
| FR-S10 | Stock detail exposes watchlist toggle for current symbol | P0 | F4, F5 |
| FR-S11 | Stock detail exposes entry point to create price alert | P0 | F4, F6 |

**Pages:** `/stocks/[symbol]`

**Server actions:** symbol search, quote fetch, company profile, news (symbol-scoped)

---

## 5. Watchlist

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-W01 | User can add symbol to watchlist from stock detail | P0 | F5 |
| FR-W02 | User can remove symbol from watchlist from stock detail or watchlist page | P0 | F5 |
| FR-W03 | System prevents duplicate symbol per user in watchlist | P0 | F5 |
| FR-W04 | Watchlist stores userId, symbol, company name, addedAt | P0 | F5 |
| FR-W05 | User can view watchlist page listing all owned symbols | P0 | F5 |
| FR-W06 | Watchlist table shows live price, change %, market cap, and P/E per row | P0 | F5 |
| FR-W07 | User can click row to open stock detail for that symbol | P0 | F5 |
| FR-W08 | Empty watchlist shows onboarding guidance toward search | P0 | F5 |
| FR-W09 | Watchlist data loads only for authenticated session owner | P0 | F5 |
| FR-W10 | Watchlist page displays news aggregated for listed symbols | P1 | F8 |

**Pages:** `/watchlist`

**Server actions:** add to watchlist, remove from watchlist, list watchlist, enrich with quotes

**Data rules:**

- Symbol stored uppercase, trimmed
- Compound unique index on `(userId, symbol)`
- Single watchlist per user in v1 (one collection of symbols, not multiple named lists)

---

## 6. Price Alerts

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-L01 | User can open alert modal from stock detail | P0 | F6 |
| FR-L02 | Alert form captures symbol, company, alert name, condition, and threshold price | P0 | F6 |
| FR-L03 | Condition is **upper** (fire when price ≥ threshold) or **lower** (fire when price ≤ threshold) | P0 | F6 |
| FR-L04 | System validates threshold is positive number | P0 | F6 |
| FR-L05 | User can view list of active alerts | P0 | F6 |
| FR-L06 | User can delete an active alert | P0 | F6 |
| FR-L07 | Alert record stores userId, userEmail, symbol, company, alertName, alertType, threshold, isActive, createdAt | P0 | F6 |
| FR-L08 | Triggered alert sets isActive false and records lastSent timestamp | P0 | F7 |
| FR-L09 | System does not re-fire the same triggered alert without user creating a new one | P0 | F7 |
| FR-L10 | Alert list UI distinguishes active vs. triggered/inactive states | P1 | F6 |

**Components:** alert modal, alert list

**Server actions:** create alert, list alerts, delete alert, trigger evaluation (worker)

**API routes:** alerts endpoint for worker/cron integration; trigger-alert endpoint for manual or scheduled invocation

---

## 7. Background Jobs & Alert Delivery

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-J01 | Scheduled job loads all active alerts | P0 | F7 |
| FR-J02 | Job fetches current quote per alert symbol from market data integration | P0 | F7 |
| FR-J03 | Job evaluates upper/lower rule against latest price | P0 | F7 |
| FR-J04 | On trigger, job updates alert state and sends notification email | P0 | F7 |
| FR-J05 | Job handler is exposed via HTTP route compatible with job runner (e.g. Inngest) | P0 | F7 |
| FR-J06 | Job skips or retries when quote unavailable; no false trigger | P0 | F7 |
| FR-J07 | Optional second job generates AI news summary for watchlist or alert context | P1 | F9 |

**API routes:** `/api/inngest` (or equivalent job webhook), `/api/alerts`, `/api/trigger-alert`

---

## 8. Email Notifications

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-E01 | Welcome email sent on registration with branded HTML template | P0 | F1 |
| FR-E02 | Alert email includes symbol, company, condition, threshold, and triggering price | P0 | F7 |
| FR-E03 | Alert email uses responsive HTML template | P0 | F7 |
| FR-E04 | Email send failures are logged; do not corrupt alert state ambiguously | P0 | F7 |
| FR-E05 | Alert email may include optional AI-generated summary paragraph | P1 | F9 |

**Integration:** transactional email provider (SMTP or API)

---

## 9. AI Insights (Bounded)

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-I01 | System can generate short market summary from retrieved news and quote context | P1 | F9 |
| FR-I02 | Prompts instruct model not to give explicit buy/sell advice | P1 | F9 |
| FR-I03 | UI and email copy state insights are informational only | P1 | F9 |
| FR-I04 | AI failure degrades gracefully (email/watchlist without summary) | P1 | F9 |

---

## 10. Market Data Integration

| ID | Requirement | Priority | Flow |
|----|-------------|----------|------|
| FR-M01 | Server-side integration fetches stock search results | P0 | F4 |
| FR-M02 | Server-side integration fetches real-time or near-real-time quote | P0 | F4, F5, F7 |
| FR-M03 | Server-side integration fetches company profile for symbol detail | P0 | F4 |
| FR-M04 | Server-side integration fetches company or symbol news | P1 | F8 |
| FR-M05 | Responses are cached within rate-limit policy | P0 | F4, F7 |
| FR-M06 | API errors map to user-visible or logged states per call site | P0 | All |

**Note:** Provider selection documented in [external services](external-services.md) *(upcoming)*.

---

## 11. API Surface Summary

| Route / surface | Method | Purpose | Auth |
|-----------------|--------|---------|------|
| Server actions (auth) | POST | Sign up, sign in, sign out | Public / session |
| Server actions (watchlist) | POST | Add, remove, list | Session required |
| Server actions (alerts) | POST | Create, list, delete | Session required |
| Server actions (market) | POST | Search, quote, profile, news | Session or server |
| `/api/alerts` | GET/POST | Alert worker access | Server secret / session |
| `/api/trigger-alert` | POST | Manual or cron trigger | Server secret |
| `/api/inngest` | GET/POST/PUT | Job runner webhook | Provider signature |

Exact HTTP verbs finalized during architecture; requirements above capture capabilities.

---

## 12. Data Entities (Logical)

### Watchlist item

| Field | Type | Notes |
|-------|------|-------|
| userId | string | Owner |
| symbol | string | Uppercase ticker |
| company | string | Display name |
| addedAt | datetime | Default now |

### Alert

| Field | Type | Notes |
|-------|------|-------|
| userId | string | Owner |
| userEmail | string | Notification target |
| symbol | string | Uppercase ticker |
| company | string | Display name |
| alertName | string | User label |
| alertType | enum | `upper` \| `lower` |
| threshold | number | Target price |
| isActive | boolean | Default true |
| createdAt | datetime | |
| lastSent | datetime | Set on trigger |

### User (auth provider)

Managed by authentication library; MarkGauge stores session reference and profile fields required for sign-up form.

---

## 13. Cross-Cutting Functional Rules

| ID | Rule |
|----|------|
| FR-X01 | All watchlist and alert queries scoped by authenticated userId |
| FR-X02 | No user can read or mutate another user's watchlist or alerts |
| FR-X03 | Symbol identifiers normalized to uppercase before persistence |
| FR-X04 | UI reflects server state after mutations (optimistic optional, reconcile required) |
| FR-X05 | Features listed as non-goals in discovery remain unimplemented (no trading, social, portfolio) |

---

## 14. Requirements Traceability

| Flow | Primary FR groups |
|------|-------------------|
| F1 Registration | FR-A*, FR-E01, FR-D01 |
| F2 Sign in/out | FR-A05–A09, FR-N04 |
| F3 Dashboard | FR-D*, FR-N* |
| F4 Search/detail | FR-S*, FR-M* |
| F5 Watchlist | FR-W*, FR-M02 |
| F6 Alerts UI | FR-L01–L07 |
| F7 Alert delivery | FR-L08–L09, FR-J*, FR-E02–E04 |
| F8 News | FR-W10, FR-M04 |
| F9 AI | FR-I*, FR-J07, FR-E05 |

---

## Related Documents

- [User flows](user-flows.md)
- [Competitor analysis](competitor-analysis.md)
- [Non-functional requirements](non-functional-requirements.md)
- [External services](external-services.md) *(upcoming)*
- [Feature checklist](feature-checklist.md) *(upcoming)*
- [Discovery goals and scope](../discovery/goals-and-scope.md)
