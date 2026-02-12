import React, { useState, useEffect } from "react";
import {fetchSortedPublishers, getPublishers} from "../services/publishersService";
import { Link } from "react-router-dom";
import "../publishers.scss";

export default function PublishersList() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  async function loadPublisherPage(page, sortBy ) {
    try {
      setLoading(true);
      const data = await fetchSortedPublishers(page + 1, sortBy);
      setPublishers(data.items);
      setTotalItems(data.count);
      setHasNextPage(data.hasNextPage);
      setHasPreviousPage(data.hasPreviousPage);
    } catch (error) {
      setError("Failed to fetch publishers");
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
    return <div className="publishers-list">Loading publishers...</div>;
  }

  if (error) {
    return <div className="publishers-list">{error}</div>;
  }

  return (
    <div className="publishers-list">
      <div className="publishers-hero">
        <h2>Meet Our Publishers</h2>
      </div>

      {/* Sorting dropdown */}
      <div className="publishers-controls">
        <label htmlFor="sort">Sort by: </label>
        <select
            id="sort"
            value={sortBy}
            onChange={(e) => {
              setPage(0);
              setSortBy(Number(e.target.value));
            }}
        >
          <option value={0}>Name (A-Z)</option>
          <option value={1}>Name (Z-A)</option>
          <option value={2}>Address (A-Z)</option>
          <option value={3}>Address (Z-A)</option>
        </select>
      </div>

      <div className="publishers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher) => (
              <tr key={publisher.id}>
                <td id="publisher-name">{publisher.name}</td>
                <td>{publisher.address}</td>
                <td>
                  <Link href={publisher.website}>{publisher.website}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="pagination">
        <button
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage || loading}
        >
          Previous
        </button>

        <span>
                    Page {page + 1} of {totalPages} (Total: {totalItems} publishers)
                </span>

        <button
            onClick={handleNextPage}
            disabled={!hasNextPage || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
