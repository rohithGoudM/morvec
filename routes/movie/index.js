const { Router } = require("express");
const passport = require('passport');
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');

const movieRouter = Router();

movieRouter.post('/rating',(req,res)=>{
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
				if(existingRating[ratingType] == []){
					existingRating[ratingType].push(existingMovie.id);
					existingRating.save().then((savedRating)=>{
						req.user.seenMovies.push(req.body.imdbID);
						req.user.save().then((savedUser)=>{
							res.json({list:null});				
						});
					});
				}else{
					res.json({list:existingRating[req.body.type],movie:existingMovie});
				}
			}else if(existingRating && !existingMovie){
				new Movie(newMovie).save().then((movie)=>{
					newRating[ratingType] = [movie.id];
					if(existingRating[ratingType] == []){
						existingRating[ratingType].push(movie.id);
						existingRating.save().then((savedRating)=>{
							req.user.seenMovies.push(req.body.imdbID);
							req.user.save().then((savedUser)=>{
								res.json({list:null});				
							});							
						});
					}else{
						res.json({list: existingRating[req.body.type], movie: movie})
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

movieRouter.post('/placeMovie',(req,res)=>{
	let strRating = req.body.rating.toString();
	Rating.findOne({
		userId: req.user.id,
		genre: req.body.genre,
		rating: strRating
	},(error,rating)=>{
		rating[req.body.type].set(req.body.index,req.body.movieID);
		rating.save((err, savedRating)=>{
			console.log(savedRating)
			req.user.seenMovies.push(req.body.imdbID);
			req.user.save().then((savedUser)=>{			
				res.json(savedRating);		
			});
		});
	});
});

module.exports = movieRouter;