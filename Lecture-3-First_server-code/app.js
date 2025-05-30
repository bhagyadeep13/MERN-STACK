const http = require('http')

/*function requestListerner(req,res)
{
    console.log(req);
}*/

const server = http.createServer((req,res)=>{ // req - request
  console.log(req);                           // res - response
})

const PORT = 3001;
server.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});