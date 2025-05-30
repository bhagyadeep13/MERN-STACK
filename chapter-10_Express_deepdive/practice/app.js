// external module
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const userRequesthandler = require('./user');
const homeRoute = require('./routes/home');
const contact_us = require('./routes/contact_us');
const contactDone = require('./routes/contact_done');
const rootDir = require('./utils/pathUtils')

const app = express();

app.use((req,res,next)=>{
  console.log(req.url,req.method)
  next();
})

app.use(homeRoute);

app.use(contact_us)

app.use(bodyParser.urlencoded()); // iske baad wale sare middleware me 
                                  // ye req.body se body print kar sakte ho
app.use(contactDone)

app.use((req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','404_page.html'))
})

const PORT = 3002;
app.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});