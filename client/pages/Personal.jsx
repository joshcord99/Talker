import "../css/personal.css";
import ConversationBox from "../components/ConversationBox";

function Personal() {
  return (
    <>
      <h1>Hello (insert name)</h1>
      <div className="btn2">
        <button>Start Conversation?</button>
        <ConversationBox/>
      </div>
    </>
  );
}

export default Personal;
