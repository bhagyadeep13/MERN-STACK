const express = require('express')
const path = require('path')
const app = express();

app.set('view engine','ejs')
app.set('views','views')
// right wala change kar sakte h

const userRoute = require('./routes/user');
const {hostRoute} = require('./routes/host');
const rootDir = require('./utils/pathUtils')

app.use(express.static(path.join(rootDir,"public")))

app.use((req,res,next)=>{
  console.log(req.url,req.method)
  next();
})

userRoute.use(express.urlencoded())

app.use(userRoute)  // we can add specific common paths here
app.use(hostRoute)

app.use((req,res,next)=>{
  //res.status(404).sendFile(path.join(rootDir,'views','error_page.html'))
  res.render('error_page',{title : '404_page'})
})

const PORT=3002;
app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}/`)
})