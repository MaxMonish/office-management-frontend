import React, {useState, useEffect, useRef} from "react";
import socket from "../../socket";

function ChatWindow({messages, sendMessage, selectedUser, currentUser, typing}){
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const handleTyping = (e) => {
    setText(e.target.value);
    if (!selectedUser || !currentUser) return;
    socket.emit("typing", {
      sender: currentUser._id,
      receiver: selectedUser._id
    });
  };

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return(
  <div className = "chat-window">
    <div className = "messages">
      {messages.length === 0 ? (
          <p className="no-msg">No messages yet. Start chatting with {selectedUser?.name} 👋</p>
        ) : (
          messages.map((msg) => {
            if (!msg) return null;
            const senderId = typeof msg.sender === "object" ? msg.sender?._id : msg.sender;
            const isMyMessage = String(senderId) === String(currentUser?._id);

            return(
            <div key = {msg._id} className = {isMyMessage ? "message sent" : "message received"}>
              <b>{isMyMessage ? "You" : (msg.sender?.name || selectedUser?.name)}:</b>
              <span> {msg.message}</span>
              {isMyMessage && (
                <span className = "msg-status">
                  {msg.status === "seen" ? " ✔✔" : " ✔"}
                </span>
              )}
            </div>
          );
        })
      )}
    <div ref = {messagesEndRef}></div>
    </div>
    <div className = "chat-input">
      {typing && <div className = "typing-indicator">{selectedUser?.name} is typing...</div>}
      <div className = "input-row">
        <input type = "text" placeholder = "Type message..." value={text} onChange = {handleTyping} onKeyDown = {handleKeyDown} />
        <button onClick = {handleSend} disabled = {!text.trim()}>Send</button>
      </div>
    </div>
  </div>
  );
}

export default ChatWindow;

