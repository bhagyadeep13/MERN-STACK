const express = require('express')
const path = require('path')
const hostRoute = express.Router()

hostRoute.get("/addhome",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','AddHome.html'))
})

hostRoute.post("/addhome",(req,res,next)=>{
  console.log(req.body)
   res.sendFile(path.join(__dirname,'../','views','HomeAdded.html'))
})

module.exports = hostRoute
