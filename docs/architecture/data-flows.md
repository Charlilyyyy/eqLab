# Data Flows

How data moves through **MarkGauge** for user actions, market data reads, watchlist mutations, and alert-triggered email. Complements [system architecture](system-architecture.md) with sequence-level detail for implementation.

**Legend**

- Solid arrows: synchronous or request-scoped path
- Dashed arrows: async / scheduled path
- `Cache` = in-memory or short-TTL server cache for Finnhub quotes

---

## Flow Index

| ID | Flow | Type | Triggers |
|----|------|------|----------|
| DF-01 | User registration | Write | Sign-up form submit |
| DF-02 | User sign-in | Read/write | Sign-in form submit |
| DF-03 | Dashboard load | Read | Navigate to `/` |
| DF-04 | Symbol search | Read | Search input (debounced) |
| DF-05 | Stock detail load | Read | Navigate to `/stocks/[symbol]` |
| DF-06 | Watchlist add/remove | Write | Watchlist button / page action |
| DF-07 | Watchlist page load | Read | Navigate to `/watchlist` |
| DF-08 | Alert create/delete | Write | Alert modal / list UI |
| DF-09 | Alert price check (batch) | Read/write | Inngest cron |
| DF-10 | Alert email delivery | Write | Trigger from DF-09 |
| DF-11 | Watchlist news load | Read | Watchlist page render |
| DF-12 | AI summary (optional) | Read/write | Inngest cron or alert step |

---

## DF-01 — User Registration

```mermaid
sequenceDiagram
    participant U as Browser
    participant F as SignUpForm
    participant SA as auth.actions
    participant BA as Better Auth
    participant DB as MongoDB
    participant EM as Nodemailer

    U->>F: submit name, email, password, country
    F->>SA: signUpWithEmail(data)
    SA->>BA: create user + session
    BA->>DB: insert user record
    BA-->>SA: session cookie
    SA->>EM: sendWelcomeEmail(email, name)
    EM-->>SA: sent / logged error
    SA-->>F: success
    F-->>U: redirect dashboard
```

| Step | Data in | Data out | Persistence |
|------|---------|----------|-------------|
| 1 | Form: `fullName`, `email`, `password`, `country`, optional profile fields | — | — |
| 2 | Credentials | User document via Better Auth | `users` collection (adapter) |
| 3 | `email`, `name` | HTML email | None (SMTP only) |
| 4 | Session token | `Set-Cookie` | Session store |

---

## DF-02 — User Sign-In

```mermaid
sequenceDiagram
    participant U as Browser
    participant SA as auth.actions
    participant BA as Better Auth
    participant DB as MongoDB

    U->>SA: email, password
    SA->>BA: signInEmail
    BA->>DB: verify credentials
    BA-->>SA: session
    SA-->>U: redirect dashboard + cookie
```

Sign-out: `auth.actions` → Better Auth `signOut` → clear cookie → redirect public route.

---

## DF-03 — Dashboard Load

```mermaid
flowchart LR
    U[User] --> L["(root)/layout"]
    L --> S{session?}
    S -->|no| SI[redirect sign-in]
    S -->|yes| P["page.tsx"]
    P --> W1[TradingView widget props]
    P --> W2[Market quotes widget]
    P --> W3[Top stories widget]
    W1 --> CDN[TradingView CDN]
    W2 --> FH[Finnhub optional]
    W3 --> FH
```

| Data | Source | Cached |
|------|--------|--------|
| Session user | Better Auth | Per request |
| Widget config | Static / constants | Yes |
| Index quotes | Finnhub or embed | Short TTL if API-backed |

Dashboard is **read-heavy**; widget failures do not block shell render (FR-D04).

---

## DF-04 — Symbol Search

```mermaid
sequenceDiagram
    participant U as SearchCommand
    participant SA as finnhub.actions
    participant C as Quote cache
    participant FH as Finnhub

    U->>U: debounce 400ms
    U->>SA: searchStocks(query)
    SA->>FH: GET /search?q=
    FH-->>SA: symbol[], name[]
    SA-->>U: result list
    U->>U: user selects row
    U->>U: router.push /stocks/SYMBOL
```

| Field | Direction |
|-------|-----------|
| `query` | Client → server action |
| `result[].symbol`, `result[].description` | Finnhub → UI |

No persistence on search alone.

---

## DF-05 — Stock Detail Load

