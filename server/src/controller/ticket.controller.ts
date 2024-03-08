import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { MovieShowModel } from "../models/movieShows.model";
import { TicketModel } from "../models/ticket.model";
import { User, UserModel } from "../models/user.model";
import { HTTP_NOT_FOUND, HTTP_SERVER_ERROR } from "../constants/http_status";

export const newBooking = asyncHandler(async (req, res) => {
  const { price, movie, seatNumber, user } = req.body;
  let existingMovieShow: any;
  let existingUser: User | null;
  existingMovieShow = await MovieShowModel.findById(movie);
  existingUser = await UserModel.findById(user);
  try {
    if (!existingMovieShow)
      res.status(404).json({ message: "Movie not found" });
    if (!existingUser)
      res.status(HTTP_NOT_FOUND).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
  }

  let ticket: any;
  try {
    ticket = new TicketModel({
      movie,
      price,
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser?.bookings.push(ticket);
    existingMovieShow?.bookings.push(ticket);
    await ticket.save({ session });
    session.commitTransaction();
    res.status(201).json({ticket})
  } catch (error) {
    console.log(error);
    res
      .status(HTTP_SERVER_ERROR)
      .json({ message: "Unable to book a movie or a show" });
  }
});
