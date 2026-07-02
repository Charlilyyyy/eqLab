# Non-Functional Requirements

Quality attributes and operational constraints for **MarkGauge** v1. These requirements complement [functional requirements](functional-requirements.md) and apply across all modules unless noted otherwise.

**ID prefix:** `NFR-`  
**Priority:** `P0` = must meet for v1 release | `P1` = should meet | `P2` = target / post-v1 hardening

---

## 1. Security

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-S01 | Authenticated access to app routes | P0 | Dashboard, watchlist, and stock detail require valid session |
| NFR-S02 | Secure password storage | P0 | Passwords hashed by auth library; never logged or returned in API responses |
| NFR-S03 | Session management | P0 | HTTP-only secure cookies or equivalent; session invalidated on sign-out |
| NFR-S04 | CSRF protection | P0 | Server actions and mutating routes protected per framework defaults |
| NFR-S05 | Resource ownership | P0 | Watchlist and alert queries always filtered by authenticated `userId` |
| NFR-S06 | Server-only secrets | P0 | API keys (market data, AI, email, DB, job runner) in environment variables only |
| NFR-S07 | Webhook verification | P0 | Job runner and alert trigger routes validate provider signatures or shared secrets |
| NFR-S08 | Input validation | P0 | Symbol, email, threshold, and form fields validated server-side |
| NFR-S09 | Injection resistance | P0 | Parameterized DB queries via ODM; no string-concatenated queries |
| NFR-S10 | HTTPS in production | P0 | TLS terminated at hosting edge; no plain HTTP for user traffic |
| NFR-S11 | Auth error messages | P1 | Sign-in failures do not confirm whether email exists in system |
| NFR-S12 | Rate limit on auth endpoints | P1 | Throttle repeated failed sign-in attempts per IP / account |
| NFR-S13 | Security headers | P1 | Baseline headers via hosting config (e.g. `X-Frame-Options`, CSP as feasible) |

---

## 2. Performance

| ID | Requirement | Priority | Target / detail |
|----|-------------|----------|-----------------|
| NFR-P01 | Dashboard first paint | P0 | Meaningful shell visible within 2s on broadband desktop |
| NFR-P02 | Stock detail quote load | P0 | Quote and profile render within 3s when upstream API healthy |
| NFR-P03 | Search debounce | P0 | Client debounce 300–500ms before server search invocation |
| NFR-P04 | Watchlist table load | P0 | List of ≤50 symbols with enriched quotes within 5s |
| NFR-P05 | Server-side rendering | P1 | Critical pages use SSR/SSG patterns appropriate to data freshness |
| NFR-P06 | Quote caching | P0 | Repeat quote requests within TTL served from cache to reduce latency and API cost |
| NFR-P07 | Batch quote fetch | P1 | Watchlist enrichment batches symbols where provider allows |
| NFR-P08 | Job execution time | P0 | Single alert evaluation cycle completes within 2 minutes for ≤500 active alerts |
| NFR-P09 | Email dispatch latency | P1 | Alert email queued within 60s of successful trigger detection |
| NFR-P10 | Bundle discipline | P1 | Avoid loading heavy chart scripts on routes that do not need them |

---

## 3. API Rate Limits & External Quotas

MarkGauge depends on third-party market data with plan-specific limits. Requirements apply to **outbound** usage and **inbound** protection.

### Market data provider

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-R01 | Centralized API client | P0 | All market data calls through shared server module with rate awareness |
| NFR-R02 | Response caching | P0 | TTL cache on quotes (e.g. 30–60s) and longer TTL on profile data where acceptable |
| NFR-R03 | Quota monitoring | P1 | Log or metric when approaching daily/minute caps |
| NFR-R04 | Graceful degradation | P0 | On 429 or quota exceeded, show user-visible error; do not hammer retries |
| NFR-R05 | Alert job staggering | P0 | Batch symbol fetches; dedupe quote requests when multiple alerts share symbol |
| NFR-R06 | Search throttling | P1 | Limit search requests per user session to prevent abuse |

