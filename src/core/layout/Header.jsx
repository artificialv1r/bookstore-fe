import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="">Bookstore App</Link>
        </div>
        <nav className="nav">
          <Link to="/publishers">Publishers</Link>
          <Link to="/books">Books</Link>
          <Link to="/books/new">Create book</Link>
        </nav>
      </div>
    </header>
  );
}
