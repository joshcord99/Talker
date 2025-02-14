import { useQuery } from "@apollo/client";
import { GET_DAILY_LOGS } from "../utils/mutations";

function DailyLogDisplay({ userId }) {
  const { data, loading, error } = useQuery(GET_DAILY_LOGS, {
    variables: { userId },
    skip: !userId,
  });

  if (loading)
    return <div className="daily-logs-loading">Loading daily logs...</div>;
  if (error)
    return <div className="daily-logs-error">Error loading daily logs</div>;

  const logs = data?.getDailyLogs || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const groupLogsByDay = (logs) => {
    const grouped = {};
    logs.forEach((log) => {
      const dayKey = new Date(log.logDate).toDateString();
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(log);
    });
    return grouped;
  };

  const groupedLogs = groupLogsByDay(logs);

  return (
    <div className="daily-logs-container">
      <h3>Your Daily Emotion Log</h3>
      {logs.length === 0 ? (
        <p className="no-logs">
          No daily logs yet. Start logging your emotions!
        </p>
      ) : (
        <div className="logs-list">
          {Object.entries(groupedLogs).map(([dayKey, dayLogs]) => (
            <div key={dayKey} className="day-group">
              <h4 className="day-heading">
                {getDayOfWeek(dayLogs[0].logDate)}
              </h4>
              {dayLogs.map((log) => (
                <div key={log._id} className="log-item">
                  <div className="log-header">
                    <span className="log-date">{formatDate(log.logDate)}</span>
                    <span className="log-time">{formatTime(log.logDate)}</span>
                  </div>
                  <div className="log-emotion">
                    <strong>Emotion:</strong> {log.emotion}
                  </div>
                  {log.notes && (
                    <div className="log-notes">
                      <strong>Notes:</strong> {log.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyLogDisplay;
