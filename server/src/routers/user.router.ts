import { Router } from "express";
import { register, seeding } from './../controller/user.controller';

const router = Router()

router.get("/seed",seeding)
router.post("/register",register)

export default router