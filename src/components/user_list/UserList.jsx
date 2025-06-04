import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://ngl6xs-3001.csb.app/user/list");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();

        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h1>User List</h1>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <Link to={`/users/${user._id}`} className="user-link">
              <div className="user-avatar">
                <div className="avatar-placeholder">
                  {user.first_name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="user-info">
                <h3 className="user-name">
                  {user.first_name} {user.last_name}
                </h3>
              </div>

              <div className="user-action">View Profile</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
