const express = require('express')
const path = require('path')        // imp used to add html files

const userRoute = express.Router();

userRoute.get("/",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','user.html'));
})

module.exports = userRoute