const express = require('express');
const router = express.Router();
const {
  validateMovieRules,
  validateMovie,
} = require('../validator/valdator.js');
const moviesController = require('../controller/moviesController.js');

// Get all movies and a specific movie by ID
router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);

// POST, PUT, and DELETE requests for movies
router.post('/', validateMovieRules(), validateMovie, moviesController.addMovie);
router.put('/:id', validateMovieRules(), validateMovie, moviesController.updateMovie);
router.delete('/:id', validateMovieRules(), validateMovie, moviesController.deleteMovie);

module.exports = router;