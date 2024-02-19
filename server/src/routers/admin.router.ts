import { Router } from "express";
import { adminLogin, adminRegistration } from "./../controller/admin.controller";

const router = Router()

router.post('/register',adminRegistration) // admin signup
router.post('/login',adminLogin) // admin login
router.get('/') // fetch all admins
router.get('/:id') // get all admins by id

export default router