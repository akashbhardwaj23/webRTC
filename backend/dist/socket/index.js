"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketMessage = handleSocketMessage;
let senderSocket = null;
let receiverSocket = null;
function handleSocketMessage(data, ws) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (data.type) {
            case "sender":
                senderSocket = ws;
                console.log("Sender connected");
                break;
            case "receiver":
                receiverSocket = ws;
                console.log("Receiver connected");
                break;
            case "createOffer":
                if (ws !== senderSocket)
                    return;
                receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "createOffer", sdp: data.sdp }));
                console.log("Create offer sent to receiver");
                break;
            case "createAnswer":
                if (ws !== receiverSocket)
                    return;
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createAnswer", sdp: data.sdp }));
                console.log("Create answer sent to sender");
                break;
            case "iceCandidate":
                if (ws === senderSocket) {
                    receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "iceCandidate", candidate: data.candidate }));
                    console.log("Ice candidate recieved from sender");
                }
                else if (ws === receiverSocket) {
                    senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "iceCandidate", candidate: data.candidate }));
                    console.log("Ice candidate recieved from receiver");
                }
                ;
                break;
        }
    });
}
