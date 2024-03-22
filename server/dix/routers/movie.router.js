"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movie_controller_1 = require("./../controller/movie.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", movie_controller_1.addMovie);
router.get("/", movie_controller_1.getAllMovies);
router.get("/:id", movie_controller_1.getMovieById);
exports.default = router;
