import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import "../styles/personal.css";
import ConversationBox from "../components/ConversationBox";
import UserProfile from "../components/UserProfile";
import DailyLogModal from "../components/DailyLogModal";
import DailyLogDisplay from "../components/DailyLogDisplay";
import { HAS_LOGGED_TODAY } from "../utils/mutations";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showDailyLogModal, setShowDailyLogModal] = useState(false);
  const navigate = useNavigate();

  const { data: hasLoggedTodayData, loading: hasLoggedLoading } = useQuery(
    HAS_LOGGED_TODAY,
    {
      variables: { userId: user?._id },
      skip: !user?._id,
    }
  );

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

  const handleEmotionUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  // Show daily log modal if user hasn't logged today
  useEffect(() => {
    if (
      user &&
      !hasLoggedLoading &&
      hasLoggedTodayData &&
      !hasLoggedTodayData.hasLoggedToday
    ) {
      setShowDailyLogModal(true);
    }
  }, [user, hasLoggedLoading, hasLoggedTodayData]);

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

      <div className="dashboard-container">
        <div className="profile-section">
          <UserProfile user={user} />
        </div>
        <div className="chat-section">
          {!showChat ? (
            <div className="btn2">
              <button onClick={() => setShowChat(true)}>
                Start Conversation?
              </button>
            </div>
          ) : (
            <ConversationBox onClose={() => setShowChat(false)} />
          )}
        </div>
        <div className="logs-section">
          <DailyLogDisplay userId={user._id} />
        </div>
      </div>

      {showDailyLogModal && (
        <DailyLogModal
          user={user}
          onClose={() => setShowDailyLogModal(false)}
          onEmotionUpdate={handleEmotionUpdate}
        />
      )}
    </>
  );
}

export default Dashboard;
