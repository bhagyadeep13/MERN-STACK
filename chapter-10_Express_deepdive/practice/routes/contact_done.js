const express = require('express')
const path = require('path')
const contactDone = express.Router();

const rootDir = require('../utils/pathUtils')

contactDone.post("/contact-us",(req,res,next)=>
  {
      console.log(req.url,req.method,req.body)
       res.sendFile(path.join(rootDir,'views','contactDone.html'))
  })


module.exports = contactDone;