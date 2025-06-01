import './Home.css';
import { Outlet } from "react-router-dom";

import UserList from "../user_list/UserList";

const Home = () => {
  return (
    <div className="app-container">

      <div className="main-content">
        <aside className="sidebar">
          <UserList />
        </aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};



export default Home;
