const express = require('express')
const path = require('path')
const homeRoute = express.Router();

const rootDir = require('../utils/pathUtils')

homeRoute.get("/",(req,res,next)=>{
  console.log(req.url,req.method)
  res.sendFile(path.join(rootDir,'views','Home.html'))
})

module.exports = homeRoute;