
import './App.css'
import { Home } from './components/Home';
import { Receiver } from './components/Receiver'
import { Sender } from './components/Sender'
import {BrowserRouter, Routes, Route} from "react-router-dom";  

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path = "/sender" element = {<Sender/>}/>
          <Route path = "/receiver" element = {<Receiver/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
