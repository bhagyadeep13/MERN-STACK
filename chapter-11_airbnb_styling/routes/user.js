const express = require('express')
const path = require('path')        // imp used to add html files

const rootDir = require('../utils/pathUtils')
const userRoute = express.Router();

userRoute.get("/",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','user.html'));
})

module.exports = userRoute