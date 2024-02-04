import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logout from "./Logout";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);
  const [name, setName] = useState("");

  useEffect(()=>{
    if(token == ""){
        //check local storage token is empty or not 
        let localToken = localStorage.getItem("token") // it will be in JSON format
        if(localToken == undefined){
            setTimeout(() => {
                navigate("/login");
              });
        } else {
            setToken(JSON.parse(localToken));
        }
    }
  },[])

  useEffect(() => {
    if(token !== "") getJoke();
  }, [token]);

  useEffect(() => {
    if (token) console.log(`current token: ${token}`);
  }, [token]);
  //
  const [msgDisplay, setMsgDisplay] = useState("");
  //
  async function getJoke() {
    try {
      const response = await axios.get(
        "https://instagram-express-app.vercel.app/api/auth/zuku",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setMsgDisplay(response.data.data.message);
      setName(response.data.data.user.name);
    } catch (err) {
      console.log(err.response.data);
    //   alert("error in api", err.response.data);
    //   setTimeout(() => {
    //     navigate("/login");
    //   });
    }
  }

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button onClick={getJoke}>Click me</button>
      {msgDisplay && <p>{msgDisplay}</p>}
      <Logout setMsgDisplay={setMsgDisplay} />
    </div>
  );
};

export default Dashboard;
