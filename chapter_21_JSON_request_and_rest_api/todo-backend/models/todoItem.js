const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // fixed from 'D'
    },
    completed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true // this will add createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Todo', todoItemSchema);
