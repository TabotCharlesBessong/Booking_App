"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieShowModel = exports.MovieShowSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.MovieShowSchema = new mongoose_1.Schema({
    language: { type: String },
    showDate: { type: Date, required: false, default: Date.now },
    startTime: {
        type: Date,
        required: false,
        default: () => new Date().setMinutes(0, 0, 0),
    },
    location: { type: String, required: true },
    programType: { type: String, enum: ["movie", "show"], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    bookings: [{ type: mongoose_1.default.Types.ObjectId, ref: "ticket" }],
    admin: { type: mongoose_1.Schema.Types.ObjectId, ref: "admin", required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.MovieShowModel = (0, mongoose_1.model)("movieShow", exports.MovieShowSchema);
