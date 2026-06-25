import React from "react";
import {io} from "socket.io-client";

const socket = io("https://office-management-backend-7kur.onrender.com", {
  autoConnect: true,
  transports: ["websocket"],
  withCredentials: true
});

export default socket;
