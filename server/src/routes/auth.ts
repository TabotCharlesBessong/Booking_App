import { Router } from "express";
import { validate } from "../middleware/validator";
import { CreateUserSchema, TokenAndIDValidation, updatePasswordSchema } from "../utils/validationSchema";
import { create, generateForgetPasswordLink, grantValid, sendReVerificationToken, updatePassword, verifyEmail } from "./../controller/user";
import { isValidPasswordResetToken } from "../middleware/auth";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email",verifyEmail)
router.post("/re-verify-email",validate(TokenAndIDValidation),sendReVerificationToken)
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPasswordResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(updatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);

export default router;
