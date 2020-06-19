const { Router } = require("express");
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');

const ratingRouter = Router();

ratingRouter.post('/findOrCreate',(req,res)=>{
	let newMovie = {
		title: req.body.title,
		year: req.body.year,
		imdbID: req.body.imdbID,
		poster: req.body.poster
	};
	let newRating = {
		userId: req.user.id,
		genre: req.body.genre,
		rating: req.body.rating,
		movies:[],
		series:[]
	};

	Movie.findOne({imdbID: req.body.imdbID},(error, existingMovie)=>{
		Rating.findOne({
			userId: req.user.id,
			genre: req.body.genre,
			rating: req.body.rating
		})
		.populate(req.body.type)
		.exec((err, existingRating)=>{
			let ratingType = req.body.type;
			if(existingRating && existingMovie){
				if(existingRating[ratingType].length==0){
					existingRating[ratingType].push(existingMovie.id);
					existingRating.save();
					req.user.seenMovies.push(req.body.imdbID);
					req.user.save().then((savedUser)=>{
						res.json({list:null});				
					});
				}else{
					res.json({list:existingRating,movie:existingMovie});
				}
			}else if(existingRating && !existingMovie){
				new Movie(newMovie).save().then((movie)=>{
					newRating[ratingType] = [movie.id];
					if(existingRating[ratingType].length==0){
						existingRating[ratingType].push(movie.id);
						existingRating.save();
						req.user.seenMovies.push(req.body.imdbID);
						req.user.save().then((savedUser)=>{
							res.json({list:null});				
						});
					}else{
						res.json({list: existingRating, movie: movie})
					}
				});
			}else if(!existingRating && existingMovie){
				newRating[ratingType] = [existingMovie.id];
				new Rating(newRating).save();
				req.user.seenMovies.push(req.body.imdbID);
				req.user.save().then((savedUser)=>{
					res.json({list:null});				
				});
			}else if(!existingRating && !existingMovie){
				new Movie(newMovie).save().then((movie)=>{
					newRating[ratingType] = [movie.id];
					new Rating(newRating).save();
				});
				req.user.seenMovies.push(req.body.imdbID);
				req.user.save().then((savedUser)=>{
					res.json({list:null});				
				});
			}
		});
	});
});

ratingRouter.post('/placeItem',(req,res)=>{
	Rating.findById(req.body.ratingID,(err, rating)=>{
		rating[req.body.type].splice(req.body.index,0,req.body.itemID);
		rating.save();
		req.user.seenMovies.push(req.body.imdbID);
		req.user.save();
		res.json({result:true});
	});
});

module.exports = ratingRouter;


