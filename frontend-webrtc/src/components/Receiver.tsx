import { useEffect, useRef } from "react";


export function Receiver(){
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
            console.log("Connected to server");
            socket.send(JSON.stringify({type : "receiver"}));
        }

        let pc  = new RTCPeerConnection();
        socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            // let pc : RTCPeerConnection | null;
            if(data.type === 'createOffer'){
                // pc = new RTCPeerConnection()
               

                pc.ontrack = (event) => {
                    console.log("Track Received")
                    console.log(event);
                    if(videoRef.current){
                        videoRef.current.srcObject = new MediaStream([event.track])
                    }
                }

                pc.onicecandidate = (event) => {
                    if(event.candidate){
                        socket?.send(JSON.stringify({type : "iceCandidate", candidate: event.candidate}))
                    }
                }


                await pc.setRemoteDescription(data.sdp);

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket?.send(JSON.stringify({type:"createAnswer", sdp : pc.localDescription}));
            } else if(data.type === "iceCandidate"){
                console.log("Ice candidate Received")
                console.log(data.candidate)
                //@ts-ignore
                await pc?.addIceCandidate(data.candidate);
            }
        }
    }, [])



    return (
        <div>
            <h1>Receiver</h1>
            <video autoPlay ref = {videoRef}></video>
        </div>
    )
}