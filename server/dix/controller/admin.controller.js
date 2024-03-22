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
exports.getAdmin = exports.getAllAdmins = exports.adminLogin = exports.adminRegistration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = require("../constants/http_status");
const admin_model_1 = require("../models/admin.model");
const generateAdminToken_1 = require("../utils/generateAdminToken");
exports.adminRegistration = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield admin_model_1.AdminModel.findOne({ email });
        if (admin) {
            res
                .status(http_status_1.HTTP_BAD_REQUEST)
                .send("Admin with the email address already exist!");
            return;
        }
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const newAdmin = {
            id: "",
            email: email.toLowerCase(),
            password: encryptedPassword,
            addedMovies: [],
        };
        const createdAdmin = yield admin_model_1.AdminModel.create(newAdmin);
        res.send(createdAdmin);
    }
    catch (error) {
        console.log(error);
        res.status(http_status_1.HTTP_SERVER_ERROR).send("Failed to creaet admin");
    }
}));
exports.adminLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const admin = yield admin_model_1.AdminModel.findOne({ email });
    if (admin && (yield bcrypt_1.default.compare(password, admin.password))) {
        res.send((0, generateAdminToken_1.generateAdminTokenResponse)(admin));
    }
    else {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("Wrong email or password");
    }
}));
exports.getAllAdmins = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let admins;
    try {
        admins = yield admin_model_1.AdminModel.find();
        res.send({ admins });
    }
    catch (error) {
        console.log(error);
        res.send("Unexpected error fetching all admins");
    }
}));
exports.getAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let admin;
    try {
        admin = yield admin_model_1.AdminModel.findById(id);
        res.send({ admin });
    }
    catch (error) {
        console.log(error);
        res.send({
            message: "Unexpected error occured fetching a user information",
        });
    }
}));
