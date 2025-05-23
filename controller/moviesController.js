const MongoDb = require('../db/mongodb');
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
    }
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
}

module.exports = {
    getAllMovies,
    getMovieById,
};
