import nodemailer from "nodemailer"

const USER = process.env.MAILTRAP_USER as string
const PASS = process.env.MAILTRAP_PASS as string

export const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io",
    port:2525,
    auth:{
      user:USER,
      pass:PASS
    }
  })

  return transport
}