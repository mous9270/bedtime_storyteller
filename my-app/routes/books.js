// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a new book
router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  const savedBook = await newBook.save();
  res.json(savedBook);
});

module.exports = router;

