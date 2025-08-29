// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail"
import { env } from "process"
const API_KEY = env.SENDGRID_API_KEY as string
sgMail.setApiKey(API_KEY)

export default sgMail
