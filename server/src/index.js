import bcrypt from "bcrypt"
import express from "express"
import cors from "cors"

import all from "./database/selectall"
import userCredentials from "./database/selectUserLogin"
import insertNewUser from "./database/insertNewUser"
import getIndoorSessions from "./database/getIndoorSessions"
import getOutdoorSessions from "./database/getOudoorSessions"

import config from "./config"

const port = config.serverport
const app = express()
app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


app.post("/login", async (request, response) => {
    try {
        let username = request.body.username
        let password = request.body.password

        let loginData = await userCredentials(username)
        
        bcrypt.compare(password, loginData[0].password, (err, res)=>{
            if (err) {
                console.log(err)
                return response.json({success: false, message: "User name or password incorrect."})
            }
            if (res) {
                console.log("Submitted Password is correct")
                return response.json({success: true, message: "Submitted Password is correct."})
            } 
            else {
                console.log("Passwords do not match")
                return response.json({success: false, message: "Passwords do not match."})
            }
        })
        
    } catch (e) {
        console.log("User name or password incorrect.")
        return response.json({success: false, message: "User name or password incorrect."})
    }
})


app.post("/register", async (request, response) => {
    try {
        let username = request.body.username
        let password = request.body.password
        let email = request.body.emails

        let res = await insertNewUser(username, password, email)
        console.log(res)
        return response.json({success: res.success, message: res.message})
    } catch (e) {
        console.log("e")
        return response.json({success: false, message: "An error occured while registering."})
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