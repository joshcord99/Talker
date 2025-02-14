import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DAILY_LOG, UPDATE_USER_EMOTION } from "../utils/mutations";

function DailyLogModal({ user, onClose, onEmotionUpdate }) {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [notes, setNotes] = useState("");
  const [createDailyLog] = useMutation(CREATE_DAILY_LOG);
  const [updateUserEmotion] = useMutation(UPDATE_USER_EMOTION);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmotion) {
      alert("Please select how you're feeling today");
      return;
    }

    try {
      console.log("Creating daily log with:", {
        userId: user._id,
        emotion: selectedEmotion,
        notes,
      });

      // Create daily log
      const dailyLogResult = await createDailyLog({
        variables: {
          userId: user._id,
          emotion: selectedEmotion,
          notes: notes,
        },
      });

      console.log("Daily log created successfully:", dailyLogResult);

      // Update user's emotion in database
      const emotionUpdateResult = await updateUserEmotion({
        variables: {
          userId: user._id,
          userEmotion: selectedEmotion,
        },
      });

      console.log("User emotion updated successfully:", emotionUpdateResult);

      // Update local user state
      const updatedUser = { ...user, userEmotion: selectedEmotion };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Call the callback to update parent component
      onEmotionUpdate(updatedUser);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating daily log or updating emotion:", error);
      alert("Failed to save your daily log. Please try again.");
      // Still close the modal even if there's an error
      onClose();
    }
  };

  return (
    <div className="daily-log-overlay" onClick={onClose}>
      <div className="daily-log-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn" type="button">
          ×
        </button>
        <h2>Emotion Check-In, {user.firstName}?</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emotion">Current Emotion:</label>
            <select
              id="emotion"
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="emotion-dropdown"
              required
            >
              <option value="">Select how you're feeling</option>
              {emotions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes (optional):</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any thoughts or feelings you'd like to share..."
              rows="3"
              className="notes-textarea"
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DailyLogModal;
