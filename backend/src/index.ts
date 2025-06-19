import { WebSocketServer, WebSocket } from "ws";
import {createServer} from "http";
import { handleSocketMessage } from "./socket";

const server = createServer();
const wss = new WebSocketServer({ server });


wss.on('connection', (ws : WebSocket) => {
    ws.on("error" , console.error);

    ws.on('message', (message: string) => {
        const data = JSON.parse(message);

        handleSocketMessage(data, ws);
        
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

    })

    ws.on("close", (code, reason) => {
        const jsonData = reason.toJSON();
        //@ts-ignore
        // const reasonData = JSON.parse(reason.toString());
        console.log("Code id ", code + " Reason is ", jsonData)
    })
})





const PORT = process.env.PORT || 8080;

// Important for render because it cause 
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})