```mermaid
sequenceDiagram
    participant P as stocks/[symbol]/page
    participant SA as finnhub.actions
    participant C as Cache
    participant FH as Finnhub
    participant WL as watchlist.actions

    P->>SA: getQuote(symbol)
    SA->>C: lookup symbol
    alt cache hit
        C-->>SA: quote
    else cache miss
        SA->>FH: GET /quote
        FH-->>SA: quote JSON
        SA->>C: store TTL 60s
    end
    SA-->>P: price, change%

    P->>SA: getCompanyProfile(symbol)
    SA->>FH: GET /stock/profile2
    FH-->>P: profile

    P->>WL: isOnWatchlist(symbol)
    WL->>DB: find userId+symbol
    DB-->>P: boolean
```

| Output to UI | Source |
|--------------|--------|
| `currentPrice`, `changePercent` | Finnhub quote |
| Company name, market cap, etc. | Finnhub profile |
| Chart | TradingView client widget |
| Watchlist button state | MongoDB watchlist |

---

## DF-06 — Watchlist Add / Remove

### Add

```mermaid
sequenceDiagram
    participant U as WatchlistButton
    participant SA as watchlist.actions
    participant BA as session
    participant DB as MongoDB

    U->>SA: addToWatchlist(symbol, company)
    SA->>BA: getSession()
    BA-->>SA: userId
    SA->>DB: insert { userId, symbol, company, addedAt }
    alt duplicate
        DB-->>SA: unique index error
        SA-->>U: error toast
    else success
        DB-->>SA: document
        SA-->>U: success toast + UI update
    end
```

### Remove

`removeFromWatchlist(symbol)` → `deleteOne({ userId, symbol })` → UI toggle state.

**Data written:** one watchlist document per add. **No Finnhub call** on mutation (quotes enriched on read).

---

## DF-07 — Watchlist Page Load

```mermaid
flowchart TB
    P[watchlist/page] --> L[listWatchlist userId]
    L --> DB[(MongoDB)]
    DB --> R[symbols array]
    R --> E[enrich each symbol]
    E --> Q[getQuote per symbol]
    Q --> C{cache}
    C -->|hit| T[table row]
    C -->|miss| FH[Finnhub] --> T
    P --> N[getNews for symbols]
    N --> FH2[Finnhub company-news]
    FH2 --> News[WatchlistNews component]
```

| Column | Data path |
|--------|-----------|
| Symbol, company | MongoDB |
| Price, change %, cap, P/E | Finnhub quote + profile (batched/deduped) |
| News headlines | Finnhub news API aggregated |

**Optimization:** Deduplicate symbol set before quote fetch; respect `QUOTE_CACHE_TTL_SECONDS` (NFR-R05).

---

## DF-08 — Alert Create / Delete

### Create

```mermaid
sequenceDiagram
    participant U as AlertModal
    participant SA as alert.actions
    participant BA as session
    participant DB as MongoDB

    U->>SA: createAlert({ symbol, company, alertName, alertType, threshold })
    SA->>BA: getSession()
    BA-->>SA: userId, email
    SA->>SA: validate threshold > 0
    SA->>DB: insert alert isActive true
    DB-->>SA: alert doc
    SA-->>U: close modal, refresh list
```

### Delete

`deleteAlert(alertId)` → verify `userId` ownership → `deleteOne` or soft-delete per implementation.

**Stored fields:** see [functional requirements](../requirements/functional-requirements.md) alert entity.

---

## DF-09 — Alert Price Check (Batch Job)

Core background flow — runs on Inngest schedule.

```mermaid
flowchart TB
    CRON[Inngest cron every 5 min] --> API["/api/inngest"]
    API --> FN[checkPriceAlerts function]
    FN --> Q1["find({ isActive: true })"]
    Q1 --> DB[(MongoDB)]
    DB --> ALERTS[alert list]
    ALERTS --> DEDUPE[unique symbols map]
    DEDUPE --> LOOP[for each symbol]
    LOOP --> QUOTE[getQuote from cache or Finnhub]
    QUOTE --> EVAL{price vs threshold}
    EVAL -->|no match| NEXT[next alert]
    EVAL -->|upper: price >= threshold| TRIG[trigger path]
    EVAL -->|lower: price <= threshold| TRIG
    TRIG --> UPD["update isActive false, lastSent"]
    UPD --> DF10[DF-10 email]
```

| Rule | Evaluation |
|------|------------|
| `upper` | `currentPrice >= threshold` |
| `lower` | `currentPrice <= threshold` |
| Quote missing | Skip alert this cycle; log (FR-J06) |
| Already inactive | Skip |

**Idempotency:** After trigger, `isActive: false` prevents re-fire (NFR-D01).

---

## DF-10 — Alert Email Delivery

