import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {saveIssue} from "../services/volumesService";

export default function IssueForm() {
    const { issueId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        pageCount: "",
        price: "",
        amount: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);

            await saveIssue({
                externalId: parseInt(issueId),
                pageCount: parseInt(form.pageCount),
                price: parseFloat(form.price),
                amount: parseInt(form.amount)
            });

            navigate("/");
        } catch (err) {
            setError("Failed to save issue");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-page">
            <h1>Save Issue</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="pageCount"
                    placeholder="Page count"
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                />

                <input
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );
}