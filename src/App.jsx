import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import ToolBar from "./components/ToolBar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/home/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetail from "./components/user_detail/UserDetail";
import UserList from "./components/user_list/UserList";
import UserPhotos from "./components/user_detail/UserPhotos";

export default function App() {
  const [user, setUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const logOut = () => {
    console.log(user)
    setUser(null);
  };

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  return (
    <Router>
      <nav>
      <ToolBar user={user} onLogout={logOut} onUploadSuccess={triggerRefresh} />
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
            <Route path="/users" element={<UserList />} />
            <Route path="/photos/:userId" element={<UserPhotos key={refreshTrigger} />} />
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