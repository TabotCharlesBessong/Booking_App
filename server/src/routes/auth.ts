import { Router } from "express";
import { validate } from "../middleware/validator";
import { CreateUserSchema, TokenAndIDValidation } from "../utils/validationSchema";
import { create, sendReVerificationToken, verifyEmail } from "./../controller/user";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email",verifyEmail)
router.post("/re-verify-email",validate(TokenAndIDValidation),sendReVerificationToken)

export default router;
