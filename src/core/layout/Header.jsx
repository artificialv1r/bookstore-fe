import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {logout} from "../../features/auth/services/auth";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="">Bookstore App</Link>
        </div>
        <nav className="nav">
          <Link to="/publishers">Publishers</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
          <Link to="/books/add">Create book</Link>
            {!isAuthenticated ? (
                <>
                  <Link to="/register">Register</Link>
                  <Link to="/signin">Sign in</Link>
                </>
            ) : (
                <button id="signout-btn" onClick={logout}>Sign out</button>
            )}
        </nav>
      </div>
    </header>
  );
}
