import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { fetchUsers } from "./api/dummyUsers";
import UserProfile from "./components/UserProfile";
import CommentsDashboard from "./components/CommentsDashboard";
import "./App.css";

import logo from './assets/swift-logo.png';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((users) => setUser(users[0]));
  }, []);

  if (!user) return <div className="loading">Loading user data...</div>;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "8px" }} />
          </Link>
        </div>

        <div className="navbar-user">
          <span className="navbar-avatar">{getInitials(user.name)}</span>
          <span>{user.name}</span>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<UserProfile user={user} />} />
          <Route path="/comments" element={<CommentsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;