import { RequestHandler } from "express";
import { CreateUser } from "../@types/user";
import users from "../models/users";
import nodemailer from "nodemailer"
import { MAILTRAP_PASS, MAILTRAP_USER } from "../utils/variables";

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
  transport.sendMail({
    to:user.email,
    from:"ebezebeatrice@gmail.com",
    html:"<h1>12345678</h1>"
  })
  res.status(201).json({user})
  user.save()
}