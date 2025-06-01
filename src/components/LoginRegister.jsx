import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
    const navigate = useNavigate();

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Welcome to Photo Sharing</h2>
            <p style={descStyle}>Login or Register to continue</p>
            <div style={buttonContainerStyle}>
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </div>
        </div>
    );
}


const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "Arial, sans-serif",
    
};

const titleStyle = {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
};

const descStyle = {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "30px",
};

const buttonContainerStyle = {
    display: "flex",
    gap: "20px",
};

const buttonStyle = {
    padding: "12px 28px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4a90e2",
    color: "white",
    transition: "background-color 0.3s ease",
};

const hoverButtonStyle = {
    backgroundColor: "#357ABD",
};