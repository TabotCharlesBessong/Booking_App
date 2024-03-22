"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./../controller/admin.controller");
const router = (0, express_1.Router)();
router.post("/register", admin_controller_1.adminRegistration);
router.post("/login", admin_controller_1.adminLogin);
router.get("/", admin_controller_1.getAllAdmins);
router.get("/:id", admin_controller_1.getAdmin);
exports.default = router;
