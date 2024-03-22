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
exports.getMovieById = exports.getAllMovies = exports.addMovie = void 0;
const admin_model_1 = require("./../models/admin.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = require("../constants/http_status");
const movieShows_model_1 = require("../models/movieShows.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.addMovie = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const extractedToken = req.headers.authorization;
    console.log(extractedToken);
    if (!extractedToken || (extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.trim()) === "") {
        res.status(http_status_1.HTTP_NOT_FOUND).json({ message: "Token Not Found" });
        return;
    }
    let adminId;
    jsonwebtoken_1.default.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            res.status(http_status_1.HTTP_BAD_REQUEST).json({ message: `${err.message}` });
        }
        else {
            adminId = decrypted.id;
            return;
        }
    });
    const { title, description, language, showDate, startTime, location, programType, } = req.body;
    const existingMovie = yield movieShows_model_1.MovieShowModel.findOne({ title });
    if (existingMovie) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("A movie with that title already exist!");
        return;
    }
    if (programType !== "movie" && programType !== "show") {
        res
            .status(http_status_1.HTTP_BAD_REQUEST)
            .send("Invalid program type\nMust be either 'movie' or 'show'");
        return;
    }
    if (!title &&
        title.trim() === "" &&
        !description &&
        description.trim() === "" &&
        !language &&
        language.trim() === "" &&
        !showDate &&
        !startTime &&
        !location &&
        location.trim() === "") {
        res.status(http_status_1.HTTP_UNPROCESSABLE).json({ message: "Invalid Inputs" });
        return;
    }
    let movie;
    const session = yield mongoose_1.default.startSession();
    try {
        movie = new movieShows_model_1.MovieShowModel({
            title,
            description,
            language,
            showDate,
            startTime,
            location,
            programType,
            bookings: [],
            admin: adminId,
        });
        const adminUser = yield admin_model_1.AdminModel.findById(adminId);
        session.startTransaction();
        yield movie.save({ session });
        adminUser === null || adminUser === void 0 ? void 0 : adminUser.addedMovies.push(movie);
        yield (adminUser === null || adminUser === void 0 ? void 0 : adminUser.save({ session }));
        yield session.commitTransaction();
        res.send({ movie });
    }
    catch (error) {
        console.log(error);
        res.status(http_status_1.HTTP_SERVER_ERROR).json({ message: "Request failed" });
    }
}));
exports.getAllMovies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let movies;
    try {
        movies = yield movieShows_model_1.MovieShowModel.find();
        res.status(200).json({ movies });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Request failed" });
    }
}));
exports.getMovieById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let movie;
    try {
        movie = yield movieShows_model_1.MovieShowModel.findById(id);
        res.status(200).json({ movie });
    }
    catch (error) {
        console.log(error);
    }
    if (!movie)
        res.status(404).json({ message: "Movie does not exist" });
}));
