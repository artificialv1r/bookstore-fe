import React, { useState } from "react";
import "../books.scss";

export default function BooksList() {
  const [books, setBooks] = useState([]);

  return (
    <div className="book-page">
      <div className="book-hero">
        <h1>Our Books</h1>
      </div>
      <div className="book-display"></div>
    </div>
  );
}
