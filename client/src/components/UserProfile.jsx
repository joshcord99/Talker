import { useState } from "react";
import { useMutation } from "@apollo/client";
import "../styles/personal.css";

function UserProfile({ user, onEmotionChange }) {
  const emotions = [
    "Happy",
    "Sad",
    "Anxious",
    "Stressed",
    "Excited",
    "Calm",
    "Angry",
    "Confused",
    "Hopeful",
    "Frustrated",
    "Grateful",
    "Lonely",
    "Confident",
    "Overwhelmed",
    "Peaceful",
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="profile-sidebar">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>
      <div className="profile-info">
        <div className="profile-item">
          <label>Name:</label>
          <span>
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : "Not provided"}
          </span>
        </div>
        <div className="profile-item">
          <label>Username:</label>
          <span>{user.username || "Not provided"}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{user.email || "Not provided"}</span>
        </div>
        <div className="profile-item">
          <label>Date of Birth:</label>
          <span>
            {user.dob
              ? new Date(user.dob).toLocaleDateString()
              : "Not provided"}
          </span>
        </div>
        <div className="profile-item">
          <label>Age:</label>
          <span>{user.age || "Not provided"}</span>
        </div>
        <div className="profile-item">
          <label>Gender:</label>
          <span>{user.gender || "Not provided"}</span>
        </div>
        <div className="profile-item">
          <label>Current Emotion:</label>
          <span className="current-emotion">
            {user.userEmotion || "Not set"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
