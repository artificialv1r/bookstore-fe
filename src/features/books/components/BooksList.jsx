import React, { useState, useEffect } from "react";
import { deleteBook, getBooks } from "../services/booksService";
import "../books.scss";
import { useNavigate } from "react-router-dom";
import {fetchSortedBooks, fetchFilteredAndSortedBooks} from "../services/booksService";
import { getAllAuthors } from "../../authors/services/authorsService";


export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    publishedFrom: "",
    publishedTo: "",
    authorId: "",
    author: "",
    authorBirthFrom: "",
    authorBirthTo: ""
  });

  const navigate = useNavigate();
  async function loadAuthors() {
    try {
      const data = await getAllAuthors();
      setAuthors(data);
    } catch {
      setError("Failed to load authors.");
    }
  }

  async function loadBooks(page, sortBy, filters) {
    try {
      setLoading(true);
      const data = await fetchFilteredAndSortedBooks(
          page + 1,
          filters,
          sortBy
      );

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

  const pageSize = 5;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    loadAuthors();
  }, []);


  useEffect(() => {
    loadBooks(page, sortBy, filters);
  }, [page, sortBy]);

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
      loadBooks(page, sortBy, filters);
    } catch (error) {
      setError("Failed to delete a book.");
    }
  }

  async function handleEdit(id) {
    navigate(`/books/edit/${id}`);
  }

  function handleSearch() {
    setPage(0);
    loadBooks(0, sortBy, filters);
  }

  function handleReset() {
    const emptyFilters = {
      title: "",
      publishedFrom: "",
      publishedTo: "",
      authorId: "",
      author: "",
      authorBirthFrom: "",
      authorBirthTo: ""
    };
    setFilters(emptyFilters);
    setPage(0);
    loadBooks(0, sortBy, emptyFilters);
  }

  return (
    <div className="book-page">
      <div className="book-hero">
        <h1>Our Books</h1>
      </div>

      {/* FILTER SECTION */}
      <div className="books-filters">
        <div className="filter-item">
        <label>Title:</label>
        <input
            type="text"
            placeholder="Title"
            value={filters.title}
            onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
            }
        />
        </div>

        <div className="filter-item">
        <label>Published From:</label>
        <input
            type="date"
            value={filters.publishedFrom}
            onChange={(e) =>
                setFilters({ ...filters, publishedFrom: e.target.value })
            }
        />
        </div>

        <div className="filter-item">
          <label>Published to:</label>
        <input
            type="date"
            value={filters.publishedTo}
            onChange={(e) =>
                setFilters({ ...filters, publishedTo: e.target.value })
            }
        />
        </div>

        <div className="filter-item">
          <label>Author Name:</label>
        <input
            type="text"
            placeholder="Author name"
            value={filters.author}
            onChange={(e) =>
                setFilters({ ...filters, author: e.target.value })
            }
        />
        </div>

        <div className="filter-item">
          <label>Author:</label>
        <input
            type="text"
            placeholder="Author name"
            value={filters.author}
            onChange={(e) =>
                setFilters({ ...filters, author: e.target.value })
            }
        />
        </div>

        <div className="filter-item">
          <label>Author:</label>
          <select
              value={filters.authorId || ""}
              onChange={(e) =>
                  setFilters({
                    ...filters,
                    authorId: e.target.value ? Number(e.target.value) : ""
                  })
              }
          >
            <option value="">All Authors</option>
            {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.fullName}
                </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Author Birth From:</label>
          <input
              type="date"
              value={filters.authorBirthFrom}
              onChange={(e) =>
                  setFilters({ ...filters, authorBirthFrom: e.target.value })
              }
          />
        </div>

        <div className="filter-item">
          <label>Author Birth To:</label>
          <input
              type="date"
              value={filters.authorBirthTo}
              onChange={(e) =>
                  setFilters({ ...filters, authorBirthTo: e.target.value })
              }
          />
        </div>

        <button id="searchBtn" onClick={handleSearch}>Search</button>
        <button id="resetBtn" onClick={handleReset}>Reset</button>
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

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={!hasPreviousPage} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
