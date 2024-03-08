import { Router } from "express";
import {
  getAllTickets,
  getBooking,
  newBooking,
} from "../controller/ticket.controller";

const router = Router();

router.post("/", newBooking);
router.get("/", getAllTickets);
router.get("/:id", getBooking);

export default router;
