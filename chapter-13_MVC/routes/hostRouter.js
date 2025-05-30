// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
//const rootDir = require("../utils/pathUtil");
const homeController = require('../controllers/homes');

hostRouter.get("/add-home", homeController.getAddHome)
hostRouter.post("/add-home", homeController.AddHome)
hostRouter.get("/host-home-list", homeController.getHostList);

exports.hostRouter = hostRouter;