import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const GoogleCallback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");

        if (token) {
            login(token);
            navigate("/");
        } else {
            console.error("Token nije pronađen u URL-u");
            navigate("/sign-in");
        }
    }, [location.search, navigate, login]);

    return <div>Učitavanje...</div>;
};

export default GoogleCallback;