// external module
const express = require('express')
const bodyParser = require('body-parser')

const userRequesthandler = require('./user')

const app = express();

app.use((req,res,next)=>{
  console.log("Came in first middlelware",req.url,req.method)
  next()
})

app.use((req,res,next)=>{
  console.log("Came in second middlelware",req.url,req.method)
  next()
})

/*app.use((req,res,next)=>{
  console.log("Came in third middleware",req.url,req.method)
  res.send(`<h1>First task done</h1>`)
})

app.get('/',(req,res,next)=>{
  console.log("handling / for get",req.url,req.method)
  res.send(`<h1>First task done</h1>`)
})
*/

app.get('/contact-us',(req,res,next)=>{

  console.log("Contact Us page",req.url,req.method,req.body)
  res.send(`
    <h1>Enter Your details <h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="Name" placeholder="Enter Name">
      <input type="email" name="Email" placeholder="Enter Email">
      <input type="submit" value="submit">
    </form>`)
})

app.use(bodyParser.urlencoded()); // iske baad wale sare middleware me 
                                  // ye req.body se body print kar sakte ho
                                  
app.post("/contact-us",(req,res,next)=>{

      console.log(req.url,req.method,req.body)
       res.send( `<h1>${JSON.stringify(req.body)}</h1>`)
      })

const PORT = 3002;
app.listen(PORT,()=>{
  console.log(`Your server is running at http://localhost:${PORT}/`)
});