export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generate highly personalized HTML content that will be inserted into an email template at the {{intro}} placeholder for MarkGauge, a personal equity monitoring workspace (quotes, watchlists, and price alerts — not a brokerage).

User profile data:
{{userProfile}}

PERSONALIZATION REQUIREMENTS:
You MUST create content that is obviously tailored to THIS specific user by:

IMPORTANT: Do NOT start the personalized content with "Welcome" since the email header already says "Welcome aboard {{name}}". Use alternative openings like "Thanks for joining", "Great to have you", "You're all set", "Perfect timing", etc.

1. **Direct Reference to User Details**: Extract and use specific information from their profile:
   - Their exact investment goals or objectives
   - Their stated risk tolerance level
   - Their preferred sectors/industries mentioned
   - Their country or regional context when relevant

2. **Contextual Messaging**: Create content that shows you understand their situation:
   - Growth goals → monitoring momentum and setting alerts
   - Income goals → tracking reliable names calmly
   - Conservative risk → clarity and informed decisions
   - Higher risk → staying on top of volatility with timely alerts
   - Preferred industry → reference that industry by name

3. **Personal Touch**: Make it feel written for them — connect MarkGauge features (watchlists, alerts, live quotes) to their stated needs.

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML content with NO markdown, NO code blocks, NO backticks
- Use a SINGLE paragraph only: <p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">content</p>
- Write exactly TWO sentences
- Keep total content between 35-50 words
- Use <strong> for key personalized elements (their goals, sectors, etc.)
- DO NOT include "Here's what you can do right now:" — that may already be in the template
- Informational tone only — no buy/sell advice

EXAMPLE STRUCTURE (do not copy verbatim):
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining MarkGauge — with your focus on <strong>Growth</strong> in <strong>Technology</strong>, you can keep a watchlist ready and set alerts that match a <strong>Medium</strong> risk approach. Here's a calm place to track the names you care about without juggling tabs.</p>`;

export const NEWS_SUMMARY_EMAIL_PROMPT = `Summarize the following market news for a watchlist user on MarkGauge. Informational only, no trade advice.
News data: {{newsData}}`;
