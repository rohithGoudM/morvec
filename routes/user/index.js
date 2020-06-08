const { Router } = require("express");
const passport = require('passport');
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');
const User = require('../../models/user');

const userRouter = Router();

userRouter.post('/search-users',(req,res)=>{
    let userPattern = new RegExp(req.body.query)
    User.find({name:{
    	$regex:userPattern,
    	$options: 'i'
    }}).limit(2)
    .select("_id name picture")
    .then(user=>{
        res.json(user)
    }).catch(err=>{
        console.log(err);
    })
})

userRouter.post('/getUser',(req,res)=>{
    console.log(req.body)
    Rating.find({userId:req.body.userID})
    .populate("movies")
    .populate("series")
    .exec((err, ratings)=>{
        res.json(ratings);
    });
})

module.exports = userRouter;


