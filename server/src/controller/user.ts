import { RequestHandler } from "express";
import { CreateUser } from "../@types/user";
import users from "../models/users";

export const create:RequestHandler = async (req:CreateUser,res) => {
  const {email,name,password} = req.body
  const user = new users({email,name,password})
  user.save()
  res.json({user})
}