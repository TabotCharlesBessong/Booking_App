"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.getAllTickets = exports.getBooking = exports.newBooking = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
const movieShows_model_1 = require("../models/movieShows.model");
const ticket_model_1 = require("../models/ticket.model");
const user_model_1 = require("../models/user.model");
const http_status_1 = require("../constants/http_status");
exports.newBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, movie, seatNumber, user } = req.body;
    let existingMovieShow;
    let existingUser;
    existingMovieShow = yield movieShows_model_1.MovieShowModel.findById(movie);
    existingUser = yield user_model_1.UserModel.findById(user);
    try {
        if (!existingMovieShow)
            res.status(404).json({ message: "Movie not found" });
        if (!existingUser)
            res.status(http_status_1.HTTP_NOT_FOUND).json({ message: "User not found" });
    }
    catch (error) {
        console.log(error);
    }
    let ticket;
    try {
        ticket = new ticket_model_1.TicketModel({
            movie,
            price,
            seatNumber,
            user,
        });
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        existingUser === null || existingUser === void 0 ? void 0 : existingUser.bookings.push(ticket);
        existingMovieShow === null || existingMovieShow === void 0 ? void 0 : existingMovieShow.bookings.push(ticket);
        yield ticket.save({ session });
        session.commitTransaction();
        res.status(201).json({ ticket });
    }
    catch (error) {
        console.log(error);
        res
            .status(http_status_1.HTTP_SERVER_ERROR)
            .json({ message: "Unable to book a movie or a show" });
    }
}));
exports.getBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let ticket;
    try {
        ticket = yield ticket_model_1.TicketModel.findById(id);
        res.status(200).json({ ticket });
    }
    catch (error) {
        res.status(http_status_1.HTTP_SERVER_ERROR).json({ message: "Unexpected Error" });
    }
}));
exports.getAllTickets = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tickets;
    try {
        tickets = yield ticket_model_1.TicketModel.find();
        res.status(200).json({ tickets });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Request failed" });
    }
}));
exports.deleteTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let ticket;
    try {
        ticket = yield ticket_model_1.TicketModel.findByIdAndDelete(id).populate("user movie");
        console.log(ticket);
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        yield ticket.user.bookings.pull(ticket);
        yield ticket.movie.bookings.pull(ticket);
        yield ticket.movie.save({ session });
        yield ticket.user.save({ session });
        res.status(200).json({ message: "Deleted Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(http_status_1.HTTP_SERVER_ERROR).json({ message: "Unable to delete error" });
    }
}));
