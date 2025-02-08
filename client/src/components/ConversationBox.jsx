import { useMutation } from "@apollo/client";
import { aiResponseText } from "../utils/mutations";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/personal.css";

function ConversationBox() {
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage] = useMutation(aiResponseText);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userMessage.trim()) return;

    const userMsg = { type: "user", text: userMessage, timestamp: new Date() };
    setConversation((prev) => [...prev, userMsg]);
    setUserMessage("");
    setIsLoading(true);

    try {
      const response = await sendMessage({
        variables: {
          userText: userMessage,
        },
      });

      const aiMsg = {
        type: "ai",
        text: response.data.getTherapyResponse.aiResponse,
        timestamp: new Date(),
      };
      setConversation((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = {
        type: "error",
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
      };
      setConversation((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (msg, index) => {
    if (msg.type === "ai") {
      return (
        <div key={index} className={`message ${msg.type}`}>
          <div className="message-content">
            <div className="ai-response">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
            <span className="timestamp">
              {msg.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`message ${msg.type}`}>
        <div className="message-content">
          <p>{msg.text}</p>
          <span className="timestamp">
            {msg.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="conversation-container">
      <div className="chat-messages">
        {conversation.length === 0 && (
          <div className="welcome-message">
            <p>
              Hello! I'm here to help you. Feel free to share what's on your
              mind.
            </p>
          </div>
        )}

        {conversation.map((msg, index) => renderMessage(msg, index))}

        {isLoading && (
          <div className="message ai">
            <div className="message-content">
              <p>Thinking...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="message-input"
        />
        <button
          type="submit"
          disabled={isLoading || !userMessage.trim()}
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ConversationBox;
