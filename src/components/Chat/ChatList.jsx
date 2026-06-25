import React from "react";

const formatLastSeen = (time) => {
  if (!time) return "Offline";
  const date = new Date(time);
  if (isNaN(date.getTime())) return "Offline";
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return date.toLocaleDateString();
};

function ChatList({users, onlineUsers, selectUser, selectedUserId}){
  return(
  <div className = "chat-list">
    <h3>Employees</h3>
    {users.length === 0 && <p>No employees found</p>}
    {users.map((u) => {
      const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(u._id);
      const isActive = selectedUserId === u._id;
      
      return(
      <div key = {u._id} className = {`user-item ${isActive ? "active" : ""}`} onClick = {() => selectUser(u)}>
        <img src = {u.profileImage ? (u.profileImage.startsWith("http") ? u.profileImage : `http://localhost:5000${u.profileImage}`) : "/default-avatar.png"} alt = {u.name} className = "chat-user-avatar"/>
        <div className = "chat-user-info">
          <strong>{u.name}</strong>
          {isOnline ? <span className = "online">🟢 Online</span> : <span className = "offline">Last seen: {formatLastSeen(u.lastSeen)}</span>}
        </div>
      </div>
      );
    })}
  </div>
  );
}

export default ChatList;