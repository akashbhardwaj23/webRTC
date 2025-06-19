import { useEffect, useState } from "react"

export function Sender(){
    const [socket, setSocket] = useState<WebSocket | null>(null);   
    
    useEffect(() => {
        const socket = new WebSocket("wss://webrtc-fz1q.onrender.com");
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
            console.log(event)
            if(event.candidate){
                socket.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}));
            }
        }

        socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            if(data.type === 'createAnswer'){
                await pc.setRemoteDescription(data.sdp);
            }
            if(data.type === 'iceCandidate'){
                pc.addIceCandidate(data.candidate);
            }

        };

        const stream = await navigator.mediaDevices.getUserMedia({video : true, audio: false});
        pc.addTrack(stream.getVideoTracks()[0]);
    }


    return (
        <div>
            <h1>Sender</h1>
            <button onClick={sendVideo}>Send Video</button>
        </div>
    )
}