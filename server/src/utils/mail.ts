import nodemailer from "nodemailer"
import path from "path"
import { generateTemplate } from "../mail/template"
import emailVerificationToken from "../models/emailVerificationToken"
import { MAILTRAP_PASS, MAILTRAP_USER, SIGN_IN_URL, VERIFICATION_EMAIL, VERIFICATION_MAIL } from "./variables"

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

interface Options {
  email:string
  link:string
}

export const sendForgetPasswordLink = async (options:Options) => {
  const transport = generateMailTransporter()

  const {email,link} = options
  const message =
    "We just received a request that you forgot your password. No problem you can use the link below and create brand new password.";

  transport.sendMail({
    to: email,
    from: VERIFICATION_MAIL,
    subject: "Reset Password Link",
    html: generateTemplate({
      title: "Forget Password",
      message,
      logo: "cid:logo",
      banner: "cid:forget_password",
      link,
      btnTitle: "Reset Password",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../mail/forget_password.png"),
        cid: "forget_password",
      },
    ],
  });
}

export const sendPasswordResetSuccessEmail = async (name:string,email:string) => {
  const transport = generateMailTransporter()
  const message = `Dear ${name} we just updated your new password. You can now sign in with your new password.`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Password Reset Successfully",
    html: generateTemplate({
      title: "Password Reset Successfully",
      message,
      logo: "cid:logo",
      banner: "cid:forget_password",
      link: SIGN_IN_URL,
      btnTitle: "Log in",
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "forget_password.png",
        path: path.join(__dirname, "../mail/forget_password.png"),
        cid: "forget_password",
      },
    ],
  });
}