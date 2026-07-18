export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Welcome to MarkGauge</title></head>
<body style="font-family: system-ui, sans-serif; background: #141414; color: #ccdadc; padding: 24px;">
  <h1 style="color: #e8ba40;">Welcome aboard, {{name}}</h1>
  <div>{{intro}}</div>
  <p style="color: #9095a1; font-size: 14px;">MarkGauge — your gauge on the market.</p>
</body>
</html>`;

export const STOCK_ALERT_UPPER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; background: #141414; color: #ccdadc; padding: 24px;">
  <h2 style="color: #e8ba40;">Price alert: {{symbol}}</h2>
  <p>{{company}} crossed above {{thresholdPrice}}. Current: {{currentPrice}}</p>
</body>
</html>`;

export const STOCK_ALERT_LOWER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<body style="font-family: system-ui, sans-serif; background: #141414; color: #ccdadc; padding: 24px;">
  <h2 style="color: #e8ba40;">Price alert: {{symbol}}</h2>
  <p>{{company}} crossed below {{thresholdPrice}}. Current: {{currentPrice}}</p>
</body>
</html>`;

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Your MarkGauge market brief</title></head>
<body style="font-family: system-ui, sans-serif; background: #141414; color: #ccdadc; padding: 24px;">
  <h1 style="color: #e8ba40;">Market brief — {{date}}</h1>
  <div>{{newsContent}}</div>
  <p style="color: #9095a1; font-size: 14px;">Informational only. MarkGauge does not provide trade advice.</p>
</body>
</html>`;
