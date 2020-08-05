const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    username:String,
    picture:String,
    googleProviderId: String,
    name: String,
    createdAt: {type:Date, default: Date.now},
    lastLogin: {type:Date, default: Date.now},
	seenMovies:[String],
    movies:[String],
	moviesNotRecommended:[String],
    moviesNotRecommendedObjectIDs:[{type:ObjectId,ref:"Movie"}],
    series:[String],
	seriesNotRecommended:[String],
    seriesNotRecommendedObjectIDs:[{type:ObjectId,ref:"Movie"}],
    books: [String],
	booksNotRecommended: [String]
    // booksNotRecommendedObjectIDs:[{type:ObjectId,ref:"Book"}],
	// smt: Set,
	// gtg: Map
});

module.exports = mongoose.model("User",userSchema);
