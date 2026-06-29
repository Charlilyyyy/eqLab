# Target Personas

Four user types cover the MarkGauge audience: people who hold equities over years, people who trade around short-term moves, people who track many names for learning or paper portfolios, and people who only check markets in short windows. Each persona shares the need for consolidated data and timely alerts, but differs in frequency, symbol count, and tolerance for complexity.

---

## Persona Overview

| Persona | Investing style | Primary goal | Typical session |
|---------|-----------------|--------------|-----------------|
| Long-Term Holder | Buy-and-hold, periodic adds | Stay aware of large moves on core holdings without daily charting | 5–10 minutes, a few times per week |
| Active Trader | Intraday or multi-day swings | Fast quotes, reliable alerts on entry/exit levels | 30+ minutes during market hours |
| Portfolio Enthusiast | Mixed paper and real tracking | Organize a growing symbol list with news and context | 15–20 minutes, most weekdays |
| Part-Time Monitor | Side interest alongside a day job | Morning/evening snapshot plus email when thresholds hit | 2–5 minutes, open and close |

---

## Long-Term Holder

### Profile

Retail investor with a diversified portfolio of stocks and ETFs held for months or years. Uses a discount broker for execution but does not live inside that app. Checks financial news occasionally and cares about dividend dates and large drawdowns more than tick-by-tick action.

**Example:** Maya, 38, contributes to a retirement brokerage account and holds 12–20 positions. She reads earnings headlines on weekends and wants to know if a holding drops more than 5% without refreshing five websites.

### Goals

- See current price and daily change for holdings she cares about in one view
- Add or remove symbols from a persistent watchlist without re-entering them each visit
- Set a small number of price alerts for rebalancing or buying opportunities
- Skim news filtered to watchlist symbols, not the entire market feed

### Frustrations today

- Broker watchlists are tied to one account and feel cluttered with trading chrome
- Free finance portals show ads and bury the list behind navigation layers
- Mobile push from the broker is either too noisy or too limited in rule expression
- No single place that combines quotes, list, and email alerts she controls

### Success with MarkGauge

- Signs up once, builds a watchlist, returns days later with the same list intact
- Receives one clear email when a symbol crosses a price she set
- Opens the dashboard and understands portfolio-relevant movement in under a minute

### Key interactions

- Browse market overview on home dashboard
- Search and open stock detail pages
- Add/remove symbols from watchlist
- Create and manage price alerts
- Read news related to watchlist symbols

---

## Active Trader

### Profile

Trades public equities actively — intraday scalps, opening-range plays, or swing positions held several days. Screen time is high during session hours. Speed and accuracy of quotes matter; delayed data is a dealbreaker for entries, though monitoring alerts can supplement live watching.

**Example:** James, 29, trades US large caps and liquid mid caps from a home office. He keeps a running list of 15–25 symbols for the week and sets alerts at support/resistance levels when he steps away for meetings.

### Goals

- Look up any symbol quickly and see live quote, change percent, and a usable chart
- Maintain a dynamic watchlist that updates with current prices without manual refresh
- Fire alerts on precise price crosses (above/below target) while away from the desk
- Reduce tab count — stop juggling a charting site, a screener, and a broker window for monitoring

### Frustrations today

- Charting platforms charge for alerts or cap the number of active triggers
- Broker apps prioritize order entry, not cross-symbol monitoring
- Spreadsheets with manual price paste fall behind within minutes
- Generic market homepages waste attention on indices he does not trade

### Success with MarkGauge

- Search → detail → alert flow completes in under a minute
- Watchlist table shows live price and change percent for all tracked symbols
- Background checks honor alert rules and email him when a level is hit
- Stock detail embeds an interactive chart for quick technical context

### Key interactions

- Symbol search from header command palette
- Stock detail with chart and company profile
- Watchlist table with sortable live fields
- Alert modal: symbol, target price, condition (above/below)
- Email notification on triggered alert

---

## Portfolio Enthusiast

### Profile

Finance-curious user who tracks many tickers — some owned, some on a paper list for learning. May be early in investing career or building skills before committing capital. Values organization, education, and context over execution speed.

