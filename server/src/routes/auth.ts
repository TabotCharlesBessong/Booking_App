import { Router } from "express";
import User from "../models/users";
import { CreateUser } from "../@types/user";
import { validate } from "../middleware/validator";
import { CreateUserSchema, EmailValidationSchema } from "../utils/validationSchema";
import { create, sendReVerificationToken, verifyEmail } from "./../controller/user";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email",verifyEmail)
router.post("/re-verify-email",validate(EmailValidationSchema),sendReVerificationToken)

export default router;
