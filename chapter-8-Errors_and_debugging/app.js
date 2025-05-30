const http = require('http')
const testingSysntax = require('./syntax');
const runtime = require('./runtime');
const logical = require('./logical');

const server = http.createServer((req,res)=>{
  console.log(req.url);
  //testingSysntax();
  //runtime();
  logical();
})

const PORT = 3002;
server.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});