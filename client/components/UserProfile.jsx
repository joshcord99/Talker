import "../css/personal.css";

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
              : "Willy Wonka"}
          </span>
        </div>
        <div className="profile-item">
          <label>Username:</label>
          <span>{user.username || "chocolate_factory_owner"}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{user.email || "willy@wonkachocolate.com"}</span>
        </div>
        <div className="profile-item">
          <label>Date of Birth:</label>
          <span>
            {user.dob
              ? new Date(user.dob).toLocaleDateString()
              : "October 10, 1932"}
          </span>
        </div>
        <div className="profile-item">
          <label>Age:</label>
          <span>{user.age || "91"}</span>
        </div>
        <div className="profile-item">
          <label>Gender:</label>
          <span>{user.gender || "Male"}</span>
        </div>
        <div className="profile-item">
          <label>Current Goal:</label>
          <span>{user.userEmotion || "Spreading joy through chocolate"}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
