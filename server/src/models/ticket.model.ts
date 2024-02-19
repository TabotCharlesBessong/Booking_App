import { Schema, Types, model } from "mongoose";

export interface Ticket {
  price: number;
  seatNumber: number;
  movie:Types.ObjectId
  user:Types.ObjectId
}

export const TicketSchema = new Schema<Ticket>(
  {
    price: { type: Number, required: true },
    seatNumber: { type: Number, required: true },
    movie:{type:"ObjectId",ref:"movieShow",required:true},
    user:{type:"ObjectId",required:true,ref:"user"}
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
