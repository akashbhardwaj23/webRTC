import { useEffect, useState } from "react"
import { BACKEND_URL } from "../lib/config";
import { useLocation } from "react-router-dom";

export function Sender(){
    const location = useLocation();

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const shareVideo = location.state; 
    const [isVideoSent, setIsVideoSent] = useState(false)   
    
    useEffect(() => {
        const socket = new WebSocket(BACKEND_URL);
        socket.onopen = () => {
            console.log("Connected to server");
            socket.send(JSON.stringify({type : "sender"}));
           
        }
        setSocket(socket);
        return () => socket.close();
    }, [])

    async function sendVideo() {
        if(!socket) return;

        const pc = new RTCPeerConnection();
        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.send(JSON.stringify({type : "createOffer", sdp : pc.localDescription}));
        }

        pc.onicecandidate = (event) => {
            if(event.candidate){
                console.log("sending ice candidate ",event)
                socket.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}));
            }
        }

        socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            if(data.type === 'createAnswer'){
                console.log("setting local description sender")
                await pc.setRemoteDescription(data.sdp);
            }
            if(data.type === 'iceCandidate'){
                console.log("setting ice candidates sender")
                pc.addIceCandidate(data.candidate);
            }

        };

        const stream = await navigator.mediaDevices.getDisplayMedia({video : true, audio: false});
        pc.addTrack(stream.getVideoTracks()[0]);
        
        setIsVideoSent(true)
    }


    const sendDisplay = async() => {
         if(!socket) return;

        const pc = new RTCPeerConnection();
        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.send(JSON.stringify({type : "createOffer", sdp : pc.localDescription}));
        }

        pc.onicecandidate = (event) => {
            if(event.candidate){
                console.log("sending ice candidate ",event)
                socket.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}));
            }
        }

        socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            if(data.type === 'createAnswer'){
                console.log("setting local description sender")
                await pc.setRemoteDescription(data.sdp);
            }
            if(data.type === 'iceCandidate'){
                console.log("setting ice candidates sender")
                pc.addIceCandidate(data.candidate);
            }

        };

        const stream = await navigator.mediaDevices.getDisplayMedia({video : true, audio: false});
        pc.addTrack(stream.getVideoTracks()[0]);

        setIsVideoSent(true)
    }


    return (
        <div>
            <h1>Sender</h1>
           {shareVideo ?  <button disabled={isVideoSent} onClick={sendVideo}>{isVideoSent ? "Sending Video" : "Send Video"}</button> : <button disabled={isVideoSent} onClick={sendDisplay}>{isVideoSent ? "Sending Display Media" : "Send Display"}</button>}
        </div>
    )
}