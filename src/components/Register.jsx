import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password && firstName && lastName) {
      onRegister({ firstName });
      navigate("/");
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={backContainerStyle}>
        <button
          onClick={() => navigate(-1)}
          style={backButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = backButtonStyle.backgroundColor)}
        >
          ← Back
        </button>
      </div>
      <h2 style={titleStyle}>Register</h2>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        value={firstName}
        placeholder="First name"
        onChange={(e) => setFirstName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        value={lastName}
        placeholder="Last name"
        onChange={(e) => setLastName(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleRegister} style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}>
        Register
      </button>
      {error && <p style={errorStyle}>{error}</p>}
      <p style={loginTextStyle}>
        Already have an account?{" "}
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
      </p>
    </div>
  );
}

const containerStyle = {
  maxWidth: "500px",
  margin: "90px auto",
  marginTop: '100px',
  padding: "30px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  backgroundColor: "#fff",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
};

const backContainerStyle = {
  width: '100%',
  textAlign: 'left'
}

const titleStyle = {
  marginBottom: "20px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outlineColor: "#4a90e2",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#4a90e2",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const backButtonStyle = {
  padding: "6px 12px",
  fontSize: "0.9rem",
  backgroundColor: "#eee",
  color: "#333",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "20px",
};

const hoverButtonStyle = {
  backgroundColor: "#357ABD",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
  fontWeight: "600",
};

const loginTextStyle = {
  marginTop: "20px",
  fontSize: "0.9rem",
  color: "#555",
};

const linkStyle = {
  color: "#4a90e2",
  textDecoration: "none",
  fontWeight: "600",
};

