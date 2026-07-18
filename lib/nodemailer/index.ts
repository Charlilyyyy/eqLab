import nodemailer from 'nodemailer';
import {
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  STOCK_ALERT_LOWER_EMAIL_TEMPLATE,
  STOCK_ALERT_UPPER_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from './templates';

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
}

export async function sendWelcomeEmail({
  email,
  name,
  intro,
}: WelcomeEmailData) {
  const html = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
    '{{intro}}',
    intro
  );

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"MarkGauge" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: 'Welcome to MarkGauge — your monitoring workspace is ready',
    text: 'Thanks for joining MarkGauge',
    html,
  });
}

export async function sendPriceAlertEmail({
  email,
  symbol,
  company,
  alertType,
  alertName,
  currentPrice,
  thresholdPrice,
}: PriceAlertEmailData) {
  const template =
    alertType === 'upper'
      ? STOCK_ALERT_UPPER_EMAIL_TEMPLATE
      : STOCK_ALERT_LOWER_EMAIL_TEMPLATE;

  const html = template
    .replace('{{symbol}}', symbol)
    .replace('{{company}}', company)
    .replace('{{currentPrice}}', currentPrice)
    .replace('{{thresholdPrice}}', thresholdPrice);

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"MarkGauge Alerts" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: `Alert: ${symbol} — ${alertName}`,
    text: `Price alert triggered for ${symbol}`,
    html,
  });
}

export async function sendNewsSummaryEmail({
  email,
  date,
  newsContent,
}: NewsSummaryEmailData) {
  const html = NEWS_SUMMARY_EMAIL_TEMPLATE.replace('{{date}}', date).replace(
    '{{newsContent}}',
    newsContent
  );

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"MarkGauge News" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: `Market brief — ${date}`,
    text: 'Your MarkGauge market brief',
    html,
  });
}
