import { useNavigate } from "react-router-dom"


export function Home(){
    const navigate = useNavigate();
    
    return <div className="main">
       <div className="home">
        Home
       </div>
        <button onClick={() => navigate("/sender")}>
            Sender
        </button>

        <button onClick={() => navigate("/receiver")}>
            Receiver
        </button>
    </div>
}