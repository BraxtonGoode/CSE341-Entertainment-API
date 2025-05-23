const MongoDb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
  try {
    const results = await MongoDb.getDb().collection('Movies').find();
    const movies = await results.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMovieById = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  try {
    const results = await MongoDb.getDb()
      .collection('Movies')
      .find({ _id: movieId });
    const movie = await results.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMovie = async (req, res) => {
  const movie = {
    Title: req.body.Title,
    Director: req.body.Director,
    ReleaseYear: req.body.ReleaseYear,
    Genre: req.body.Genre,
    Language: req.body.Language,
    RuntimeMinutes: req.body.RuntimeMinutes,
    Rating: req.body.Rating,
  };
  try {
    const result = await MongoDb.getDb().collection('Movies').insertOne(movie);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid ID format');
    }
    const movieId = new ObjectId(req.params.id);
    const movie = {
      Title: req.body.Title,
      Director: req.body.Director,
      ReleaseYear: req.body.ReleaseYear,
      Genre: req.body.Genre,
      Language: req.body.Language,
      RuntimeMinutes: req.body.RuntimeMinutes,
      Rating: req.body.Rating,
    };
    const result = await MongoDb.getDb()
      .collection('Movies')
      .updateOne({ _id: movieId }, { $set: movie });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid ID format');
    }
    const movieId = new ObjectId(req.params.id);
    const result = await MongoDb.getDb()
      .collection('Movies')
      .deleteOne({ _id: movieId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie
};
