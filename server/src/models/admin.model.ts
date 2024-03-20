import mongoose, { Schema, Types, model } from "mongoose";
import { User } from "./user.model";

export interface Admin {
  id: string;
  email: string;
  password: string;
  addedMovies: Types.ObjectId[];
}

const AdminSchema = new Schema<Admin>(
  {
    addedMovies: [{ type: mongoose.Types.ObjectId, ref: "movieShow" }],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

export const AdminModel = model<Admin>("admin", AdminSchema);
