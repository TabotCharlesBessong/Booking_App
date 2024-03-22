"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = exports.TicketSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TicketSchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    seatNumber: { type: Number, required: true },
    movie: { type: mongoose_1.Schema.Types.ObjectId, ref: "movieShow", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user" }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.TicketModel = (0, mongoose_1.model)("ticket", exports.TicketSchema);
