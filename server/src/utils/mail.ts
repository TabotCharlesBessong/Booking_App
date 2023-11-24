import nodemailer from "nodemailer"
import path from "path"
import { generateTemplate } from "../mail/template"
import emailVerificationToken from "../models/emailVerificationToken"
import { MAILTRAP_PASS, MAILTRAP_USER, VERIFICATION_MAIL } from "./variables"

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io",
    port:2525,
    auth:{
      user:MAILTRAP_USER,
      pass:MAILTRAP_PASS
    }
  })
  return transport
}

interface Profile {
  name:string
  email:string
  userId:string
}

export const sendVerificationMail = async(token:string,profile:Profile) => {
  const transport = generateMailTransporter()

  const {name,email,userId} = profile

  const welcomeMessage = `Hi ${name}, welcome to Movie Booking Ap! There are so much thing that we do for verified users. Use the given OTP to verify your email.`;

  transport.sendMail({
    to:email,
    from:VERIFICATION_MAIL,
    subject:"Welcome Message",
    html:generateTemplate({
      title:"Welcome to Booking App",
      message:welcomeMessage,
      logo:"cid:logo",
      banner:"cid:welcome",
      link:"#",
      btnTitle:token,
    }),
    attachments:[
      {
        filename:"logo.png",
        path:path.join(__dirname,"../mail/welcome.png"),
        cid:"welcome"
      }
    ]
  })
}