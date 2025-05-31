const mongoose = require('mongoose');
const favourite = require('./favourite');

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photoUrl: String,
  description: String,
});

// Prehook

homeSchema.pre('findOneAndDelete', async function(next) {  // used to delete
  console.log('Came to pre hook while deleting a home'); // homes in favourite 
  const homeId = this.getQuery()._id;               // when we delete homes 
  await favourite.deleteMany({houseId: homeId});
  next();
});

module.exports = mongoose.model('Home', homeSchema);
