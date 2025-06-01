import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import ToolBar from "./components/ToolBar";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetail from "./components/user_detail/UserDetail";

export default function App() {
  const [user, setUser] = useState(null);

  const logOut = () => {
    console.log(user)
    setUser(null);
  };
  return (
    <Router>
      <nav>
        <ToolBar user={user} onLogout={logOut} />
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }>
            <Route path="users/:userId" element={<UserDetail />} />
            <Route index element={<WelcomeMessage />} />
        </Route>
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/login" element={<Login onLogin={setUser}/>}/>
        <Route path="/register" element={<Register onRegister={setUser}/>}/>
      </Routes>
    </Router>
  );
}

const WelcomeMessage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%',
      color: '#666',
      fontSize: '18px'
    }}>
      <p>Click an user for detail</p>
    </div>
  );
};