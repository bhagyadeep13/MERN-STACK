// Core Module
const path = require('path');
const cors = require('cors');
const express = require('express');
const rootDir = require('./utils/pathUtil');
const errorsController = require('./controllers/errors');

// External Module
const { default: mongoose } = require('mongoose');
const todoItem = require('./models/todoItem');
const todoItemRouter = require('./routes/todoItemRouter');

const DB_PATH = "mongodb+srv://root:root@airbnb.qbxkucq.mongodb.net/todo?retryWrites=true&w=majority&appName=airbnb";

//Local Module

const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')))
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

app.use("/api/todo",todoItemRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});

// hamesha trust but verify