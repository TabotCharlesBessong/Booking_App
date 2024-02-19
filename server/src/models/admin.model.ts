import mongoose, { Schema } from "mongoose";
import { UserModel, User } from "./user.model";

export interface Admin extends Pick<User, "id" | "email" | "password"> {
  addedMovies: [];
}

const AdminSchema = new Schema<Admin>(
  {
    addedMovies: [{ type: mongoose.Types.ObjectId, ref: "movieShow" }],
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

export const AdminModel = UserModel.discriminator<Admin>("admin", AdminSchema);
