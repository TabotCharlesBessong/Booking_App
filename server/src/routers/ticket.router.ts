import { Router } from "express";
import { newBooking } from "../controller/ticket.controller";

const router = Router()

router.post("/",newBooking)

export default router