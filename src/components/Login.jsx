import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || !password === "") {
      setError("Please enter login name and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/admin/login", {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ login_name: username, password }),
      })
      console.log(response)
      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Login failed");
        return;
      }
      const user = await response.json();
      onLogin(user);
      navigate("/");
    } catch (err) {
      setError("Server error");
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
      <h2 style={titleStyle}>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={inputStyle}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={inputStyle}
      />
      <button onClick={handleLogin} style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}>
        Login
      </button>
      {error && <p style={errorStyle}>{error}</p>}
      <p style={registerTextStyle}>
        Don't have an account?{" "}
        <Link to="/register" style={linkStyle}>
          Register
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

const registerTextStyle = {
  marginTop: "20px",
  fontSize: "0.9rem",
  color: "#555",
};

const linkStyle = {
  color: "#4a90e2",
  textDecoration: "none",
  fontWeight: "600",
};

