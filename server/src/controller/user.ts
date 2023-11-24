import { RequestHandler } from "express";
import { CreateUser, VerifyEmailRequest } from "../@types/user";
import emailVerificationToken from "../models/emailVerificationToken";
import users from "../models/users";
import { generateToken } from "../utils/helper";
import { sendVerificationMail } from "../utils/mail";

export const create:RequestHandler = async (req:CreateUser,res) => {
  // console.log(users.find)
  const {email,name,password} = req.body
  const user = new users({email,name,password})

  
  // sendVerificationMa 
  const token = generateToken(6)
  sendVerificationMail(token,{name,email,userId:user._id.toString()})
  
  res.status(201).json({user:{id:user._id,name,email}})
  user.save()
}

export const verifyEmail: RequestHandler = async (
  req:VerifyEmailRequest,res
) => {
  const {token,userId} = req.body
  const verificationToken = await emailVerificationToken.findOne({owner:userId})

  if(!verificationToken){
    return res.status(403).json({error:"Invalid token!"})

    const matched = await verificationToken?.compareToken(token)
    if(!matched) return res.status(403).json({error:"Invalid token!"})

    await users.findByIdAndUpdate(userId,{verified:true})

    await emailVerificationToken.findByIdAndDelete(verificationToken?._id)
    res.json({messsage:"Your email is verified"})
  }
}