const express = require('express')
const path = require('path')
const hostRoute = express.Router()
const rootDir = require('../utils/pathUtils')

hostRoute.get("/addhome",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','AddHome.html'))
})

hostRoute.post("/addhome",(req,res,next)=>{
  console.log(req.body)
   res.sendFile(path.join(rootDir,'views','HomeAdded.html'))
})

module.exports = hostRoute
