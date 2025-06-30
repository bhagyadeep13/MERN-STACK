/*"multer use": 
"Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.",*/

// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const multer = require('multer');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_PATH = process.env.DB_PATH;



//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const authRouter = require('./routes/authRouter');
const aboutRouter = require('./routes/aboutRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoDBStore({ // MongoDB session store
  uri: DB_PATH,
  collection: 'sessions'
})

app.use(express.urlencoded());

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOptions = {
  storage: storage,
  fileFilter: fileFilter,
}

app.use(express.static(path.join(rootDir, 'public')))
app.use(multer(multerOptions).single('photo'));
app.use("/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')))

app.use(session({ // session middleware
  secret : "bhagyadeep",
  resave: false,
  saveUninitialized : false,
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
app.use(authRouter);
app.use(aboutRouter);

app.use('/host',(req,res,next)=>{
  if(req.session.IsLoggedIn)
  {
    next();
  }
  else
  {
    res.redirect('/login')
  }
})  
// pehle request me isLoggedIn == true ho tabhi next karo nhi toh "/" redirect ho
app.use("/host", hostRouter); 

app.use(errorsController.pageNotFound);

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});

// hamesha trust but verify