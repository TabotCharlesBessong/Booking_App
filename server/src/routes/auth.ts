import { Router } from "express";
import User from '../models/users'
import { CreateUser } from "../@types/user";
import { validate } from "../middleware/validator";
import { CreateUserSchema } from "../utils/validationSchema";

const router = Router()

router.post('/create',validate(CreateUserSchema),async(req:CreateUser,res) => {
  const {email,name,password} = req.body
  const user = new User({email,name,password})
  user.save()
  res.json({user})
})

export default router