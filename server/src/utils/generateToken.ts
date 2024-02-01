import jwt from "jsonwebtoken";
import { User } from "./../models/user.model";
import dotenv from "dotenv"

dotenv.config()

const SECRET = process.env.JWT_SECRET as string;

export const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id:user.id,
    email:user.email,
    name:user.name,
    address:user.address,
    isAdmin:user.isAdmin,
    token:token
  }
};
