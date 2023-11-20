import { Router } from "express";
import User from "../models/users";
import { CreateUser } from "../@types/user";
import { validate } from "../middleware/validator";
import { CreateUserSchema } from "../utils/validationSchema";
import { create } from "./../controller/user";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);

export default router;
