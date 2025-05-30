const mongo = require('mongodb')

const MongoClient = mongo.MongoClient;

const mongo_url = "mongodb+srv://root:root@airbnb.qbxkucq.mongodb.net/?retryWrites=true&w=majority&appName=airbnb"

let _db;

const mongoConnect = (callback)=>{
  MongoClient.connect(mongo_url)
  .then(client=>{
    console.log(client)
    _db = client.db("airbnb")
    callback();
  }).catch(err =>{
    console.log("Error occurred ",err)
  })
}

const getDB = () =>{
  if(!_db) // undefined
  {
    throw new Error('Mongo not connected')
    
  }
  return _db
}

exports.mongoConnect = mongoConnect  
exports.getDB = getDB

// mutiple exports -- we use exports.x = x
// single exports -- we use module.exports = x