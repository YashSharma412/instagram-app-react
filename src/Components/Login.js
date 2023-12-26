import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({setToken}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [displayMsg, setDisplayMsg] = useState("");

  function updateUserData(e) {
    // let key = e.target.name
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    if(!userData.email || !userData.password){
      setDisplayMsg("Please fill all the input fields")
    }

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      // console.log(response.data)
      console.log("Success! : ", response.data.message);
      console.log("Status : ", response.status);
      setDisplayMsg(`Status ${response.status}: ${response.data.message}`);
      setToken(response.data.data.token)
      setUserData({
        email: "",
        password: "",
      });
    } catch (error) {
      // console.log(error.response.data)
      console.log("Error Occured! : ", error.response.data.message);
      console.log("Status : ", error.response.status);
      setDisplayMsg(
        `Status ${error.response.status}: ${error.response.data.message}`
      );
    }
  }

  return (
    <div className="Login">
      <form className="signUp-form" onSubmit={handleLogin}>
        <h1 className="heading">Log In!</h1>
        {/* <div className="input__group">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={updateUserData}
            value={userData.name}
          />
        </div> */}

        <div className="input__group">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="abc@xyz.com"
            onChange={updateUserData}
            value={userData.email}
          />
        </div>

        <div className="input__group">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter a Password..."
            onChange={updateUserData}
            value={userData.password}
          />
        </div>

        {/* <div className="input__group">
          <label htmlFor="cnfPassword">Confirm Password : </label>
          <input
            type="password"
            id="cnfPassword"
            name="cnfPassword"
            placeholder="Re-enter the password..."
            onChange={updateUserData}
            value={userData.cnfPassword}
          />
        </div> */}
        <button className="heading btn" type="submit">
          Submit
        </button>
        {displayMsg && <h2>{displayMsg}</h2>}
      </form>
    </div>
  );
};

export default Login;
