import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ToolBar({ user, onLogout, onUploadSuccess }) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://ngl6xs-3001.csb.app/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      onLogout();
      navigate("/login-register");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    document.getElementById('fileInput').value = '';
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Pick an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://ngl6xs-3001.csb.app/photos/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error uploading image");
      }

      const result = await response.json();
      alert("Upload image successfully!");
      handleCloseDialog();
      onUploadSuccess?.();
      navigate(`/photos/${user._id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
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
            <button
              onClick={handleLogout}
              style={buttonStyle}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showDialog && (
        <div style={dialogOverlayStyle}>
          <div style={dialogStyle}>
            <div style={dialogHeaderStyle}>
              <h3>Preview Image</h3>
              <button onClick={handleCloseDialog} style={closeButtonStyle}>
                ×
              </button>
            </div>
            <div style={previewContainerStyle}>
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={previewImageStyle}
              />
            </div>
            <div style={dialogFooterStyle}>
              <button onClick={handleCloseDialog} style={cancelButtonStyle}>
                Cancel
              </button>
              <button onClick={handleUpload} style={confirmButtonStyle}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const containerStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#1976d2",
  color: "white",
  zIndex: 1000
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "10px",
  alignItems: "center",
  marginRight: "20px",
};

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#f44336",
  border: "none",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
};

const uploadButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
};

const dialogOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1001
}

const dialogStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  width: '80%',
  maxWidth: '600px',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

const dialogHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  paddingBottom: '10px'
}

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#666'
}

const previewContainerStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px'
}

const previewImageStyle = {
  maxWidth: '100%',
  maxHeight: '400px',
  objectFit: 'contain'
}

const dialogFooterStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  borderTop: '1px solid #eee',
  paddingTop: '10px'
}

const cancelButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer'
}

const confirmButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
}
