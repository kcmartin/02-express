"use strict";

const socket = io();
// socket.emit is the opposite of socket.on
socket.emit("chat:add", {
    message: "Blegh"
});
