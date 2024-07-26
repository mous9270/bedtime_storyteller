// pages/index.js
"use client" 

import React, { useEffect, useState } from 'react';
import Reading from './components/Reading';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <Reading />
      <ul>
        {books.map((book) => (
          <li key={book._id} onClick={() => setSelectedBook(book)}>
            {book.title}
          </li>
        ))}
      </ul>
      {selectedBook && <Reading book={selectedBook} />}
    </div>
  );
};

export default Home;

