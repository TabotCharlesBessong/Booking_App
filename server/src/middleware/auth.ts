import { RequestHandler } from "express";
import passwordResetToken from "../models/passwordResetToken";

export const isValidPasswordResetToken: RequestHandler = async (
  req,
  res,
  next
) => {
  const { token, userId } = req.body;

  const resetToken = await passwordResetToken.findOne({ owner: userId });
  if (!resetToken)
    res.status(403).json({ error: "Unauthorised access, invalid token!" });

  next();
};
