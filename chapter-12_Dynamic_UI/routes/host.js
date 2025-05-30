const express = require('express')
const path = require('path')
const hostRoute = express.Router()
//const rootDir = require('../utils/pathUtils')
//const rootDir = require('../utils/pathUtils')

hostRoute.get("/addhome",(req,res,next)=>{
  res.render('AddHome',{title: 'AddHome'})
})

const registeredHomes =[];

hostRoute.post("/addhome",(req,res,next)=>{
  registeredHomes.push({housename : req.body.homename});
   res.render('HomeAdded',{title: 'HomeAdded'})
})

exports.hostRoute = hostRoute;
exports.registeredHomes = registeredHomes;
// registeredHomes in left --> name that other files used to use this
// registeredHomes in Right --> variable we have to export from current file
