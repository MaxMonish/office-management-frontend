import React, {useEffect, useState, useContext, useRef} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import ChatList from "../../components/Chat/ChatList";
import ChatWindow from "../../components/Chat/ChatWindow";
import axiosInstance from "../../api/axiosConfig";
import socket from "../../socket";
import {AuthContext} from "../../context/AuthContext";

function ChatPage(){
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const {user} = useContext(AuthContext);
  const typingTimeoutRef = useRef(null);
  const selectedUserRef = useRef(null);

  const fetchUsers = async() => {
    try{
      const res = await axiosInstance.get("/chat/users");
      setUsers(res.data);
    }catch(err){
      console.error("Fetch users error:", err.response?.data);
    }
  };

  const fetchMessages = async(userId) => {
    try{
      const res = await axiosInstance.get(`/chat/${userId}`);
      setMessages(res.data);
    }catch(err){
      console.error("Fetch messages error:", err);
    }
  };

  const sendMessage = async(text) => {
    if (!selectedUser) return;
    try{
      const res = await axiosInstance.post("/chat", {receiverId: selectedUser._id, message: text});
      const newMsg = res.data.chat;
      setMessages((prev) => [...prev, newMsg]);
      socket.emit("sendMessage", newMsg);
    }catch(err){
      console.error("Send message error:", err.response?.data || err);
    }
  };

  useEffect(() => {
    if(user){
      socket.emit("join", user._id);
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    const handler = (data) => {
      const currentUser = selectedUserRef.current;
      if (!currentUser?._id) return;
      const senderId = typeof data.sender === "object" ? data.sender?._id : data.sender;
      const receiverId = typeof data.receiver === "object" ? data.receiver?._id : data.receiver;

      if(String(senderId) === String(currentUser._id) || String(receiverId) === String(currentUser._id)){
        setMessages((prev) => {
          if (prev.some((msg) => msg._id === data._id)) return prev;
          return [...prev, data];
        });
      }
    };

    socket.on("receiveMessage", handler);
    socket.on("onlineUsers", (u) => setOnlineUsers(u));
    socket.on("messages_seen", ({ senderId }) => {
      setMessages((prev) => prev.map(msg => {
        if (String(msg.receiver) === String(senderId)) return { ...msg, status: "seen" };
        return msg;
      }));
    });

    return () => {
      socket.off("receiveMessage", handler);
      socket.off("onlineUsers");
      socket.off("messages_seen");
    };
  }, []);

  useEffect(() => {
    socket.on("typing", () => {
      setTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTyping(false), 2000);
    });
    return () => socket.off("typing");
  }, []);

  const selectUser = async(selected) => {
    setSelectedUser(selected);
    setMessages([]);
    setTyping(false);
    await fetchMessages(selected._id);
    socket.emit("seen", selected._id);
  };

  useEffect(() => {
    selectedUserRef.current = selectedUser; 
  }, 
  [selectedUser]);

  return(
  <MainLayout>
    <h1>Company Chat</h1>
    <div className = "chat-container">
      <ChatList users = {users} onlineUsers = {onlineUsers} selectUser = {selectUser} selectedUserId = {selectedUser?._id} />
      <div className = "chat-main">
        {selectedUser ? (
          <>
          <div className = "chat-header">
            <h3>{selectedUser.name}</h3>
          </div>
          <ChatWindow messages = {messages} sendMessage = {sendMessage} selectedUser = {selectedUser} currentUser = {user} typing = {typing} />
          </>
          ) : (
          <div className = "empty-chat"><h3>Select an employee to start chatting</h3></div>
          )}
          </div>
        </div>
      </MainLayout>
    );
  }
  
  export default ChatPage;