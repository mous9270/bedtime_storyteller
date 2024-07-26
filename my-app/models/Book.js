// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  content: String,
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model('Book', BookSchema);

