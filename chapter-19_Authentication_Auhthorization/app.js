// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)

const DB_PATH = "mongodb+srv://root:root@airbnb.qbxkucq.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
})

app.use(express.urlencoded());

app.use(session({
  secret : "bhagyadeep",
  resave: false,
  saveUninitialized : true,
  store: store
}))

/*app.use((req,res,next)=>{
 req.session.IsLoggedIn = req.session.IsLoggedIn
 next()
})*/
/*app.use((req,res,next)=>{
  if(req.get('Cookie'))
  {
    req.session.IsLoggedIn = req.get('Cookie')?.split('=')[1];
  }
  else
  {
    req.session.IsLoggedIn = false;
  }
  next();
})*/

app.use(storeRouter);
app.use(authRouter)

app.use('/host',(req,res,next)=>{
  if(req.session.IsLoggedIn)
  {
    next();
  }
  else
  {
    res.redirect('/login')
  }
})  // pehle request me isLoggedIn == true ho tabhi next karo nhi toh "/" redirect ho

app.use("/host", hostRouter); 

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);


const PORT = 3002;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});

// hamesha trust but verify