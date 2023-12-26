import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "./Logout";

const Dashboard = ({token, setToken})=>{
    useEffect(()=>{
        if(token) console.log(`current token: ${token}`)
    },[token])
    // 
    const [msgDisplay, setMsgDisplay] = useState("")
    // 
    async function getJoke(){
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        console.log(response.data)
        setMsgDisplay(response.data.data.message)

        } catch(err){
            console.log(err.response.data)
        }
    }

    return (
        <div>
            <h1>DashBooard</h1>
            <button onClick={getJoke}>Click me</button>
            {
               msgDisplay && <p>{msgDisplay}</p> 
            }
            <Logout token={token} setToken={setToken} setMsgDisplay={setMsgDisplay} />
        </div>
    )
}

export default Dashboard;
