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
exports.getUserBookings = exports.deleteUser = exports.getUser = exports.getAllUsers = exports.login = exports.updateUser = exports.register = exports.seeding = void 0;
const http_status_1 = require("./../constants/http_status");
const data_1 = require("./../data");
const user_model_1 = require("./../models/user.model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateUserToken_1 = require("../utils/generateUserToken");
const ticket_model_1 = require("./../models/ticket.model");
exports.seeding = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCount = yield user_model_1.UserModel.countDocuments();
    if (usersCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    yield user_model_1.UserModel.create(data_1.sample_users);
    res.send("Seed Is Done");
}));
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address } = req.body;
    const user = yield user_model_1.UserModel.findOne({ email });
    if (user) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("A user with this email already exist!");
        return;
    }
    const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = {
        id: "",
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        bookings: [],
    };
    const dbUser = yield user_model_1.UserModel.create(newUser);
    res.send((0, generateUserToken_1.generateTokenResponse)(dbUser));
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address } = req.body;
    const id = req.params.id;
    try {
        const user = yield user_model_1.UserModel.findById(id);
        if (!user) {
            res.status(http_status_1.HTTP_NOT_FOUND).send("User not found");
            return;
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;
        if (password) {
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            user.password = encryptedPassword;
        }
        const updatedUser = yield user.save();
        res.send((0, generateUserToken_1.generateTokenResponse)(updatedUser));
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.HTTP_SERVER_ERROR).send("Something went wrong");
    }
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.UserModel.findOne({ email });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        res.send((0, generateUserToken_1.generateTokenResponse)(user));
    }
    else {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("Wrong username or password");
    }
}));
exports.getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield user_model_1.UserModel.find();
        res.send({ users });
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Unexpected error occured fetching users" });
    }
}));
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let user;
    try {
        user = yield user_model_1.UserModel.findById(id);
        res.send({ user });
    }
    catch (error) {
        console.log(error);
        res.send({
            message: "Unexpected error occured fetching a user information",
        });
    }
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let user;
    try {
        user = yield user_model_1.UserModel.findByIdAndDelete(id);
        res.send({ message: "User deleted successfully" });
    }
    catch (error) {
        res.send({ message: "Error deleting user" });
    }
}));
exports.getUserBookings = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let bookings;
    try {
        bookings = yield ticket_model_1.TicketModel.find({ user: id })
            .populate("movieShow")
            .populate("user");
        res.send({ bookings });
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Unable to fetch user bookings" });
    }
}));
