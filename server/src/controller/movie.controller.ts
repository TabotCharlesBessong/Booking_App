import { Admin, AdminModel } from './../models/admin.model';
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
  HTTP_UNPROCESSABLE,
} from "../constants/http_status";
import { MovieShow, MovieShowModel } from "../models/movieShows.model";
import mongoose from "mongoose";

export const addMovie = asyncHandler(async (req, res) => {
  const extractedToken:string = req.headers.authorization?.split(" ")[1] as any;
  if (!extractedToken || extractedToken?.trim() === "") {
    res.status(HTTP_NOT_FOUND).json({ message: "Token Not Found" });
    return
  }
  let adminId: any;

  // verifying token
  jwt.verify(
    extractedToken,
    process.env.JWT_SECRET as string,
    (err: any, decrypted: any) => {
      if (err) {
        res.status(HTTP_BAD_REQUEST).json({ message: `${err.message}` });
      } else {
        adminId = decrypted.id;
        return;
      }
    }
  );
  const {
    title,
    description,
    language,
    showDate,
    startTime,
    location,
    programType,
  } = req.body;
  if (programType !== "movie" && programType !== "show") {
    res
      .status(HTTP_BAD_REQUEST)
      .send("Invalid program type\nMust be either 'movie' or 'show'");
      return
  }

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !language &&
    language.trim() === "" &&
    !showDate &&
    !startTime &&
    !location &&
    location.trim() === ""
  ) {
    res.status(HTTP_UNPROCESSABLE).json({ message: "Invalid Inputs" });
    return
  }

  let movie:any

  try {
    movie = new MovieShowModel({
      id: "",
      title,
      description,
      language,
      showDate: new Date(`${showDate}`),
      startTime,
      location,
      programType,
      bookings: [],
      admin: adminId,
    });
    const session = await mongoose.startSession()
    const adminUser:any | null = await AdminModel.findById(adminId)
    session.startTransaction()
    await movie.save({session})
    adminUser?.addedMovies.push(movie)
    await adminUser?.save({session})
    res.send({movie})
  } catch (error) {
    console.log(error)
    res.status(HTTP_SERVER_ERROR).json({message:"Request failed"})
  }

  // const newMovieOrShow: MovieShow = {
  //   id: "",
  //   title,
  //   description,
  //   language,
  //   showDate,
  //   startTime,
  //   location,
  //   programType,
  //   bookings: [],
  //   admin: adminId,
  // };

  // const session = await mongoose.startSession()
  // const adminUser = await AdminModel.findById(adminId)
  // session.startTransaction()
  // await newMovieOrShow
});
