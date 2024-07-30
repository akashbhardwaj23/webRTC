
import './App.css'
import { Receiver } from './components/Receiver'
import { Sender } from './components/Sender'
import {BrowserRouter, Routes, Route} from "react-router-dom";  

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/sender" element = {<Sender/>}/>
          <Route path = "/receiver" element = {<Receiver/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
