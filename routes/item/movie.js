const { Router } = require("express");
const passport = require('passport');
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');
const fetch = require('node-fetch');

const movieRouter = Router();

movieRouter.post('/findOrCreate',(req,res)=>{
	Movie.findOne({imdbID:req.body.imdbID},(err, existingMovie)=>{
		if(!err && existingMovie){
			res.json(existingMovie);
		}else if(!err && !existingMovie){
			fetch('http://www.omdbapi.com/?i='+req.body.imdbID+'&apikey=9b1c32f2')
			.then(res=>res.json())
			.then((movieDetails)=>{
				let newMovie = {
					title: movieDetails.Title,
					year: movieDetails.Year,
					imdbID: movieDetails.imdbID,
					poster: movieDetails.Poster,
					genre: movieDetails.Genre.trim().split(", ").sort().join(", ")
				};
				new Movie(newMovie).save().then((savedMovie)=>{
					res.json(savedMovie);
				});				
			});
		}
	})
});

module.exports = movieRouter;