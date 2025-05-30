const express = require('express')
const path = require('path')        // imp used to add html files

const { registeredHomes} = require('./host');
const userRoute = express.Router();

userRoute.get("/",(req,res,next)=>{
  console.log(registeredHomes);
  res.render('user',{registeredhomes: registeredHomes,title: 'air bnb'});
})

module.exports = userRoute