import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model";

dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

export const generateAdminTokenResponse = (admin: Admin) => {
  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      // isAdmin: admin.isAdmin,
    },
    SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: admin.id,
    email: admin.email,
    token: token,
    addedMovies:admin.addedMovies
  };
};
