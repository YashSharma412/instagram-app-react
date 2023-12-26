import React, { useState, useEffect } from "react";
import axios from "axios";

const SignUp = ({setToken}) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const [displayMsg, setDisplayMsg] = useState("");

  function updateUserData(e) {
    // let key = e.target.name
    setUserData({ ...userData, [e.target.name]: e.target.value.trim() });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if(!userData.name || !userData.email || !userData.password || !userData.cnfPassword ){
      setDisplayMsg("Please fill all the fields completely")
      return;
    }

    if(userData.password !== userData.cnfPassword){
      setDisplayMsg("Password and confirm passwords do not match")
      return;
    }
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        {
          name: userData.name,
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
        name: "",
        email: "",
        password: "",
        cnfPassword: "",
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
    <div className="signUp">
      <form className="signUp-form" onSubmit={handleSignUp}>
        <h1 className="heading">Sign Up!</h1>
        <div className="input__group">
          <label htmlFor="name_signUp">Name : </label>
          <input
            type="text"
            id="name_signUp"
            name="name"
            placeholder="Enter your name"
            onChange={updateUserData}
            value={userData.name}
          />
        </div>

        <div className="input__group">
          <label htmlFor="email_signUp">Email : </label>
          <input
            type="email"
            id="email_signUp"
            name="email"
            placeholder="abc@xyz.com"
            onChange={updateUserData}
            value={userData.email}
          />
        </div>

        <div className="input__group">
          <label htmlFor="password_signUp">Password : </label>
          <input
            type="password"
            id="password_signUp"
            name="password"
            placeholder="Enter a Password..."
            onChange={updateUserData}
            value={userData.password}
          />
        </div>

        <div className="input__group">
          <label htmlFor="cnfPassword_signUp">Confirm Password : </label>
          <input
            type="password"
            id="cnfPassword_signUp"
            name="cnfPassword"
            placeholder="Re-enter the password..."
            onChange={updateUserData}
            value={userData.cnfPassword}
          />
        </div>
        <button className="heading btn" type="submit">
          Submit
        </button>
        {displayMsg && <h2>{displayMsg}</h2>}
      </form>
    </div>
  );
};

export default SignUp;
