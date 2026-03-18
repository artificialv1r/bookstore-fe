import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIssuesByVolumeId } from "../services/volumesService";
import "../comics.scss";
import {useAuth} from "../../../context/AuthContext";

export default function VolumeIssues() {
    const { role } = useAuth();
    const { volumeId } = useParams();
    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadIssues() {
            try {
                const data = await getIssuesByVolumeId(volumeId);
                setIssues(data);
            } catch (err) {
                setError("Failed to load issues.");
            } finally {
                setLoading(false);
            }
        }
        loadIssues();
    }, [volumeId]);

    if (loading) return <div className="volumes-list">Loading issues...</div>;
    if (error)   return <div className="volumes-list">{error}</div>;

    return (
        <div className="volume-page">
            <div className="volume-hero">
                <h1>Issues</h1>
            </div>

            {issues.length === 0 ? (
                <p className="volumes-empty">No issues found for this volume.</p>
            ) : (
                <div className="volumes-table">
                    {issues.map((issue) => (
                        <div className="volume-item" key={issue.id} onClick={() => {
                            if (role === "Editor") {
                                navigate(`/issues/save/${issue.id}`);
                            }
                        }}
                             style={{ cursor: role === "Editor" ? "pointer" : "default" }}>
                            <h3>{issue.name ?? "Untitled"}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}