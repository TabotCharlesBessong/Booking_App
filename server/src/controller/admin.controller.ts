import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import {
  HTTP_BAD_REQUEST,
  HTTP_SERVER_ERROR,
  HTTP_UNPROCESSABLE,
} from "../constants/http_status";
import { Admin, AdminModel } from "../models/admin.model";
import { generateAdminTokenResponse } from "../utils/generateAdminToken";

export const adminRegistration = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Admin with the email address already exist!");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newAdmin: Admin = {
      id: "",
      email: email.toLowerCase(),
      password: encryptedPassword,
      addedMovies: [],
    };
    const createdAdmin = await AdminModel.create(newAdmin);
    res.send(createdAdmin);
  } catch (error) {
    console.log(error);
    res.status(HTTP_SERVER_ERROR).send("Failed to creaet admin");
  }
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.send(generateAdminTokenResponse(admin));
  } else {
    res.status(HTTP_BAD_REQUEST).send("Wrong email or password");
  }
});

export const getAllAdmins = asyncHandler(async(req,res) => {
  let admins: Admin[]
  try {
    admins = await AdminModel.find()
    res.send({admins})
  } catch (error) {
    console.log(error)
    res.send("Unexpected error fetching all admins")
  }
})

export const getAdmin = asyncHandler(async(req,res) => {
  const id = req.params.id as string
  let admin:Admin | null
  try {
    admin = await AdminModel.findById(id)
    res.send({admin})
  } catch (error) {
    console.log(error);
    res.send({
      message: "Unexpected error occured fetching a user information",
    });
  }
})