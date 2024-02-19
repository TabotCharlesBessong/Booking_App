import bcrypt from 'bcrypt';
import asyncHandler from "express-async-handler";
import {
  HTTP_BAD_REQUEST,
  HTTP_UNPROCESSABLE,
} from "src/constants/http_status";
import { Admin, AdminModel } from "src/models/admin.model";

export const adminRegistration = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    res.status(HTTP_UNPROCESSABLE).json({ message: "Invalid inputs" });
  }
  let existingAdmin: any;
  try {
    existingAdmin = await AdminModel.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingAdmin) {
    res.status(HTTP_BAD_REQUEST).json({ message: "Admin already exist" });
  }

  let admin:Admin
  const hashedPassword = bcrypt.hash(password,10)
  try {
    admin = AdminModel.create({email,password:hashedPassword,id:Object,addedMovies:[]})
  } catch (error) {
    console.log(error)
  }
});