### AI provider

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-R07 | Token budget per summary | P1 | Cap prompt and completion length for cost predictability |
| NFR-R08 | AI call timeout | P0 | Hard timeout (e.g. 30s); failure does not block alert email |
| NFR-R09 | AI rate limit | P1 | Queue or skip summaries when provider returns 429 |

### Email provider

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-R10 | Send rate compliance | P0 | Respect SMTP/provider sending limits; queue bursts |
| NFR-R11 | Bounce handling | P2 | Log hard bounces; no automatic retry loop on invalid address |

### Application inbound

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-R12 | Public route protection | P1 | Rate limit unauthenticated auth and webhook endpoints |
| NFR-R13 | Payload size limits | P0 | Reject oversized request bodies on API routes |

---

## 4. Availability & Uptime

| ID | Requirement | Priority | Target / detail |
|----|-------------|----------|-----------------|
| NFR-U01 | Production hosting SLA | P1 | Target 99.5% monthly uptime on managed platform (Vercel or equivalent) |
| NFR-U02 | Health of dependencies | P0 | App remains navigable when market data temporarily unavailable |
| NFR-U03 | Database availability | P0 | Managed MongoDB or equivalent with automated backup |
| NFR-U04 | Job runner reliability | P0 | Scheduled alert checks survive single deploy; idempotent handlers |
| NFR-U05 | Zero-downtime deploys | P1 | Rolling deploys via platform; no manual maintenance window for v1 |
| NFR-U06 | Status communication | P2 | Document known dependency outages in README or status note |

**Acceptable v1 degradation modes:**

- Quotes stale with visible timestamp when cache serves aged data
- AI summary omitted when model or news fetch fails
- Alert check delayed to next interval when provider returns 503 (not marked triggered)

**Unacceptable:**

- Silent wrong prices
- Alert marked triggered without email attempt logged
- Cross-user data visible in any UI or API response

---

## 5. Reliability & Data Integrity

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-D01 | Alert trigger idempotency | P0 | One trigger event per alert lifecycle; no duplicate emails for same cross |
| NFR-D02 | Atomic alert state update | P0 | `isActive` and `lastSent` updated together on trigger |
| NFR-D03 | Watchlist uniqueness | P0 | DB unique constraint on `(userId, symbol)` |
| NFR-D04 | Transactional email logging | P1 | Log send success/failure with alert id correlation |
| NFR-D05 | DB connection resilience | P0 | Retry transient connection errors on startup |
| NFR-D06 | Job retry policy | P1 | Transient failures retried with backoff; permanent failures logged |
| NFR-D07 | Data retention | P2 | Triggered alerts retained for user history unless user deletes |
| NFR-D08 | Backup frequency | P1 | Daily automated DB backup in production environment |

---

## 6. Scalability

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-C01 | v1 user scale | P0 | Design for hundreds of concurrent users, thousands of registered accounts |
| NFR-C02 | Active alerts scale | P0 | Support at least 5,000 active alerts across all users in v1 |
| NFR-C03 | Stateless app tier | P1 | No in-memory-only session state required for horizontal scale |
| NFR-C04 | Index strategy | P0 | Indexes on `userId`, `(userId, symbol)`, `(symbol, isActive)` for alerts |
| NFR-C05 | Background work offload | P0 | Price checks and AI runs in job runner, not synchronous HTTP request |

v1 does **not** require multi-region or sharded database topologies.

---

## 7. Maintainability & Code Quality

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-M01 | TypeScript strict mode | P0 | Shared types for API responses and domain models |
| NFR-M02 | Lint clean | P0 | ESLint passes with zero errors on CI |
| NFR-M03 | Layered structure | P0 | UI → server actions / routes → lib → database models |
| NFR-M04 | Environment template | P0 | `.env.example` documents every required secret and key |
| NFR-M05 | Single package manager lockfile | P0 | Reproducible installs via lockfile in repo |
| NFR-M06 | Error boundaries | P1 | User-facing error UI on unhandled render failures |
| NFR-M07 | Constants centralization | P1 | Market hours, cache TTLs, and enums in shared constants module |

---

