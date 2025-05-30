const express = require('express')
const path = require('path')
const contact_us = express.Router();

const rootDir = require('../utils/pathUtils')

contact_us.get('/contact-us',(req,res,next)=>{

  console.log("Contact Us page",req.url,req.method)
  res.sendFile(path.join(rootDir,'views','contact_us.html'))
})

module.exports = contact_us;