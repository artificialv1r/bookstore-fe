import React, {useState, useEffect} from "react";
import {fetchAuthorPage} from "../services/authorsService";
import "../authors.scss"

export default function AuthorsList() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    async function loadAuthorPage(page){
        try {
            setLoading(true);
            console.log('Fetching page:', page + 1); // Debug log
            const data = await fetchAuthorPage(page + 1);
            console.log('Received data:', data.items); // Debug log
            setAuthors(data.items);
            setTotalItems(data.count);
            setHasNextPage(data.hasNextPage);
            setHasPreviousPage(data.hasPreviousPage)
        } catch (error) {
            console.error('Error fetching authors:', error); // Detaljnija greška
            console.error('Error response:', error.response);
            setError("Failed to fetch authors");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAuthorPage(page);
    }, [page]);

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
        return<div>Loading authors...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    const formatDate = (dateString) => {
        if (!dateString) return "";

        return new Intl.DateTimeFormat("sr-RS", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(dateString));
    };

    const pageSize = 4;
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="authors-preview">
            <div className="page-title">
                <h1>Authors</h1>
            </div>

            <div className="authors-table">
                <table>
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Biography</th>
                        <th>Date of Birth</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td id="author-name">{author.fullName}</td>
                            <td>{author.biography}</td>
                            <td>{formatDate(author.dateOfBirth)}</td>
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
                    Page {page + 1} of {totalPages} (Total: {totalItems} authors)
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={!hasNextPage || loading}
                >
                    Next
                </button>
            </div>

        </div>
    )
}