const { Router } = require("express");
const passport = require('passport');
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');
const User = require('../../models/user');

const userRouter = Router();

const authCheck = (req, res, next)=>{
  if(req.user){
    //logged in
    next();
  }else{
    //not logged in
    res.redirect('/');
  }
};

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
    });
})

userRouter.post('/getUser',(req,res)=>{
    Rating.find({userId:req.body.userID})
    .populate("movies")
    .populate("series")
    .exec((err, ratings)=>{
        res.json(ratings);
    });
});

userRouter.post('/getUserProfile',authCheck,(req,res)=>{
    User.findById(req.body.userID,(err, user)=>{
        Rating.find({userId: req.body.userID})
        .populate("movies")
        .populate("series")
        .exec((error, ratings)=>{
            res.json({user,ratings,seenMovies:req.user.seenMovies});
        });
    });
});

module.exports = userRouter;


