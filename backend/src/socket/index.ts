import { WebSocket } from "ws"


let senderSocket : WebSocket | null = null;
let receiverSocket : WebSocket | null = null;

export async function handleSocketMessage(data : any, ws: WebSocket){
    switch(data.type){
        case "sender" : senderSocket = ws;
                        console.log("Sender connected");
                        break;
        case "receiver" : receiverSocket = ws;
                        console.log("Receiver connected");
                        break;
        case "createOffer" :  if(ws !== senderSocket) return;
                            receiverSocket?.send(JSON.stringify({type : "createOffer", sdp : data.sdp}));
                            console.log("Create offer sent to receiver");
                            break;
        case "createAnswer" :  if(ws !== receiverSocket) return;
                            senderSocket?.send(JSON.stringify({type : "createAnswer", sdp : data.sdp}));
                            console.log("Create answer sent to sender") ;
                            break;
        case "iceCandidate" : if(ws === senderSocket){
                                    receiverSocket?.send(JSON.stringify({type : "iceCandidate", candidate : data.candidate}));
                                    console.log("Ice candidate recieved from sender")
                                } else if(ws === receiverSocket){
                            senderSocket?.send(JSON.stringify({type : "iceCandidate", candidate : data.candidate}));
                            console.log("Ice candidate recieved from receiver")
                             } ;
                            break;           
    }   
}