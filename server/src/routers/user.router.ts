import { Router } from "express";
import { login, register, seeding } from './../controller/user.controller';

const router = Router()

router.get("/seed",seeding)
router.post("/register",register)
router.post("/login",login)

export default router