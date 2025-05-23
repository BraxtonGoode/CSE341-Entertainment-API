const MongoDb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
  try {
    const results = await MongoDb.getDb().collection('Books').find();
    const books = await results.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  try {
    const results = await MongoDb.getDb()
      .collection('Books')
      .find({ _id: bookId });
    const book = await results.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBook = async (req, res) => {
  const book = {
    Title: req.body.Title,
    Author: req.body.Author,
    PublishedYear: req.body.PublishedYear,
    Genre: req.body.Genre,
    Language: req.body.Language,
    Cost: req.body.Cost,
    ISBN: req.body.ISBN,
  };
  try {
    const result = await MongoDb.getDb().collection('Books').insertOne(book);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid ID format');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
      Title: req.body.Title,
      Author: req.body.Author,
      PublishedYear: req.body.PublishedYear,
      Genre: req.body.Genre,
      Language: req.body.Language,
      Cost: req.body.Cost,
      ISBN: req.body.ISBN,
    };
    const result = await MongoDb.getDb()
      .collection('Books')
      .updateOne({ _id: bookId }, { $set: book });
    if (result.matchedCount === 0) {
      return res.status(404).send('Book not found');
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  try {
    const result = await MongoDb.getDb()
      .collection('Books')
      .deleteOne({ _id: bookId });
    if (result.deletedCount === 0) {
      return res.status(404).send('Book not found');
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
