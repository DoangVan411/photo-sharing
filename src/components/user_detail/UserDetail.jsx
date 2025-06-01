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
                <button className="user-detail-button" onClick={handleShowPhotos}>
                    Xem ảnh của {user.first_name}
                </button>
            </div>
        </div>
    );
}

export default UserDetail;
