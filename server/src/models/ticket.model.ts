import { Schema, model } from "mongoose";

export interface Ticket {
  ticketNumber: number;
  price: number;
  seatNumber: number;
}

export const TicketSchema = new Schema<Ticket>(
  {
    ticketNumber: { type: Number, required: true },
    price: { type: Number, required: true },
    seatNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const TicketModel = model<Ticket>("ticket", TicketSchema);
