import { Schema } from "mongoose";
import { UserModel, User } from "./user.model";

export interface Admin extends Pick<User, "id" | "email" | "name"> {
  
}

const AdminSchema = new Schema<Admin>(
  {
    
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
