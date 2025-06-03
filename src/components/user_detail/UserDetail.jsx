import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchUserData from "./fetchUserData";
import './UserDetail.css';

function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData(`/users/${userId}`).then((data) => {
            if (data) setUser(data);
        });
    }, [userId]);

    if (!user) {
        return (
            <div className="center-container">
                <h2 className="error-text">This user doesn't exist</h2>
            </div>
        );
    }

    const handleShowPhotos = () => {
        navigate(`/photos/${user._id}`);
    };

    return (
        <div className="user-detail-container">
            <div className="user-detail-card">
                <h2 className="user-detail-name">
                    {user.first_name} {user.last_name}
                </h2>
                
                {user.location && (
                    <p className="user-detail-info">
                        <span className="info-icon">📍</span> {user.location}
                    </p>
                )}

                {user.occupation && (
                    <p className="user-detail-info">
                        <span className="info-icon">💼</span> {user.occupation}
                    </p>
                )}

                {user.address && (
                    <p className="user-detail-info">
                        <span className="info-icon">🏠</span> {user.address}
                    </p>
                )}

                {user.birthday && (
                    <p className="user-detail-info">
                        <span className="info-icon">🎂</span> {new Date(user.birthday).toLocaleDateString()}
                    </p>
                )}

                {user.description && (
                    <div className="user-detail-description">
                        <h3 className="description-title">About</h3>
                        <p className="description-text">{user.description}</p>
                    </div>
                )}

                <button className="user-detail-button" onClick={handleShowPhotos}>
                    Show {user.first_name}'s photos
                </button>
            </div>
        </div>
    );
}

export default UserDetail;
