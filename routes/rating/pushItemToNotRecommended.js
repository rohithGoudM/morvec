const { Router } = require("express");
const User = require('../../models/user');

const pushItemToNotRecommendedRouter = Router();

pushItemToNotRecommendedRouter.post('/',(req,res)=>{

	User.findByIdAndUpdate(req.user._id,{
		$push:{
			[req.body.itemType+"NotRecommended"]:req.body.imdbID,
			[req.body.itemType+"NotRecommendedObjectIDs"]:req.body.itemID
		}
	},{
		new:true
	},(error, currentUser)=>{
		if(error){
			return null;
		}
		res.json({currentUser});
	});
});

module.exports = pushItemToNotRecommendedRouter;