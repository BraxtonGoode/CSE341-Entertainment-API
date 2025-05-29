const express = require('express');
const router = express.Router();
const { validateBookRules, validateBook } = require('../validator/valdator.js');

const booksController = require('../controller/booksController.js');
const {isAuthenticated} = require('../middleware/authenticate.js');

// Get all books and a specific book by ID
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);

// POST, PUT, and DELETE requests for books
router.post(
  '/',
  isAuthenticated,
  validateBookRules(),
  validateBook,
  booksController.addBook
);
router.put(
  '/:id',
  isAuthenticated,
  validateBookRules(),
  validateBook,
  booksController.updateBook
);
router.delete('/:id', isAuthenticated, booksController.deleteBook);
module.exports = router;
