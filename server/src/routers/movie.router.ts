import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "./../controller/movie.controller";
import { Router } from "express"

const router = Router()

router.post("/",addMovie) // add a new movie
router.get("/",getAllMovies) // get all movies
router.get("/:id",getMovieById) // get a movie

export default router