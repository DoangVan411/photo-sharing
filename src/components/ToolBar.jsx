import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ToolBar({ user, onLogout }) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLogout = async () => {
    console.log(user)
    try {
      localStorage.removeItem('token');
      onLogout();
      navigate("/login-register");
    } catch (err) {
      console.log("Error during logout");
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Pick an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/photos/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error uploading image');
      }

      const result = await response.json();
      alert('Upload image successfully!');
      setSelectedFile(null);
      document.getElementById('fileInput').value = '';
      
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h3>{user ? `Hi ${user.first_name}` : "Please Login"}</h3>
      {user && (
        <div style={buttonContainerStyle}>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => document.getElementById('fileInput').click()}
            style={uploadButtonStyle}
          >
            Pick image
          </button>
          {selectedFile && (
            <button
              onClick={handleUpload}
              style={uploadButtonStyle}
            >
              Upload
            </button>
          )}
          <button
            onClick={handleLogout}
            style={buttonStyle}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  position: "fixed", 
  top: 0,
  width: '100%',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#1976d2",
  color: "white",
}

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '10px',
  alignItems: 'center',
  marginRight: '20px'
}

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#f44336",
  border: "none",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
}

const uploadButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
}