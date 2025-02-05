import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/personal.css";
import ConversationBox from "../components/ConversationBox";
import UserProfile from "../components/UserProfile";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="welcome-section">
        <h1>
          Welcome {user.firstName} {user.lastName}
        </h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-layout">
        <UserProfile user={user} />
        <div className="main-content">
          {!showChat ? (
            <div className="btn2">
              <button onClick={() => setShowChat(true)}>
                Start Conversation?
              </button>
            </div>
          ) : (
            <ConversationBox />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
