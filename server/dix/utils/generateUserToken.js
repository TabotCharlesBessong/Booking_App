"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET;
const generateTokenResponse = (user) => {
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, SECRET, {
        expiresIn: "30d",
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        bookings: user.bookings,
        token: token,
    };
};
exports.generateTokenResponse = generateTokenResponse;
