import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUserBookings,
  login,
  register,
  seeding,
  updateUser,
} from "./../controller/user.controller";

const router = Router();

router.get("/seed", seeding);
router.post("/register", register);
router.post("/login", login);
router.get("/", getAllUsers); // get all users
router.put("/:id",updateUser); // update user
router.get("/bookings/:id",getUserBookings); // getting user bookings
router.delete("/:id",deleteUser); //deleting a user
router.get("/:id", getUser); // get user by id

export default router;
