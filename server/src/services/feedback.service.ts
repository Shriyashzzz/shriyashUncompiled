import config from "../config/config.js";
import { transporter } from "../config/smtp.config.js";

export interface FeedbackPayload {
  name?: string;
  email?: string;
  message: string;
  source: string;
}

// Sends reader feedback to my own inbox. Reply-To is set to the reader's
// email (when they gave one) so hitting "Reply" answers them directly.
// Plain text only: the message is user input, so it never gets rendered as HTML.
export async function sendFeedback({
  name,
  email,
  message,
  source,
}: FeedbackPayload) {
  const sender = name || "Anonymous reader";
  const info = await transporter.sendMail({
    from: `"Blog Feedback" <${config.FROM_EMAIL}>`,
    to: config.FEEDBACK_TO_EMAIL,
    ...(email ? { replyTo: email } : {}),
    subject: `[Feedback · ${source}] from ${sender}`,
    text: [
      `From: ${sender}${email ? ` <${email}>` : " (no email given)"}`,
      `Source: ${source}`,
      "",
      message,
    ].join("\n"),
  });

  if (info.rejected.length > 0) {
    throw new Error("Feedback email was rejected by the SMTP server");
  }
}
