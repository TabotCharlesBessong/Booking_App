import bcrypt from 'bcrypt';
import asyncHandler from "express-async-handler";
import {
  HTTP_BAD_REQUEST,
  HTTP_SERVER_ERROR,
  HTTP_UNPROCESSABLE,
} from "../constants/http_status";
import { Admin, AdminModel } from "../models/admin.model";

export const adminRegistration = asyncHandler(async (req, res) => {
  try {
    const {email,password} = req.body
    const admin = await AdminModel.findOne({email})
    if(admin){
      res.status(HTTP_BAD_REQUEST).send("Admin with the email address already exist!")
      return
    }
    const encryptedPassword = await bcrypt.hash(password,10)
    const newAdmin:Admin = {
      id:"",
      email:email.toLowerCase(),
      password:encryptedPassword,
      addedMovies:[]
    }
    const createdAdmin = await AdminModel.create(newAdmin)
    res.send(createdAdmin)
    
  } catch (error) {
    console.log(error)
    res.status(HTTP_SERVER_ERROR).send("Failed to creaet admin")
  }
});
