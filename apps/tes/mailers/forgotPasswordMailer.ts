/* eslint-disable no-console */
import mailer from "integrations/mailer_integration"

type ResetPasswordMailer = {
  to: string
  token: string
  city: string
}

export function forgotPasswordMailer({ to, token, city }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/analyzer/${city}/reset-password?token=${token}`
  const msg = {
    from: "cdawson@americanforests.org", // This needs to be the same as the sendgrid verified sender
    to,
    subject: "Tree Equity Score password reset",
    html: `
      <h1 style="width: 300px;font-family: sans-serif;display: block;margin: 30px auto;text-align:center;">
      Password Reset
      </h1>
      <p style="font-family: sans-serif;margin: 30px auto;max-width: 380px;text-align: center;">
      If you have lost your password or forgot it, use the link below to reset it.
      </p>
      <a href="${resetUrl}" style="margin: 0 auto;text-decoration: none;width: 200px;display: block;font-family: sans-serif;background-color: #6cc296; padding: 20px; border-radius: 3px; color: white; margin: 0 auto;">
        Reset Your Password
      </a>
      <p style="font-family: sans-serif;margin: 30px auto; max-width: 380px;text-align: center;">
      If you didn't request a password reset, ignore this email and your password will not be changed.
      </p>
      <p style="color: gray;font-family: sans-serif;margin: 30px auto;max-width: 280px;text-align:center;">
      The Tree Equity Score Team
      </p>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        await mailer
          .send(msg)
          .then((success) => {
            console.log("Email sent", success)
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        // Dynamically load preview-email
        // This would avoid the server trying and failing :(
        // to import a dev dependency on production environment
        const previewEmail = (await import("preview-email")).default
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
