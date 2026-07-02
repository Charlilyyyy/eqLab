# Feature Checklist

Implementation and QA checklist for **MarkGauge** v1. Maps [functional requirements](functional-requirements.md) **FR-** IDs and [non-functional requirements](non-functional-requirements.md) **NFR-** IDs to verifiable items.

**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done

**Priority:** Items marked **P0** block the v1 release gate; **P1** should ship but may follow immediately after P0 pass.

---

## Release Gate — Anchor Journey

End-to-end path from [user flows](user-flows.md) primary journey:

- [ ] **P0** User registers and receives welcome email (F1, FR-A01, FR-A10, FR-E01)
- [ ] **P0** User lands on dashboard with market widgets (F3, FR-D01–D03)
- [ ] **P0** User searches symbol and opens stock detail with quote + chart (F4, FR-S01–S07)
- [ ] **P0** User adds symbol to watchlist; row appears on watchlist page (F5, FR-W01, FR-W05–W06)
- [ ] **P0** User creates price alert with upper or lower condition (F6, FR-L01–L05)
- [ ] **P0** Background job evaluates alert against live quote (F7, FR-J01–J03)
- [ ] **P0** Price cross triggers email with correct symbol and rule (F7, FR-J04, FR-E02)
- [ ] **P0** User signs in again; watchlist and alert state persist (F2, FR-A05–A06)

---

## 1. Authentication & Account

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-A01 | Sign-up form: name, email, password, country | P0 |
| [ ] | FR-A02 | Optional sign-up fields: goals, risk, industry | P1 |
| [ ] | FR-A03 | Client and server validation on sign-up | P0 |
| [ ] | FR-A04 | Duplicate email error handling | P0 |
| [ ] | FR-A05 | Sign-in form with email and password | P0 |
| [ ] | FR-A06 | Session created on sign-up and sign-in | P0 |
| [ ] | FR-A07 | Sign-out destroys session | P0 |
| [ ] | FR-A08 | Protected routes redirect when logged out | P0 |
| [ ] | FR-A09 | Header auth state (links vs. user menu) | P0 |
| [ ] | FR-A10 | Welcome email on registration | P0 |
| [ ] | FR-A11 | User dropdown with sign-out | P0 |

**Pages:** `/sign-up`, `/sign-in`

---

## 2. Navigation & Layout

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-N01 | Root layout with header and footer | P0 |
| [ ] | FR-N02 | Auth layout for sign-in/up | P0 |
| [ ] | FR-N03 | Header: brand, watchlist, search | P0 |
| [ ] | FR-N04 | Nav adapts to session | P0 |
| [ ] | FR-N05 | Footer links | P1 |
| [ ] | FR-N06 | Dark theme and brand accent | P0 |
| [ ] | FR-N07 | Toast on watchlist/alert mutations | P1 |

---

## 3. Dashboard

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-D01 | Authenticated home at `/` | P0 |
| [ ] | FR-D02 | Market overview widgets rendered | P0 |
| [ ] | FR-D03 | Widget data via embed or API | P0 |
| [ ] | FR-D04 | Widget failure fallback | P0 |
| [ ] | FR-D05 | Paths to search and watchlist visible | P0 |

---

## 4. Search & Stock Detail

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-S01 | Global search in header | P0 |
| [ ] | FR-S02 | Debounced search input | P0 |
| [ ] | FR-S03 | Search returns symbols and names | P0 |
| [ ] | FR-S04 | Navigate to `/stocks/[symbol]` | P0 |
| [ ] | FR-S05 | Quote and change % on detail | P0 |
| [ ] | FR-S06 | Embedded chart widget | P0 |
| [ ] | FR-S07 | Company profile on detail | P0 |
| [ ] | FR-S08 | Not-found for invalid symbol | P0 |
| [ ] | FR-S09 | Error state when quote fails | P0 |
| [ ] | FR-S10 | Watchlist toggle on detail | P0 |
| [ ] | FR-S11 | Alert entry point on detail | P0 |

---

## 5. Watchlist

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-W01 | Add to watchlist from detail | P0 |
| [ ] | FR-W02 | Remove from watchlist | P0 |
| [ ] | FR-W03 | Duplicate symbol prevented | P0 |
| [ ] | FR-W04 | Persist userId, symbol, company, addedAt | P0 |
| [ ] | FR-W05 | Watchlist page at `/watchlist` | P0 |
| [ ] | FR-W06 | Table: price, change %, cap, P/E | P0 |
| [ ] | FR-W07 | Row click opens stock detail | P0 |
| [ ] | FR-W08 | Empty state with guidance | P0 |
| [ ] | FR-W09 | Data scoped to session user only | P0 |
| [ ] | FR-W10 | Watchlist-scoped news section | P1 |

---

## 6. Price Alerts

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-L01 | Alert modal on stock detail | P0 |
| [ ] | FR-L02 | Form: name, condition, threshold | P0 |
| [ ] | FR-L03 | Upper / lower condition types | P0 |
| [ ] | FR-L04 | Positive threshold validation | P0 |
| [ ] | FR-L05 | Active alerts list | P0 |
| [ ] | FR-L06 | Delete alert | P0 |
| [ ] | FR-L07 | Alert document schema complete | P0 |
| [ ] | FR-L08 | Trigger sets inactive + lastSent | P0 |
| [ ] | FR-L09 | No duplicate fire for same alert | P0 |
| [ ] | FR-L10 | UI shows active vs. triggered | P1 |

---

