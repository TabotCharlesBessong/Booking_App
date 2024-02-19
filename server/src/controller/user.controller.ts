import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
} from "./../constants/http_status";
import { sample_users } from "./../data";
import { User, UserModel } from "./../models/user.model";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateTokenResponse } from "../utils/generateUserToken";
import { TicketModel } from "./../models/ticket.model";

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
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    bookings: [],
  };

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const id = req.params.id as string;

  try {
    // Find the user by userId
    const user = await UserModel.findById(id);

    if (!user) {
      res.status(HTTP_NOT_FOUND).send("User not found");
      return;
    }

    // Update the user's information
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;

    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.send(generateTokenResponse(updatedUser));
  } catch (error) {
    console.error(error);
    res.status(HTTP_SERVER_ERROR).send("Something went wrong");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send("Wrong username or password");
  }
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  let users: User[];
  try {
    users = await UserModel.find();
    // console.log(users)
    res.send({ users });
  } catch (error) {
    console.log(error);
    res.send({ message: "Unexpected error occured fetching users" });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  let user: User | null;
  try {
    user = await UserModel.findById(id);
    res.send({ user });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Unexpected error occured fetching a user information",
    });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  let user: User | null;
  try {
    user = await UserModel.findByIdAndDelete(id);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.send({ message: "Error deleting user" });
  }
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const id = req.params.id as string;
  let bookings: any;
  try {
    bookings = await TicketModel.find({ user: id })
      .populate("movieShow")
      .populate("user");
    res.send({ bookings });
  } catch (error) {
    console.log(error);
    res.send({ message: "Unable to fetch user bookings" });
  }
});
