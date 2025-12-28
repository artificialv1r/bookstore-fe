import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <main className="welcome">
      <div className="welcome-bookstore">
        <div className="bookstore-card">
          <h2>Publishers</h2>
          <div className="bookstore-image">
            <img
              src="
              https://cdn.pixabay.com/photo/2023/01/14/01/03/women-7717254_1280.png"
              alt="book"
            />
          </div>
          <div className="bookstore-text">
            <p>
              View publisher details, add new publishers, and keep your book
              catalog organized
            </p>
            <Link to="/publishers">View All</Link>
          </div>
        </div>

        <div className="bookstore-card">
          <h2>Books</h2>
          <div className="bookstore-image">
            <img
              src="https://cdn.pixabay.com/photo/2023/01/14/00/58/women-7717225_1280.png"
              alt="book"
            />
          </div>
          <div className="bookstore-text">
            <p>
              All your books, neatly organized. Browse through the list, check
              details, or update information anytime.
            </p>
            <Link to="/books">View All</Link>
          </div>
        </div>

        <div className="bookstore-card">
          <h2>Import Book</h2>
          <div className="bookstore-image">
            <img
              src="https://cdn.pixabay.com/photo/2023/01/14/01/02/women-7717250_1280.png"
              alt="book"
            />
          </div>
          <div className="bookstore-text">
            <p>
              Complete the form to add a book, assign a publisher, and keep your
              library organized.
            </p>
            <Link to="/books/new">Add Book</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
