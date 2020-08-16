const { Router } = require("express");
const Rating = require('../../models/rating');
const User = require('../../models/user');

const pullItemRouter = Router();

pullItemRouter.post('/',(req,res)=>{
	Rating.findByIdAndUpdate(req.body.ratingID,{
			$pull:{[req.body.itemType]:req.body.itemID}
		},{
			new:true
		},
		(err, rating)=>{
		if(err){
			return null;
		}
		User.findByIdAndUpdate(req.user._id,{
			$pull:{[req.body.itemType]:req.body.imdbID}
		},{
			new:true
		},(error, currentUser)=>{
			if(error){
				return null;
			}
			res.json({rating,currentUser});
		});
	});
});


module.exports = pullItemRouter;