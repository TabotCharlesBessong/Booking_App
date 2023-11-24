import { RequestHandler } from "express";
import { CreateUser, VerifyEmailRequest } from "../@types/user";
import emailVerificationToken from "../models/emailVerificationToken";
import users from "../models/users";
import { generateToken } from "../utils/helper";
import { sendForgetPasswordLink, sendVerificationMail } from "../utils/mail";
import {isValidObjectId} from "mongoose"
import passwordResetToken from "../models/passwordResetToken";
import crypto from "crypto"
import { PASSWORD_RESET_LINK } from "../utils/variables";

export const create:RequestHandler = async (req:CreateUser,res) => {
  // console.log(users.find)
  const {email,name,password} = req.body
  const user = new users({email,name,password})

  
  // sendVerificationMa 
  const token = generateToken(6)
  emailVerificationToken.create({
    owner:user._id,
    token
  })
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

export const sendReVerificationToken:RequestHandler = async (req,res) => {
  const {userId} = req.body
  if(!isValidObjectId(userId)){
    return res.status(403).json({error:"Invalid request"})
  }
  const user = await users.findById(userId)
  if(!user) return res.status(403).json({error:"Invalid request!"})

  await emailVerificationToken.findOneAndDelete({
    owner:userId
  })

  const token = generateToken(6)

  await emailVerificationToken.create({
    owner:userId,
    token
  })

  sendVerificationMail(token,{
    name:user?.name,
    email:user?.email,
    userId:user?._id.toString()
  })

  res.json({message:"Please check your mail"})
}

export const generateForgetPasswordLink:RequestHandler = async (req,res) => {
  const {email} = req.body

  const user = await users.findOne({email})
  if(!user) return res.status(404).json({error:"Account not found!"})

  await passwordResetToken.findOneAndDelete({
    owner:user._id
  })

  const token = crypto.randomBytes(36).toString("hex")

  await passwordResetToken.create({
    owner:user._id,
    token
  })

  const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`

  sendForgetPasswordLink({email:user.email,link:resetLink})
  res.json({message:"Check your registered mail"})
}