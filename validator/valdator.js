const { body, validationResult } = require('express-validator');

// Validation rules for book properties
const validateBookRules = () => {
  return [
    body('Title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters long'),

    body('Author')
      .notEmpty()
      .withMessage('Author is required')
      .isLength({ min: 3 })
      .withMessage('Author must be at least 3 characters long'),

    body('PublishedYear')
      .notEmpty()
      .withMessage('Published Year is required')
      .isInt({ min: 1000, max: 9999 })
      .withMessage('Published Year must be a 4-digit number'),

    body('Genre')
      .notEmpty()
      .withMessage('Genre is required')
      .isLength({ min: 3 })
      .withMessage('Genre must be at least 3 characters long'),

    body('Language')
      .notEmpty()
      .withMessage('Language is required')
      .isLength({ min: 2 })
      .withMessage('Language must be at least 2 characters long'),

    body('Cost')
      .notEmpty()
      .withMessage('Cost is required')
      .isFloat({ gt: 0 })
      .withMessage('Cost must be a positive number'),

    body('ISBN')
      .notEmpty()
      .withMessage('ISBN is required')
      .isLength({ min: 10, max: 20 })
      .withMessage('ISBN must be between 10 and 20 characters long'),
  ];
};

const validateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

const validateMovieRules = () => {
  return [
    body('Title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters long'),

    body('Director')
      .notEmpty()
      .withMessage('Director is required')
      .isLength({ min: 3 })
      .withMessage('Director must be at least 3 characters long'),

    body('ReleaseYear')
      .notEmpty()
      .withMessage('Release Year is required')
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage('Release Year must be a valid year'),

    body('Genre')
      .notEmpty()
      .withMessage('Genre is required')
      .isLength({ min: 3 })
      .withMessage('Genre must be at least 3 characters long'),

    body('Language')
      .notEmpty()
      .withMessage('Language is required')
      .isLength({ min: 2 })
      .withMessage('Language must be at least 2 characters long'),

    body('RuntimeMinutes')
      .notEmpty()
      .withMessage('Runtime Minutes is required')
      .isInt({ gt: 0 })
      .withMessage('Runtime Minutes must be a positive number'),

    body('Rating')
      .notEmpty()
      .withMessage('Rating is required')
      .isFloat({ min: 0, max: 10 })
      .withMessage('Rating must be between 0 and 10'),
  ];
};

const validateMovie = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  validateBookRules,
  validateBook,
  validateMovieRules,
  validateMovie,
};