```mermaid
sequenceDiagram
    participant FN as Inngest function
    participant SA as alert.actions / mailer
    participant GM as Gemini optional
    participant EM as Nodemailer
    participant U as User inbox

    FN->>SA: buildAlertEmailPayload(alert, currentPrice)
    opt AI enabled
        SA->>GM: summarize(news + quote context)
        GM-->>SA: summary text or timeout
    end
    SA->>EM: sendMail(to, subject, html)
    EM-->>SA: messageId / error
    SA-->>FN: log outcome
    EM-->>U: alert email
```

| Email field | Source |
|-------------|--------|
| `to` | `alert.userEmail` |
| Subject | Template: symbol + condition |
| Body | symbol, company, alertName, threshold, trigger price, optional AI blurb |
| Template | `lib/nodemailer/templates.ts` |

Failure: log error; Inngest may retry; alert state already `triggered` (FR-E04).

---

## DF-11 — Watchlist News

```mermaid
sequenceDiagram
    participant P as watchlist page
    participant SA as finnhub.actions
    participant FH as Finnhub

    P->>SA: getNewsForSymbols(symbols[])
    loop each symbol or batch
        SA->>FH: GET /company-news
        FH-->>SA: articles[]
    end
    SA-->>P: merged deduped headlines
```

Read-only; failures show empty news panel with message (FR-W10).

---

## DF-12 — AI Summary (Optional)

```mermaid
flowchart LR
    JOB[Inngest generateMarketSummary] --> NEWS[fetch watchlist news]
    JOB --> QUOTES[fetch quotes]
    NEWS --> PROMPT[build prompt]
    QUOTES --> PROMPT
    PROMPT --> GM[Gemini API]
    GM --> OUT[summary text]
    OUT --> EMAIL[append to email]
    OUT --> UI[future: watchlist card]
```

Constraints: 30s timeout (NFR-R08); no buy/sell language in prompt (FR-I02).

---

## Read vs Write Summary

```mermaid
flowchart TB
    subgraph writes["Write paths — MongoDB"]
        W1[sign-up user]
        W2[watchlist add/remove]
        W3[alert create/delete]
        W4[alert trigger update]
    end

    subgraph reads["Read paths — mostly Finnhub + MongoDB"]
        R1[search / quote / profile]
        R2[watchlist list]
        R3[alert list]
        R4[dashboard widgets]
    end

    subgraph async["Async side effects"]
        A1[welcome email]
        A2[alert email]
        A3[AI summary]
    end

    W1 --> A1
    W4 --> A2
    W4 --> A3
```

| Operation | Primary store | External read | External write |
|-----------|---------------|---------------|----------------|
| Auth | MongoDB (auth) | — | SMTP welcome |
| Watchlist CRUD | MongoDB | Finnhub on page load | — |
| Alert CRUD | MongoDB | — | — |
| Alert job | MongoDB | Finnhub quotes | SMTP alert |
| Search/detail | — | Finnhub | — |

---

## Caching Data Flow

```mermaid
flowchart LR
    REQ[Server action] --> CACHE{In-memory / unstable_cache}
    CACHE -->|hit fresh| RES[return data]
    CACHE -->|miss or stale| FH[Finnhub API]
    FH --> STORE[set TTL]
    STORE --> RES
```

| Data type | Suggested TTL | Invalidation |
|-----------|---------------|--------------|
| Quote | 30–60s | TTL expiry |
| Company profile | 5–15 min | TTL expiry |
| Search results | None or 10s | Per-query short cache |
| News | 5 min | TTL expiry |

On HTTP 429 from Finnhub: return cached stale if available else error to UI (NFR-R04).

---

## End-to-End Anchor Flow (Data Perspective)

Single diagram tying discovery anchor scenario to data movement:

```mermaid
sequenceDiagram
    participant U as User
    participant App as MarkGauge
    participant DB as MongoDB
    participant FH as Finnhub
    participant IN as Inngest
    participant EM as Email

    U->>App: register
    App->>DB: user
    App->>EM: welcome

    U->>App: open AAPL detail
    App->>FH: quote + profile
    FH-->>App: market data

    U->>App: add watchlist
    App->>DB: watchlist row

    U->>App: create upper alert
    App->>DB: alert active

    IN->>App: cron checkPriceAlerts
    App->>DB: load alerts
    App->>FH: quotes
    App->>DB: mark triggered
    App->>EM: alert email
    EM-->>U: inbox
```

---

## Related Documents

- [System architecture](system-architecture.md)
- [Background jobs](background-jobs.md) *(upcoming)*
- [User flows](../requirements/user-flows.md)
- [Functional requirements](../requirements/functional-requirements.md)
- [Non-functional requirements](../requirements/non-functional-requirements.md)
