// Core Modules

const { default: mongoose } = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: 
  {
    type : String,
    required: true
  },
  price: 
  {
    type : String,
    required: true
  },
  location: 
  {
    type : String,
    required: true
  },
  rating: 
  {
    type : String,
    required: true
  },
  photoUrl: String,
  description : String,
})

module.exports = mongoose.model("Home",homeSchema)
