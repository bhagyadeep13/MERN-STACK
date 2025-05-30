const { default: mongoose } = require("mongoose");

const favSchema = mongoose.Schema({
  homeId: 
  {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Home",
    unique: true,
    required: true
  }
})

module.exports = mongoose.model("Favourite",favSchema)