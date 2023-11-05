import { Router } from "express";
import User from '../models/users'

const router = Router()

router.post('/create',(req,res) => {
  const {email,name,password} = req.body
  const user = new User({email,name,password})
  user.save()
  res.json({user})
})

export default router