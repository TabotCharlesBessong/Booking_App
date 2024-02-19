import { HTTP_BAD_REQUEST } from "./../constants/http_status";
import { sample_users } from "./../data";
import { User, UserModel } from "./../models/user.model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt"
import { generateTokenResponse } from "./../utils/generateToken";

export const seeding = asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await UserModel.create(sample_users);
  res.send("Seed Is Done");
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send("A user with this email already exist!");
    return;
  }
  const encryptedPassword = await bcrypt.hash(password,10)

  const newUser:User = {
    id:'',
    name,
    email:email.toLowerCase(),
    password:encryptedPassword,
    address,
    bookings:[]
  }

  const dbUser = await UserModel.create(newUser)
  res.send(generateTokenResponse(dbUser))
});

export const login = asyncHandler(async(req,res) => {
  const {email,password} = req.body
  const user = await UserModel.findOne({email})

  if(user && (await bcrypt.compare(password,user.password))){
    res.send(generateTokenResponse(user))
  }else{
    res.status(HTTP_BAD_REQUEST).send("Wrong username or password")
  }
})
