const { Router } = require("express");
const passport = require('passport');
const Rating = require('../../models/rating');
const Movie = require('../../models/movie');

const apiRouter = Router();

apiRouter.get('/current_user',(req,res)=>{
    res.send(req.user)
})

module.exports = apiRouter;


