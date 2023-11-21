import { RequestHandler } from "express";
import { CreateUser } from "../@types/user";
import users from "../models/users";
import nodemailer from "nodemailer"
import { MAILTRAP_PASS, MAILTRAP_USER } from "../utils/variables";
import EmailToken from "../models/token"
import { generateToken } from "../utils/helper";

export const create:RequestHandler = async (req:CreateUser,res) => {
  // console.log(users.find)
  const {email,name,password} = req.body
  const user = new users({email,name,password})

  const transport = nodemailer.createTransport({
    host:'sandbox.smtp.mailtrap.io',
    port:2525,
    auth:{
      user:MAILTRAP_USER,
      pass:MAILTRAP_PASS,
    }
  })
  const token = generateToken(6)
  await EmailToken.create({
    owner:user._id,
    token
  })
  transport.sendMail({
    to: user.email,
    from: "auth@gmail.com",
    html: `<h1>Your verification token is ${token}</h1>`,
  });
  res.status(201).json({user})
  user.save()
}