import React from "react";
import { Routes, Route } from "react-router-dom";
//
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";

function App() {

  // const [token,setToken] = useState("");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
