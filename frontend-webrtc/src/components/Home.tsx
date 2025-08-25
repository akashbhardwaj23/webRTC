import { useState } from "react";
import { useNavigate } from "react-router-dom"


export function Home(){
    const navigate = useNavigate();
    const [shareVideo, setShareVideo] = useState<"video" | "display">("video")
    
    return <div className="main">
       <div className="home">
        Home
       </div>
      <div style={{display: "flex", flexDirection : "column" , alignItems: "center", gap: "20px"}}>
          <button onClick={() => {
            setShareVideo("display")
            navigate("/sender")
          }}>Share Screen</button>
          <div style={{display : 'flex', justifyContent : "center", gap: "20px"}}>
            <button onClick={() => navigate("/sender", {state : shareVideo})}>
            Sender
        </button>

        <button onClick={() => navigate("/receiver")}>
            Receiver
        </button>
          </div>
      </div>
    </div>
}