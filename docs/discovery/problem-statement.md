# Problem Statement

## Summary

Retail investors and active traders who follow public equities spend their mornings bouncing between broker apps, free finance portals, spreadsheet tabs, and notification settings that were never designed to work together. Live quotes live in one place; the symbols they care about live in another; price thresholds they want to act on require manual checking or brittle mobile alerts from a single broker. When markets move fast, the cost is missed entries, reactive decisions, and attention drained by tab-hopping instead of analysis.

The product we are defining exists to give individuals one calm surface: trustworthy live market data, a personal symbol list they control, and configurable alerts that reach them when conditions matter — without forcing them to adopt a full brokerage or a professional terminal they do not need.

---

## Who Hurts

### Retail investors building long-term positions

People who hold a diversified basket of stocks and ETFs check prices episodically but still want timely awareness when a holding moves sharply or approaches a level they have been watching. They use free sites for quotes and their broker for trades, so context fragments across logins and devices.

### Day traders and swing traders

Active participants need fast symbol lookup, reliable intraday quotes, and alerts that fire on price crosses — not end-of-day summaries. Consumer broker apps optimize for order entry, not for cross-symbol monitoring or news tied to a curated list.

### Portfolio trackers and finance enthusiasts

Users who track many tickers for learning or paper portfolios maintain watchlists in notes apps or spreadsheets. Updating prices manually or refreshing ten browser tabs does not scale when they follow more than a handful of names.

### Part-time market followers

Professionals with limited screen time want a lightweight dashboard on open and close, plus email when something important happens. They are underserved by platforms that assume all-day charting or social feeds as the default experience.

---

## What Hurts

| Area | Current reality | Impact |
|------|-----------------|--------|
| Market data access | Quotes scattered across broker UIs, aggregators, and search results | Stale or inconsistent numbers; wasted time reconciling sources |
| Watchlist management | Lists trapped in one broker or a personal spreadsheet | No portable, user-owned list that follows them across sessions |
| Price alerts | Per-app alert limits, delayed notifications, or manual price checks | Missed moves; alert fatigue from tools that cannot express simple thresholds |
| News context | Headlines disconnected from the symbols on a personal list | Reading generic market news instead of what matters to holdings |
| Account overhead | Full brokerage signup required for basic monitoring features | Friction for users who only want visibility, not trading |
| Cognitive load | Many tabs, apps, and notification channels | Decision quality drops when attention is spent on tooling, not thesis |

The pain is practical first — too many tools for one job — but the emotional weight shows up when someone learns about a large move hours after it happened because nothing told them at the right time.

---

## Why Now

Several forces make a focused rebuild timely rather than optional:

1. **Democratized market participation** — More individuals hold equities directly or through apps. Expectations for live data and personalization match what they get in other consumer software.

2. **Mature web stack** — Modern full-stack frameworks, managed authentication, document databases, and background job platforms make a credible monitoring product achievable without building infrastructure from scratch.

3. **Accessible market data APIs** — Licensed quote and company data can be integrated at reasonable cost for a v1 focused on monitoring rather than order execution.

4. **AI-assisted summaries** — Models can condense news and context for a user's symbols when grounded in retrieved data, offering differentiated insight without replacing human judgment.

5. **Fragmented incumbents** — Large portals optimize for ads and breadth; brokers optimize for trading volume. A narrow product that does watchlists, alerts, and clarity well still has room.

---

## Problem in One Sentence

**Individual investors lack a single, dependable place to monitor live market data, maintain their own symbol list, and receive timely alerts — so they either overpay in attention or underreact when prices move.**

---

## What Success Would Look Like (Problem Side)

If the problem is real, users would adopt a system that:

- Surfaces live quotes and basic company context without requiring a trade account
- Lets them build and persist a personal watchlist across sessions
- Sends trustworthy notifications when user-defined price conditions are met
- Reduces daily tab count and manual refresh habits
- Stays fast and readable on desktop first, with room to grow

The following discovery documents define *who* uses the product, *what* value it must deliver, and *where* v1 draws the line against future ambition.

---

## Related Documents

- [Vision and product pitch](vision.md)
- [User personas](personas.md)
- [Value propositions](value-propositions.md)
- Goals and scope *(upcoming)*
- Non-goals *(upcoming)*
