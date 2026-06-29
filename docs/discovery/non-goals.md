# Non-Goals

Explicit exclusions for MarkGauge v1 and the near-term product direction. Items here are **intentionally out of scope** — not forgotten, not "phase two unless someone asks." When build decisions arise, this document is the tie-breaker against scope creep.

Alignment: deferred capabilities in [goals-and-scope.md](goals-and-scope.md) are summarized here with sharper "we will not" language.

---

## Product Category Exclusions

### We are not a brokerage

- No buy, sell, or order routing
- No custody of funds or securities
- No margin, options chain trading, or fractional share execution
- No account linking to execute trades at external brokers (read-only broker import is also out for v1)

**Rationale:** MarkGauge is a monitoring and alerting workspace. Entering execution introduces regulation, broker partnerships, and UX centered on orders — a different company.

### We are not a robo-advisor

- No automated portfolio allocation recommendations
- No "model portfolios" or risk scoring that implies fiduciary advice
- No rebalancing suggestions presented as actions to take

**Rationale:** Users make their own decisions. AI output, when present, summarizes context — it does not prescribe trades.

### We are not a social finance network

- No public user profiles, follower graphs, or stock tip feeds
- No comment threads, upvotes, or shared watchlists between users
- No copy-trading or leaderboards

**Rationale:** Social layers optimize for engagement and noise; MarkGauge optimizes for personal clarity and timely alerts.

---

## Feature Exclusions (v1)

### Portfolio and positions

- No cost basis, lot tracking, or gain/loss calculations
- No dividend calendar tied to owned shares
- No CSV import from brokers for holdings
- No "true portfolio" view — watchlist is symbols of interest, not asserted positions

### Asset class expansion

- No cryptocurrency spot or perpetuals
- No forex pairs
- No commodities futures or options greeks
- US-listed equities and mainstream ETFs are the v1 data focus unless API coverage naturally includes ADRs

### Advanced market tooling

- No built-in screener with dozens of fundamental filters
- No custom indicator editor or drawing tools beyond embedded chart widget
- No level-two order book or time-and-sales tape
- No backtesting or paper-trading simulator

### Notification channels

- No SMS alerts in v1
- No mobile push notifications in v1
- No Slack, Discord, or webhook integrations in v1
- Email is the sole outbound alert channel for first release

### Collaboration and enterprise

- No team accounts, org billing, or seat management
- No shared watchlists or alert rules across users
- No admin console for support staff beyond standard app operator needs
- No SSO/SAML for enterprises in v1

### Platform and distribution

- No native iOS or Android applications in v1
- No browser extension
- No public REST or GraphQL API for third-party developers
- No white-label or embeddable widget SDK

### Content and media

- No proprietary equity research reports
- No paid subscription tier or paywalled data in v1 discovery scope
- No podcast, video, or creator marketplace
- No display advertising as a revenue model inside the product

---

## Technical Non-Goals (v1)

| Area | Non-goal | Note |
|------|----------|------|
| Real-time streaming | Sub-second websocket tick stream for every symbol | Polling/scheduled checks and on-demand quote fetch are sufficient |
| Global scale | Multi-region active-active deployment | Single-region managed hosting is acceptable for v1 |
| Offline mode | Full offline-first PWA for quotes | Quotes require network; offline queue not required |
| Data warehouse | Historical tick storage for user analytics | Use API for display; no internal tick database |
| Multi-tenancy | B2B tenant isolation patterns | One user equals one account; no org boundaries |

---

## AI Non-Goals

- No autonomous trading agents or "execute when model says buy"
- No guaranteed prediction of price direction
- No financial advice disclaimers replaced by confident recommendations
- No training on user portfolio data sold to third parties
- No open-ended chat without grounding in retrieved quotes and news

AI features, when shipped, are **assistive summaries** with human verification expected before any external action.

---

## Quality and Compliance Non-Goals (v1)

These may matter later but are **not** v1 blockers for a personal monitoring tool:

- Formal SEC/FINRA registration as an investment adviser (product does not advise)
- SOC 2 Type II certification
- Formal accessibility WCAG audit certification (best-effort accessibility still applies in implementation)
- 99.99% uptime SLA with financial penalties
- Multi-language localization beyond English UI copy

---

## Explicit "Nice to Have" — Still Not v1

Requests that sound small but expand scope; listed here to prevent gradual acceptance:

- Export watchlist to PDF or Excel
- Dark/light theme toggle (dark-only is acceptable for v1)
- Custom dashboard widget layout editor
- Per-symbol notes or tags on watchlist rows
- Multiple watchlists per user (single list is v1)
- Alert types beyond simple price cross (volume spike, % change, trailing stop)
- In-app notification center with read/unread state
- Referral program or invite credits

These may return on a prioritized backlog after anchor scenario validation.

---

## How to Use This Document

| Situation | Action |
|-----------|--------|
| Stakeholder asks for feature in a section above | Point to non-goal; offer backlog tag, not v1 commit |
| Engineer needs tie-breaker under time pressure | Prefer alert reliability and watchlist integrity over new surface area |
| Designer proposes social or portfolio tab | Reject for v1; reference vision north star (monitoring, not trading/community) |
| Data vendor pitches extra asset classes | Defer unless zero incremental UX cost and within API budget |

---

## Discovery Completion Check

Idea work is complete when readers can answer:

1. **Problem** — who hurts and why now? → [problem-statement.md](problem-statement.md)
2. **Vision** — what is MarkGauge? → [vision.md](vision.md)
3. **People** — who uses it? → [personas.md](personas.md)
4. **Value** — what do they get? → [value-propositions.md](value-propositions.md)
5. **Scope** — what ships in v1? → [goals-and-scope.md](goals-and-scope.md)
6. **Boundaries** — what do we refuse? → this document

**Decision:** Proceed to research and requirements — competitor analysis, functional specs, and external service selection.

---

## Related Documents

- [Goals and scope](goals-and-scope.md)
- [Vision and product pitch](vision.md)
- [Discovery index](README.md)
