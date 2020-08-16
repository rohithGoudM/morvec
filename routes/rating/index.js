const { Router } = require("express");
const findOrCreateRouter = require('./findOrCreate');
const placeItemRouter = require('./placeItem');
const pullItemRouter = require('./pullItem');
const pushItemToNotRecommendedRouter = require('./pushItemToNotRecommended');

const ratingRouter = Router();

ratingRouter.use('/findOrCreate', findOrCreateRouter);
ratingRouter.use('/placeItem', placeItemRouter);
ratingRouter.use('/pullItem', pullItemRouter);
ratingRouter.use('/pushItemToNotRecommended', pushItemToNotRecommendedRouter );



module.exports = ratingRouter;


