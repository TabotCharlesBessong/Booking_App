"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminTokenResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET;
const generateAdminTokenResponse = (admin) => {
    const token = jsonwebtoken_1.default.sign({
        id: admin.id,
        email: admin.email,
    }, SECRET, {
        expiresIn: "30d",
    });
    return {
        id: admin.id,
        email: admin.email,
        token: token,
        addedMovies: admin.addedMovies
    };
};
exports.generateAdminTokenResponse = generateAdminTokenResponse;
