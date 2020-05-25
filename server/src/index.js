import bcrypt from "bcrypt"
import express from "express"
import cors from "cors"

import userCredentials from "./database/userLogin"
import insertNewUser from "./database/insertNewUser"
import getIndoorSessions from "./database/getIndoorSessions"
import getOutdoorSessions from "./database/getOudoorSessions"
import selectUserSettings from "./database/getUserSettings"
import getGrades from "./database/getGrades"
import updateUserSettings from "./database/updateUserSettings"
import deleteUser from "./database/deleteUser"


import config from "./config"

const port = config.serverport
const app = express()
app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


app.post("/login", async (request, response) => {
    console.log(request.body)
    try {
        let username = request.body.username
        let password = request.body.password

        let loginData = await userCredentials(username)
        console.log("Login Data:", loginData[0])
        if (loginData.length === 1) {
            let data = loginData[0]
            bcrypt.compare(password, data.password, (err, res)=>{
                if (err) {
                    console.log(err)
                    return response.json({success: false, message: "User name or password incorrect."})
                }
                if (res) {
                    console.log("Submitted Password is correct")
                    // return response.json({success: true, message: "Submitted Password is correct.", settings: settings, id: data.idusers})
                    return response.json({success: true, message: "Submitted Password is correct.", id: data.idusers})
                } 
                else {
                    console.log("Passwords do not match")
                    return response.json({success: false, message: "Passwords do not match."})
                }
            })
        } else {
            console.log("No user with that username found.")
            return response.json({success: false, message: "No user with that username found."})
        }
        
        
    } catch (e) {
        console.log("Another error occured.")
        console.log(e)
        return response.json({success: false, message: "An error occured during login."})
    }
})


app.post("/register", async (request, response) => {
    try {
        let username = request.body.username
        let password = request.body.password
        let email = request.body.email

        let res = await insertNewUser(username, password, email)
        console.log(res)
        return response.json({success: res.success, message: res.message})
    } catch (e) {
        console.log("e")
        return response.json({success: false, message: "An error occured while registering."})
    }
})

app.post("/getIndoorSessions", async (request, response) => {
    try {
        let username = request.body.username
        let res = await getIndoorSessions(username)
        
        return response.json({success: true, data: res})
    } catch (e) {
        console.log(e)
        return response.json({success: false, data: []})
    }
})

app.post("/getOutdoorSessions", async (request, response) => {
    try {
        let username = request.body.username
        let res = await getOutdoorSessions(username)
        
        return response.json({success: true, data: res})
    } catch (e) {
        console.log(e)
        return response.json({success: false, data: []})
    }
})

app.post("/getUserSettings", async (request, response) => {
    try {
        let username = request.body.username
        let res = await selectUserSettings(username)

        console.log(res)
        return response.json({success:true, data: res})
    } catch (e) {
        console.log(e)
    }
})

app.post("/getGrades", async (request, response) => {
    try {
        let grades = await getGrades()
        return response.json({success: true, grades: grades});
    } catch (e) {
        console.log(e)
        return response.json({success: false, grades: []});
    }
})

app.post("/updateUserSettings", async (request, response) => {
    try {
        let settings = request.body.settings
        let username = request.body.username
        let res = await updateUserSettings(settings, username)
        return response.json({success: true, settings: settings})
    } catch (e) {
        console.log(e)
    }
})

app.post("/deleteUser", async (request, response) => {
    try {
        let username = request.body.username
        let res = await deleteUser(username)
        console.log(res)
        return response.json({success: true, data: res})
    } catch (e) {
        console.log(e)
    }
})







import {createDummyDataIndoor, createDummyDataOutdoor} from "./createDummyData"

app.get("/insert", async (request, response) => {
    try {
        // createDummyDataIndoor()
        createDummyDataOutdoor()
    } catch (e) {
        console.log(e)
    }
    
})