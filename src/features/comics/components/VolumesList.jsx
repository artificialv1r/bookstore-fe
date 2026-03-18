import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getVolumes} from "../services/volumesService";
import "../comics.scss"
export default function VolumesList() {

    const [volumes, setVolumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const navigate = useNavigate();

    async function loadVolumes(query) {
        try{
            setLoading(true);
            const data = await getVolumes(query);
            setVolumes(data);
        } catch (error) {
            setError("Failed to load volumes");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="volumes-list">Loading comics...</div>;
    }

    if (error) {
        return <div className="volumes-list">{error}</div>;
    }

    function handleSearch(){
        loadVolumes(query);
        setHasSearched(true);
    }

    return (
        <div className="volume-page">
            <div className="volume-hero">
                <h1>Volumes</h1>
            </div>

            <div className="volumes-search">
                <div className="volume-search-input">
                    <label>Name:</label>
                    <input type="text" placeholder="Search volumes..." onChange={(e) => setQuery(e.target.value)} />
                </div>
                <button id="search-btn" onClick = {handleSearch}>Search</button>
            </div>

            {hasSearched &&(
            <div className="volumes-table">
                    {volumes.map((volume)=>(
                        <div className="volume-item" key={volume.id} onClick={() => navigate(`/volumes/${volume.id}/issues`)}>
                            <h3>{volume.name}</h3>
                        </div>
                    ))}
            </div>)}
        </div>
    )
}