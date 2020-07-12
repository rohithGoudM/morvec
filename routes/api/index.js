const { Router } = require("express");
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');
const User = require('../../models/user');

const apiRouter = Router();

apiRouter.get('/current_user',(req,res)=>{
    res.send(req.user)
});

// apiRouter.get('/ajkl', async (req, res)=>{
// 	let users = await User.find({});
// 	users.map(async (user)=>{
// 		let ratings = await Rating.find({userId:user._id}).populate("movies").populate("series");
// 		ratings.map((rating)=>{
// 			rating.movies.map((mv)=>{
// 				user.movies.push(mv.imdbID);
// 			});
// 			rating.series.map((mv)=>{
// 				user.series.push(mv.imdbID);
// 			});
// 		});
// 		// user.seenMovies = user.seenMovies.filter((imdbID)=>{
// 		// 	return user.movies.includes(imdbID) || user.series.includes(imdbID);
// 		// });
// 		await user.save();
// 		console.log(user.movies.length,user.series.length,user.seenMovies.length);
// 		let sum = user.movies.length + user.series.length;
// 		sum !== user.seenMovies.length && console.log(user.name);
// 	});
// 	res.json({done:true});
// });

// apiRouter.get('/reset',(req,res)=>{
// 	User.find({},(e,users)=>{
// 		users.map((user)=>{
// 			user.series =[];
// 			user.movies=[];
// 			console.log(user.seenMovies.length);
// 			console.log(user.seenMovies[2]);
// 			user.save();
// 		});
// 	});
// 	res.json({done:true})
// })

module.exports = apiRouter;


