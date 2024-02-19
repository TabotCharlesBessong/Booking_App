import { Router } from "express";
import {
  adminLogin,
  adminRegistration,
  getAdmin,
  getAllAdmins,
} from "./../controller/admin.controller";

const router = Router();

router.post("/register", adminRegistration); // admin signup
router.post("/login", adminLogin); // admin login
router.get("/", getAllAdmins); // fetch all admins
router.get("/:id",getAdmin); // get all admins by id

export default router;