## 7. Background Jobs

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-J01 | Scheduled load of active alerts | P0 |
| [ ] | FR-J02 | Fetch quote per symbol in job | P0 |
| [ ] | FR-J03 | Evaluate upper/lower rules | P0 |
| [ ] | FR-J04 | Update state and send email on trigger | P0 |
| [ ] | FR-J05 | Inngest (or equivalent) route wired | P0 |
| [ ] | FR-J06 | Skip/retry on quote failure | P0 |
| [ ] | FR-J07 | Optional AI summary job | P1 |

**API routes:**

- [ ] **P0** `/api/inngest` — job runner webhook
- [ ] **P0** `/api/alerts` — alert worker access
- [ ] **P0** `/api/trigger-alert` — manual/cron trigger

---

## 8. Email

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-E01 | Welcome HTML email template | P0 |
| [ ] | FR-E02 | Alert email with symbol, rule, price | P0 |
| [ ] | FR-E03 | Responsive alert template | P0 |
| [ ] | FR-E04 | Send failure logging | P0 |
| [ ] | FR-E05 | Optional AI paragraph in alert email | P1 |

---

## 9. AI Insights

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-I01 | Summary from news + quote context | P1 |
| [ ] | FR-I02 | No buy/sell in prompts | P1 |
| [ ] | FR-I03 | Informational disclaimer in UI/email | P1 |
| [ ] | FR-I04 | Graceful degradation without AI | P1 |

---

## 10. Market Data Layer

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-M01 | Symbol search integration | P0 |
| [ ] | FR-M02 | Quote fetch integration | P0 |
| [ ] | FR-M03 | Company profile integration | P0 |
| [ ] | FR-M04 | News fetch integration | P1 |
| [ ] | FR-M05 | Quote/profile caching | P0 |
| [ ] | FR-M06 | Error mapping per call site | P0 |

---

## 11. Cross-Cutting Rules

| Status | ID | Item | Pri |
|:------:|----|------|:---:|
| [ ] | FR-X01 | Queries scoped by userId | P0 |
| [ ] | FR-X02 | No cross-user data access | P0 |
| [ ] | FR-X03 | Uppercase symbol normalization | P0 |
| [ ] | FR-X04 | UI reconciles after mutations | P0 |
| [ ] | FR-X05 | Non-goals not implemented | P0 |

---

## 12. External Services Integration

From [external services](external-services.md):

| Status | Service | Verify |
|:------:|---------|--------|
| [ ] | MongoDB | Connection, models, indexes |
| [ ] | Better Auth | Sign-up, sign-in, session, protected routes |
| [ ] | Finnhub | Search, quote, profile, news |
| [ ] | Inngest | Cron functions registered and running |
| [ ] | Nodemailer | SMTP send in dev and prod |
| [ ] | Gemini | Summary generation with timeout fallback |
| [ ] | TradingView embed | Chart renders on stock detail |

**Environment:**

- [ ] **P0** `.env.example` lists all required variables
- [ ] **P0** App starts with documented env in under 45 minutes (NFR-E01)

---

## 13. Non-Functional Checkpoints

Selected **P0** NFRs to verify before release:

### Security

- [ ] NFR-S01 Protected routes require session
- [ ] NFR-S05–S06 Resource ownership and secrets in env only
- [ ] NFR-S07 Job webhook signature verification
- [ ] NFR-S08 Server-side input validation

### Performance & rate limits

- [ ] NFR-P06 Quote caching active
- [ ] NFR-R01 Centralized market data client
- [ ] NFR-R04 Graceful handling of HTTP 429
- [ ] NFR-R05 Alert job dedupes symbol quote fetches

### Reliability

- [ ] NFR-D01 Alert trigger idempotency
- [ ] NFR-D03 Watchlist unique index enforced
- [ ] NFR-U02 App navigable when market API down

### Quality bar

- [ ] NFR-M01 TypeScript strict passes
- [ ] NFR-M02 ESLint zero errors
- [ ] NFR-E04 Production build succeeds
- [ ] NFR-X07 Financial / AI disclaimer present

---

## 14. Smoke Test Script (Manual QA)

Run in order after deployment or full local stack:

1. [ ] Register new account → check inbox for welcome email
2. [ ] Open dashboard → widgets load or show fallback
3. [ ] Search `AAPL` (or test symbol) → open detail → quote visible
4. [ ] Add to watchlist → confirm on `/watchlist`
5. [ ] Create lower alert with threshold above current price (or use test trigger route)
6. [ ] Invoke trigger job → verify email received
7. [ ] Sign out → `/watchlist` redirects to sign in
8. [ ] Sign in → watchlist row still present

---

## 15. Progress Summary

| Module | P0 items | P1 items |
|--------|----------|----------|
| Auth | 10 | 1 |
| Navigation | 5 | 2 |
| Dashboard | 5 | 0 |
| Search & detail | 11 | 0 |
| Watchlist | 9 | 1 |
| Alerts | 9 | 1 |
| Jobs & API | 6 + 3 routes | 1 |
| Email | 4 | 1 |
| AI | 0 | 4 |
| Market data | 5 | 1 |
| Cross-cutting | 5 | 0 |

**v1 gate:** All **P0** checkboxes in sections 1–11, 12 (MongoDB through Nodemailer), 13, and smoke test steps 1–7.

---

## Related Documents

- [Functional requirements](functional-requirements.md)
- [Non-functional requirements](non-functional-requirements.md)
- [User flows](user-flows.md)
- [External services](external-services.md)
- [Requirements index](README.md)
