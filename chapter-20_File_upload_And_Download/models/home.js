const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({

  propertyType: {
    type: String,
    required: true,
    enum: ['Apartment', 'Room', 'House', 'Hostel', 'PG']
  },

  pricePerNight: {
    type: Number,
    required: true
  },

  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },

  numberOfRooms: {
    type: Number,
    required: true,
  },

  guestCapacity: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  amenities: [String], // Will store as array of strings split by comma

  availableFrom: Date,
  availableTo: Date,

  photo: String, 
  
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

});

module.exports = mongoose.model("Home", homeSchema);
