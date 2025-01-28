import { useMutation } from "@apollo/client";
import { aiResponseText } from "../utils/mutations";
import {useState } from "react";

function ConversationBox()
{
    const [Conversation, setConversation] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [sendMessage, data] = useMutation(aiResponseText);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response =  await sendMessage({
            variables: {
             userText: userMessage
            }
          });
          setConversation ([...Conversation, response])
      }
      
  return (
    <>
  <form>
      <label>Enter your name:
        <input
          type="text" 
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onSubmit={handleSubmit}
        />
      </label>
      <input type="submit" />
    </form>

    <div>
        <input></input>
    </div>
    </>
  );
}

export default ConversationBox;
