import React, { useState, useEffect } from "react";
import { deleteBook, getBooks } from "../services/booksService";
import "../books.scss";
import { useNavigate } from "react-router-dom";
import {fetchSortedBooks} from "../services/booksService";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const navigate = useNavigate();

  async function loadPublisherPage(page, sortBy ) {
    try {
      setLoading(true);
      const data = await fetchSortedBooks(page + 1, sortBy);
      setBooks(data.items);
      setTotalItems(data.count);
      setHasNextPage(data.hasNextPage);
      setHasPreviousPage(data.hasPreviousPage);
    } catch (error) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPublisherPage(page, sortBy);
  }, [page, sortBy]);

  const pageSize = 5;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPage(prevPage => prevPage - 1);
    }
  };

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
      await fetchSortedBooks(page, sortBy);
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

      {/* Sorting dropdown */}
      <div className="books-controls">
        <label htmlFor="sort">Sort by: </label>
        <select
            id="sort"
            value={sortBy}
            onChange={(e) => {
              setPage(0);
              setSortBy(Number(e.target.value));
            }}
        >
          <option value={0}>Title (A-Z)</option>
          <option value={1}>Title (Z-A)</option>
          <option value={2}>Date (A-Z)</option>
          <option value={3}>Date (Z-A)</option>
          <option value={4}>Author (A-Z)</option>
          <option value={5}>Author (Z-A)</option>
        </select>
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
                <td>{book.author}</td>
                <td>{book.publisher}</td>
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
