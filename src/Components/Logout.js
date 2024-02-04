import React,{useEffect, useState, useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = ({setMsgDisplay})=>{
    const navigate = useNavigate()
    const {token, setToken} = useContext(UserContext)
    useEffect(()=>{
        console.log(`token: ${token}`)
    }, [token])
    async function handleLogout(){
        console.log("~~~~~~~~~~~Logout runs~~~~~~~~~~~~~")
        try{
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers: {
                  "Authorization": `Bearer ${token}`
                }
            })

          console.log(`name: ${response.data.data.name} and email: ${response.data.data.email}, ${response.data.message}`)
          setMsgDisplay(response.data.message)
          localStorage.removeItem("token")
          setToken("")
            setTimeout(()=>{
                navigate("/login")
            }, 1200)
        }
        catch(err){
            console.log("Error in logout: ", err.response.data.message)
        }
        console.log("~~~~~~~~~~~Logout completed~~~~~~~~~~~~")

    }

    return (
        <button className="logout__btn" onClick={handleLogout}>Logout</button>
    )
}

export default Logout;
