import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    if (
      !formData.login_name ||
      !formData.password ||
      !formData.first_name ||
      !formData.last_name
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://ngl6xs-3001.csb.app/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_name: formData.login_name,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          location: formData.location,
          description: formData.description,
          occupation: formData.occupation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setFormData({
        login_name: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
      });

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={backContainerStyle}>
        <button
          onClick={() => navigate(-1)}
          style={backButtonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = backButtonStyle.backgroundColor)
          }
        >
          ← Back
        </button>
      </div>
      <h2 style={titleStyle}>Register</h2>

      <input
        type="text"
        name="login_name"
        value={formData.login_name}
        placeholder="Username *"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="Password *"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Confirm Password *"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        placeholder="First name *"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        placeholder="Last name *"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        placeholder="Location"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="occupation"
        value={formData.occupation}
        placeholder="Occupation"
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
        style={{ ...inputStyle, minHeight: "100px" }}
      />

      <button
        onClick={handleRegister}
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = buttonStyle.backgroundColor)
        }
      >
        Register Me
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
  marginTop: "100px",
  padding: "30px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  backgroundColor: "#fff",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
};

const backContainerStyle = {
  width: "100%",
  textAlign: "left",
};

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
