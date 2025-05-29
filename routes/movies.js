const express = require('express');
const router = express.Router();
const {
  validateMovieRules,
  validateMovie,
} = require('../validator/valdator.js');
const moviesController = require('../controller/moviesController.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// Get all movies and a specific movie by ID
router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);

// POST, PUT, and DELETE requests for movies
router.post(
  '/',
  isAuthenticated,
  validateMovieRules(),
  validateMovie,
  moviesController.addMovie
);
router.put(
  '/:id',
  isAuthenticated,
  validateMovieRules(),
  validateMovie,
  moviesController.updateMovie
);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;
