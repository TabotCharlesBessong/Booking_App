import { Router } from "express";
import {
  deleteTicket,
  getAllTickets,
  getBooking,
  newBooking,
} from "../controller/ticket.controller";

const router = Router();

router.post("/", newBooking);
router.get("/", getAllTickets);
router.get("/:id", getBooking);
router.delete("/:id",deleteTicket)

export default router;