**Example:** Priya, 24, follows 30+ companies across sectors to learn how earnings and news move prices. She keeps notes elsewhere but wants one system of record for symbols and headlines.

### Goals

- Grow and curate a watchlist without symbol limits that feel arbitrary
- See market cap, P/E, and other summary fields alongside price in one table
- Read aggregated news for everything on her list
- Optionally benefit from AI-generated summaries that tie headlines to her symbols

### Frustrations today

- Notes apps and spreadsheets do not fetch live prices
- Reading news ticker-by-ticker does not scale past ten names
- Social forums mix hype with data; hard to trust signal
- Creating a new account on every tool means lists never stay in sync

### Success with MarkGauge

- Watchlist page is the hub — prices, fundamentals-lite columns, and news module
- Adding a symbol from search or stock detail is one click
- News section surfaces articles relevant to her list without manual RSS setup

### Key interactions

- Watchlist CRUD (add, remove, list)
- Watchlist table with extended quote fields
- Watchlist-scoped news panel
- Stock detail for deeper company context
- Optional AI insight summaries (when enabled in later milestones)

---

## Part-Time Monitor

### Profile

Professional with limited time who owns a small number of stocks or ETFs and wants low-friction awareness. Checks markets at open, lunch, or close — not continuously. Email is the primary notification channel; the web app is the reference when something looks worth a deeper look.

**Example:** David, 45, holds eight employer-chosen positions plus two personal picks. He opens finance sites on his phone during coffee and wants email only when a price alert fires, not a stream of app pings.

### Goals

- Glance at market overview widgets without configuring complex layouts
- Maintain a short watchlist that persists across devices after login
- Rely on email alerts as the main "tell me when to look" mechanism
- Avoid learning a professional terminal or paid subscription for basic monitoring

### Frustrations today

- Phone broker notifications are binary — all or nothing per symbol
- Bookmarking individual ticker pages does not scale
- Forgets to check until a friend mentions a move he missed
- Too many finance apps assume he wants to trade, not just watch

### Success with MarkGauge

- Home dashboard gives market pulse in one screen
- Two or three alerts cover his entire monitoring need
- Email subject line tells him symbol, condition, and price without opening the app
- Sign-in on laptop and phone shows the same list

### Key interactions

- Home dashboard (indices, heatmap-style overview, top stories widgets)
- Minimal watchlist management
- Simple alert creation
- Email on alert trigger
- Sign up, sign in, sign out across sessions

---

## Needs Comparison

| Need | Long-Term Holder | Active Trader | Portfolio Enthusiast | Part-Time Monitor |
|------|:----------------:|:-------------:|:--------------------:|:-----------------:|
| Live quotes | Moderate | Critical | High | Moderate |
| Watchlist size | Small–medium | Medium | Large | Small |
| Price alerts | Few, long-lived | Many, changes often | Some | Few |
| Charts on detail | Nice to have | Critical | Nice to have | Rarely used |
| News per list | Useful | Selective | Critical | Low |
| Email notifications | High | High | Medium | Critical |
| Session length | Short | Long | Medium | Very short |

---

## Primary User for v1

**Active Trader** is the strictest real-time and alert customer: if quotes feel stale or alerts fail, they leave first. **Long-Term Holder** is the broadest adoption target — lower daily engagement but strong retention when alerts work reliably.

v1 discovery success anchors on a flow both can complete: register → add symbols to watchlist → set a price alert → receive email when triggered. Portfolio Enthusiast and Part-Time Monitor benefit from the same core path with less configuration.

---

## Out of Scope for Personas (v1)

These audience types are acknowledged but not primary for the first release:

- **Institutional analysts** — need terminals, compliance exports, and team workspaces
- **Social / copy traders** — want feeds and leaderboards, not personal lists
- **Crypto-only traders** — different asset class and data providers
- **Unauthenticated visitors** — may browse marketing pages later; v1 features assume a signed-in user

---

## Related Documents

- [Problem statement](problem-statement.md)
- [Vision and product pitch](vision.md)
- [Value propositions](value-propositions.md)
- [Goals and scope](goals-and-scope.md)
- [Non-goals](non-goals.md)
- [Discovery index](README.md)
