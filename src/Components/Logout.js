import React,{useEffect, useState} from "react";
import axios from "axios";

const Logout = ({token, setToken, setMsgDisplay})=>{

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
          setToken(response.data.data.token)

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
