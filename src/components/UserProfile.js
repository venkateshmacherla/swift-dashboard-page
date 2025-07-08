import React from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
    if (!user) return null;

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    return (
        <div className="profile-container">
            <h2 className="welcome-message">Welcome, {user.name}</h2>

            <div className="profile-card">
                <div className="profile-header">
                    <span className="profile-avatar">{getInitials(user.name)}</span>
                    <div>
                        <div className="profile-name">{user.name}</div>
                        <div className="profile-email">{user.email}</div>
                    </div>
                </div>

                <div className="profile-details">
                    <div>
                        <label>User ID</label>
                        <input value={user.id} readOnly />
                    </div>
                    <div>
                        <label>Name</label>
                        <input value={user.name} readOnly />
                    </div>
                    <div>
                        <label>Email ID</label>
                        <input value={user.email} readOnly />
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            value={
                                typeof user.address === "object"
                                    ? `${user.address.street}, ${user.address.city}`
                                    : user.address
                            }
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input value={user.phone} readOnly />
                    </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                    <Link to="/comments" className="profile-link-btn">
                        Go to Comments Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;