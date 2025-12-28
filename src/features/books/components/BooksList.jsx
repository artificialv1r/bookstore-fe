import React, { useState, useEffect } from "react";
import { deleteBook, getBooks } from "../services/booksService";
import "../books.scss";
import { useNavigate } from "react-router-dom";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function loadBooks() {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <div className="books-list">Loading books...</div>;
  }

  if (error) {
    return <div className="books-list">{error}</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Intl.DateTimeFormat("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateString));
  };

  async function handleDelete(id) {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      setError("Failed to delete a book.");
    }
  }

  async function handleEdit(id) {
    navigate(`/books/edit/${id}`);
  }

  return (
    <div className="book-page">
      <div className="book-hero">
        <h1>Our Books</h1>
      </div>

      <div className="books-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Publish Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td id="book-name">{book.title}</td>
                <td>{book.author.fullName}</td>
                <td>{book.publisher.name}</td>
                <td>{formatDate(book.publishedDate)}</td>
                <td>
                  <button
                    id="editBtn"
                    onClick={() => {
                      handleEdit(book.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    id="deleteBtn"
                    onClick={() => {
                      handleDelete(book.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