## 8. Observability

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-O01 | Structured server logs | P1 | JSON or leveled logs for auth failures, API errors, job runs |
| NFR-O02 | Alert job metrics | P1 | Log count evaluated, triggered, skipped, failed per run |
| NFR-O03 | External API errors | P0 | Log provider status code and correlation id; never log secrets |
| NFR-O04 | Client error visibility | P1 | Toast or inline message for user-initiated action failures |
| NFR-O05 | Production error tracking | P2 | Optional integration with error reporting service post-v1 |

---

## 9. Usability & Accessibility

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-X01 | Desktop-first layout | P0 | Usable at 1280px width; responsive down to tablet |
| NFR-X02 | Keyboard search | P1 | Search command openable via keyboard shortcut where implemented |
| NFR-X03 | Form labels | P0 | All inputs have associated labels (Radix / shadcn patterns) |
| NFR-X04 | Loading states | P0 | Skeleton or spinner during quote and watchlist fetch |
| NFR-X05 | Empty states | P0 | Watchlist and alert list guide next action when empty |
| NFR-X06 | Color contrast | P1 | Dark theme text meets WCAG AA for body copy where feasible |
| NFR-X07 | Financial disclaimer | P0 | AI and alert copy state informational purpose, not investment advice |

---

## 10. Compliance & Legal (v1 Baseline)

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-L01 | No investment advice | P0 | Product copy and AI prompts avoid buy/sell recommendations |
| NFR-L02 | Market data attribution | P1 | Display provider attribution where license requires |
| NFR-L03 | Privacy minimalism | P1 | Collect only sign-up fields needed for account and email |
| NFR-L04 | Email unsubscribe | P2 | Transactional alert emails may omit marketing unsubscribe; welcome/alert are transactional |

Formal SOC 2 or broker-dealer compliance is **out of scope** for v1 (see discovery non-goals).

---

## 11. Deployment & Environments

| ID | Requirement | Priority | Detail |
|----|-------------|----------|--------|
| NFR-E01 | Local dev parity | P0 | `npm run dev` runs app with documented env vars |
| NFR-E02 | Production env isolation | P0 | Separate DB and API keys for prod vs. dev |
| NFR-E03 | CI pipeline | P1 | Lint (and tests when added) on pull request |
| NFR-E04 | Build success | P0 | Production build completes without type errors |
| NFR-E05 | Job runner in dev | P0 | Document local job dev server for alert testing |
| NFR-E06 | Secret rotation | P2 | Document procedure for rotating API keys without code change |

---

## 12. Configuration Reference (Planned Defaults)

Values to externalize in environment or constants — finalized during architecture:

| Setting | Suggested default | Maps to |
|---------|-------------------|---------|
| `QUOTE_CACHE_TTL_SECONDS` | 60 | NFR-P06, NFR-R02 |
| `SEARCH_DEBOUNCE_MS` | 400 | NFR-P03 |
| `ALERT_CHECK_INTERVAL_MINUTES` | 5 | NFR-P08, user flow F7 |
| `AI_REQUEST_TIMEOUT_MS` | 30000 | NFR-R08 |
| `MAX_WATCHLIST_SYMBOLS` | 50 | NFR-P04 (soft limit) |
| `MAX_ACTIVE_ALERTS_PER_USER` | 20 | Abuse prevention |

---

## 13. NFR Traceability to Functional Areas

| Area | Primary NFR groups |
|------|-------------------|
| Auth | NFR-S01–S12 |
| Dashboard & detail | NFR-P01–P07, NFR-U02 |
| Watchlist | NFR-P04, NFR-S05, NFR-D03 |
| Alerts & jobs | NFR-P08–P09, NFR-D01–D02, NFR-U04, NFR-R05 |
| Market data | NFR-R01–R06, NFR-P06 |
| Email | NFR-R10, NFR-P09 |
| AI | NFR-R07–R09, NFR-L01 |

---

## Related Documents

- [Functional requirements](functional-requirements.md)
- [User flows](user-flows.md)
- [External services](external-services.md)
- [Feature checklist](feature-checklist.md) *(upcoming)*
- [Discovery non-goals](../discovery/non-goals.md)
