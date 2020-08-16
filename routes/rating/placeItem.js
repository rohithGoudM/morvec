const { Router } = require("express");
const Rating = require('../../models/rating');

const placeItemRouter = Router();

placeItemRouter.post('/',(req,res)=>{
	Rating.findById(req.body.ratingID,(err, rating)=>{
		rating[req.body.type].splice(req.body.index,0,req.body.itemID);
		rating.save();
		// req.user.seenMovies.push(req.body.imdbID);
		req.user[req.body.type].push(req.body.imdbID);
		req.user.save();
		res.json({result:true});
	});
});

module.exports = placeItemRouter;