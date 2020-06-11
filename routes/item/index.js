const { Router } = require("express");
const movieRoutes = require("./movie");
const seriesRoutes = require("./series");
// const bookRoutes = require("./book");

const itemRouter = Router();

itemRouter.use('/movie', movieRoutes);
itemRouter.use('/series', seriesRoutes);
// itemRouter.use('/book', bookRoutes);

module.exports = itemRouter;