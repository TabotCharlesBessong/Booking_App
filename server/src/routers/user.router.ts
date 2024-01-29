import { sample_users } from './../data';
import { Router } from "express";
// import expressAsyncHandler from "express-async-handler";
import asyncHandler from "express-async-handler"
import { UserModel } from "../models/user.model";

const router = Router()

router.get("/seed",asyncHandler(async(req,res) => {
  const usersCount = await UserModel.countDocuments()
  if(usersCount > 0){
    res.send("Seed is already done!")
    return
  }

  await UserModel.create(sample_users)
  res.send("Seed Is Done")
}))

export default router