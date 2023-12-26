import React,{useState} from "react";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
//
function App() {

  const [token,setToken] = useState("");

  return (
    <div className="App">
      {/* <SignUp setToken = {setToken} /> */}
      <Login setToken = {setToken} />
      <Dashboard token={token} setToken = {setToken}/>
      
    </div>
  );
}

export default App;
