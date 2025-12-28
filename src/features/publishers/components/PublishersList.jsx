import React, { useState, useEffect } from "react";
import { getPublishers } from "../services/publishersService";
import { Link } from "react-router-dom";
import "../publishers.scss";

export default function PublishersList() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        setLoading(true);
        const response = await getPublishers();
        setPublishers(response);
      } catch (err) {
        setError("Failed to load publishers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

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
    </div>
  );
}
