const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title:String,
	year:String,
	imdbID:String,
	poster: String,
	genre:String
});

module.exports = mongoose.model("Movie",movieSchema);