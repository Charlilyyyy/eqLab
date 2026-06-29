# Core Value Propositions

MarkGauge competes on focus, not breadth. Four pillars define what users get that fragmented broker tabs and generic finance portals do not deliver together: live market data in context, a watchlist that belongs to the user, alerts that run without manual watching, and optional AI-assisted insight grounded in real headlines. Each pillar maps to a persona need and to a measurable outcome in later milestones.

---

## Value Proposition Summary

| Pillar | User promise | Primary personas |
|--------|--------------|------------------|
| Live market data | Current quotes and market context you can trust | Active Trader, Portfolio Enthusiast |
| Personalized watchlists | Your symbols, persisted and always one click away | All |
| Intelligent alerts | Notifications when price rules you set are met | Active Trader, Part-Time Monitor |
| AI insights | Condensed, symbol-relevant context without hype | Portfolio Enthusiast, Long-Term Holder |

**Master line:**

> **One workspace for the symbols you care about — live data, your list, alerts that work, and insight when you want it.**

---

## 1. Live Market Data

### Promise

Users see up-to-date equity quotes, daily change, and essential company context without signing into a brokerage or parsing ad-heavy aggregator pages. The home dashboard offers a market pulse; stock detail pages go deeper with charts and profile data sourced from a licensed API.

### Why it matters

Stale or inconsistent numbers erode trust. Active traders abandon tools that lag; long-term holders still need accurate daily change to decide whether to read further. Consolidating data in one product removes the reconciliation tax of checking multiple sites.

### What users get

- Real-time or near-real-time quote on search and stock detail
- Market overview widgets on the dashboard (indices, heatmap-style views, top stories)
- Company profile and key metrics on symbol pages
- Clear empty and error states when upstream data is unavailable — no fabricated prices

### Differentiation

| Alternative | Gap MarkGauge fills |
|-------------|---------------------|
| Broker apps | Optimized for order entry; weak cross-broker portability |
| Free finance portals | Broad but noisy; watchlists secondary to content and ads |
| Professional terminals | Powerful but expensive and overwhelming for individuals |

### Success signal

User can search a symbol, open detail, and see a live quote plus chart in one session without leaving MarkGauge.

---

## 2. Personalized Watchlists

### Promise

Each signed-in user maintains a private list of tickers that survives across visits and devices. Add from search or stock detail; remove in one action; view the full list with live price, change percent, and summary fields in a single table.

### Why it matters

Symbols scattered across spreadsheets, notes, and broker silos do not update themselves. A persistent watchlist is the spine of the product — alerts and news attach to *this* list, not to a generic market homepage.

### What users get

- CRUD watchlist tied to user account
- Watchlist page as a hub: sortable table with live fields (price, change %, market cap, P/E where available)
- One-click add/remove from stock detail via watchlist control
- News module scoped to watchlist symbols

### Differentiation

| Alternative | Gap MarkGauge fills |
|-------------|---------------------|
| Spreadsheet tracking | Manual price updates; no integrated news or alerts |
| Single-broker lists | Locked to one account; lost if user switches brokers |
| Browser bookmarks | No live data layer; no shared alert or news context |

### Success signal

User returns after several days and finds the same watchlist with current prices loaded automatically.

---

## 3. Intelligent Alerts

### Promise

Users define price thresholds per symbol — above or below a target — and receive email when conditions are met. Background jobs check rules on a schedule so users do not need the app open. Alert history shows active and triggered rules in one place.

### Why it matters

Missed moves are the emotional cost described in the problem statement. Alerts turn passive monitoring into dependable awareness, especially for part-time monitors and traders who step away from the desk.

### What users get

- Create alert: symbol, target price, condition (cross above / below)
- List and delete active alerts from account UI
- Scheduled price checks via background worker
- Email notification on trigger with enough context to act (symbol, price, rule)
- Optional AI-enriched summary in notification content (later enhancement)

### Differentiation

| Alternative | Gap MarkGauge fills |
|-------------|---------------------|
| Broker price alerts | Per-app limits; tied to trading account |
| Manual refresh habit | Unreliable; fails when user is busy or offline |
| Third-party alert apps | Another subscription; list not integrated with quotes and news |

### Success signal

End-to-end path completes: set alert → price crosses threshold → user receives email within expected window.

---

## 4. AI Insights

### Promise

When enabled, MarkGauge uses a language model to summarize news and market context *for the user's symbols* — grounded in retrieved headlines and data, not generic financial chatter. Output supports faster comprehension; it does not constitute trade advice or autonomous decisions.

### Why it matters

Portfolio enthusiasts and long-term holders face headline volume they cannot read ticker by ticker. A bounded, cite-aware summary saves time while keeping the human in the loop.

### What users get

- Personalized market or watchlist summaries generated on a schedule or on demand
- Prompts designed to reference fetched news and quote context
- Clear framing that insights are informational, not recommendations
- Integration with alert workflow (e.g. richer email body when alert fires)

### Differentiation

| Alternative | Gap MarkGauge fills |
|-------------|---------------------|
| Social finance feeds | Sentiment and tips without verification |
| Generic chatbots | Hallucinate prices and policies without tool grounding |
| Raw news firehose | No prioritization by user's actual symbol list |

### Success signal

User reads an AI summary tied to watchlist symbols and can trace it back to real news items or quote data shown in the app.

---

## Cross-Cutting Value: Unified Workspace

Beyond the four pillars, MarkGauge delivers **cognitive relief**:

- **One identity** — sign up, sign in, session-aware navigation; protected routes for dashboard, watchlist, and stock detail
- **One design language** — dark theme, consistent layout, reusable form and table patterns
- **One notification path** — email as the reliable channel for alerts (and welcome on registration)
- **One mental model** — dashboard → watchlist → symbol detail → alert; no parallel workflows per feature

This cross-cutting value supports the vision promise: *your gauge on the market, one place.*

---

## Value vs. Feature Mapping (Forward Reference)

| Value pillar | Likely user-facing surfaces | Supporting capabilities |
|--------------|----------------------------|-------------------------|
| Live market data | Home dashboard, stock detail, search | External quote API, caching, error handling |
| Watchlists | Watchlist page, watchlist button | Auth-scoped persistence, server actions |
| Alerts | Alert modal, alert list, email | Background jobs, email transport |
| AI insights | Summary blocks, enriched emails | Model API, grounded prompts |

Detailed requirements and architecture are out of scope for this document; they belong in later discovery and build milestones.

---

## Prioritization for v1

| Pillar | v1 priority | Rationale |
|--------|-------------|-----------|
| Live market data | **Must have** | Table stakes; without quotes the product does not exist |
| Personalized watchlists | **Must have** | Core retention object; alerts and news attach here |
| Intelligent alerts | **Must have** | Primary differentiator vs. passive browsing |
| AI insights | **Should have** | Differentiator but can ship after core alert path is proven |

If scope pressure appears, trim AI polish before watchlist or alert reliability — never the reverse.

---

## Related Documents

- [Problem statement](problem-statement.md)
- [Vision and product pitch](vision.md)
- [User personas](personas.md)
- [Goals and scope](goals-and-scope.md)
- [Non-goals](non-goals.md)
- [Discovery index](README.md)
