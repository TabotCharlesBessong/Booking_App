import { addMovie } from './../controller/movie.controller';
import { Router } from "express"

const router = Router()

router.post("/",addMovie) // add a new movie
router.get("/") // get all movies
router.get("/:id") // get a movie

export default router