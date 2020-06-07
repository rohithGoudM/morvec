const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
	genre:String,
	rating:String,
	userId:{type:ObjectId,ref:"User"},
	movies:[{type:ObjectId,ref:"Movie"}],
	series:[{type:ObjectId,ref:"Movie"}]
});

module.exports = mongoose.model("Rating",ratingSchema);
