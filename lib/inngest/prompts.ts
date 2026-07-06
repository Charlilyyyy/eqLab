export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generate a short HTML paragraph for a welcome email for MarkGauge, a personal equity monitoring app.
User profile: {{userProfile}}
Rules: informational tone only, no buy/sell advice, 35-50 words, single <p> tag.`;

export const NEWS_SUMMARY_EMAIL_PROMPT = `Summarize the following market news for a watchlist user. Informational only, no trade advice.
News data: {{newsData}}`;
