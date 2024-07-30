"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = require("http");
const socket_1 = require("./socket");
const server = (0, http_1.createServer)();
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (ws) => {
    ws.on("error", console.error);
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        (0, socket_1.handleSocketMessage)(data, ws);
        // if(data.type === "sender") {
        //     senderSocket = ws;
        //     console.log("Sender connected");
        // } else if(data.type === "receiver") {
        //     receiverSocket = ws;
        //     console.log("Receiver connected");
        // }
        // else if(data.type === "createOffer"){
        //     if(ws !== senderSocket) return;
        //     receiverSocket?.send(JSON.stringify({type : "createOffer", sdp : data.sdp}));
        //     console.log("Create offer sent to receiver")
        // }
        // else if(data.type === "createAnswer"){
        //     if(ws !== receiverSocket) return;
        //     senderSocket?.send(JSON.stringify({type : "createAnswer", sdp : data.sdp}));
        //     console.log("Create answer sent to sender")
        // } else if(data.type === "iceCandidate"){
        //     if(ws === senderSocket){
        //         receiverSocket?.send(JSON.stringify({type : "iceCandidate", candidate : data.candidate}));
        //         console.log("Ice candidate recieved from sender")
        //     } else if(ws === receiverSocket){
        //         senderSocket?.send(JSON.stringify({type : "iceCandidate", candidate : data.candidate}));
        //         console.log("Ice candidate recieved from receiver")
        //     }
        // }
    });
    ws.on("close", (code, reason) => {
        const jsonData = reason.toString();
        console.log(jsonData);
        // const data = JSON.parse(jsonData)
        //@ts-ignore
        // const reasonData = JSON.parse(reason.toString());
        console.log("Code id ", code + " Reason is ", jsonData);
    });
});
server.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});
