// external module
const express = require('express')

const userRequesthandler = require('./user')

const app = express()

// Middleware 
/* 
1--> order matters
2--> next() is not come after res.send()
3--> res.send() indirectly means res.end()
4--> "/" matches everything
5--> "/" in case of app.get() or app.post() matches exactly what written
6--> app.post('/',(req,res,next)) --> method=="POST" && req.url=="/"
7--> app.get('/',(req,res,next)) --> method=="GET" && req.url=="/"
*/

app.get('/',(req,res,next)=>{
  console.log("Came in first middlelware",req.url,req.method)
  next();
})

app.use('/',(req,res,next)=>{
  console.log("Came in second middlelware",req.url,req.method)
  next();
})

app.use('/submit-details',(req,res,next)=>{
  console.log("Came in third middlelware",req.url,req.method)
  next();
})

app.use('/',(req,res,next)=>{
  console.log("Came in fourth middlelware",req.url,req.method)
  res.send('<p>Done changes</p>')
})

const PORT = 3002;
app.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});