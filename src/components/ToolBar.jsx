import { useNavigate } from "react-router-dom";

export default function ToolBar({ user, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log(user)
    try {
      const response = await fetch("http://localhost:3001/admin/logout", {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigate("/login-register")
      onLogout()
      if (!response.ok) {
        const err = await response.json();
        console.log(err)
        return
      }
      console.log(response)
      navigate("/login-register")
      onLogout()
    } catch (err) {
      console.log("Server error");
    }
  }

  return (
    <div
      style={containerStyle}
    >
      <h3>{user ? `Hi ${user.first_name}` : "Please Login"}</h3>
      {user && (
        <button
          onClick={handleLogout}
          style={buttonStyle}
        >
          Logout
        </button>
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

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#f44336",
  border: "none",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: '20px'
}