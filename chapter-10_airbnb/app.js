const express = require('express')
const userRoute = require('./routes/user');
const hostRoute = require('./routes/host');
const path = require('path')
const app = express();

app.use((req,res,next)=>{
  console.log(req.url,req.method)
  next();
})

userRoute.use(express.urlencoded())

app.use(userRoute)  // we can add specific common paths here
app.use(hostRoute)

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(__dirname,'views','error_page.html'))
})

const PORT=3002;
app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}/`)
})