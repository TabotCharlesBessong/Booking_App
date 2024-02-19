import { Router } from "express";

const router = Router()

router.post('/signup') // admin signup
router.post('/login') // admin login
router.get('/') // fetch all admins
router.get('/:id') // get all admins by id

export default router