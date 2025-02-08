import "../styles/personal.css";

function UserProfile({ user }) {
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
          <label>Current Goal:</label>
          <span>{user.userEmotion || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
