// Core Modules
//const path = require('path');

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const userController= require('../controllers/homes');

storeRouter.get("/", userController.index);
storeRouter.get("/homes", userController.getHomes);
storeRouter.get("/bookings", userController.getBookings);
storeRouter.get("/favourites", userController.getFavouriteList);
storeRouter.post("/favourites", userController.postFavourite);
storeRouter.get("/index", userController.index);
storeRouter.get("/homes/:homeId", userController.getHomeDetails);


module.exports = storeRouter;