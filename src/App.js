import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Add from './Components/AddNotes';
import Login from "./Components/Login";
import Navbar from './Components/Navbar';
import Notes from "./Components/Notes";
import PrivateComponent from "./Components/PrivateComponent";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Updateform from "./Components/Updateform";
function App() {
  return (
    <div className="App">
     
    
      <Router>
      <Navbar />
      <Routes>

        <Route element={<PrivateComponent/>}/>
        <Route path="/add" element={<Add />} />
        <Route path="/notes" element={<Notes />} />
    <Route path="/update/:userid" element={<Updateform/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    
    </div>
  );
}


export default App;
