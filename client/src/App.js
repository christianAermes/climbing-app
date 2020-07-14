import React, {Component} from 'react';
import LoginScreen from './components/Login-Register/LoginScreen'
import RegisterScreen from './components/Login-Register/RegisterScreen'
import Navbar from './components/General/Navbar'
import Sidebar from './components/General/Sidebar'
import OverviewScreen from './components/OverviewScreen/OverviewScreen'
import AddSessionScreen from './components/AddSession/AddSessionScreen'
import SettingsScreen from './components/Settings/SettingsScreen'

import config from "./config"
import {postData} from "./serverRequests"


import './App.css';

const SIDEBAR_HIGHLIGHT_COLOR = "#248499"
const INITIAL_STATE = {
    login:      false,
    register:   false,
    overview:   false,
    addSession: false,
    settings:   !false,

    username: "ich",
    user_id: 8,
    user_settings: {
        boulderGrades: "v",
        routeGrades: "french",
        profile_img: null,
    }, 
    boulderGrades: [],
    routeGrades: [],
    boulderBrackets: [],
    routeBrackets: [],
}


class App extends Component {
    constructor(props) {
        super(props)
        this.state                      = INITIAL_STATE
        this.handleLogin                = this.handleLogin.bind(this)
        this.handleGoToRegister         = this.handleGoToRegister.bind(this)
        this.handleGoBackToLogin        = this.handleGoBackToLogin.bind(this)
        this.handleRegisterSuccess      = this.handleRegisterSuccess.bind(this)
        this.handleLogout               = this.handleLogout.bind(this)
        this.handleChangePageView       = this.handleChangePageView.bind(this)
        this.handleDeleteAccountSuccess = this.handleDeleteAccountSuccess.bind(this)
        this.getUserSettings            = this.getUserSettings.bind(this)
        this.updateUserSettingsAPP      = this.updateUserSettingsAPP.bind(this)
        this.checkIfPasswordValidFormat = this.checkIfPasswordValidFormat.bind(this)
    }    
    
    async handleLogin(e) {
        e.preventDefault()
        let username = document.getElementById("login-username-input")
        let password = document.getElementById("login-password-input")
        let loginData = {username: username.value, password: password.value}
        let data = await postData(`${config.SERVER_ADDRESS}/login`, loginData)
        console.log("Login Data:", data)
        
        if (data.success) {
            await this.getUserSettings(username.value)
            await this.getGrades()
            console.log(`State after login for ${username.value}`, this.state)
            this.setState({
                login: false, 
                overview: true,
                username: username.value,
                // user_settings: data.settings,
                user_id: data.id
            })
            
        } else {
            username.value = ""
            password.value = ""
            if (!username.classList.contains("blinking") && !password.classList.contains("blinking")) {
                username.classList.add("blinking")
                password.classList.add("blinking")
            }
        }
    }
    handleGoToRegister(e) {
        e.preventDefault()
        this.setState({login:false, register: true})
    }
    handleGoBackToLogin(e) {
        e.preventDefault()
        this.setState({login:true, register: false})
    }
    async handleRegisterSuccess(e) {
        e.preventDefault()
        let username        = document.getElementById("register-username")
        let password        = document.getElementById("register-password")
        let passwordConfirm = document.getElementById("register-password-confirm")
        let age             = document.getElementById("register-age")
        let email           = document.getElementById("register-email")
        
        if (username.value !== "" && password.value !== "" && age.value !== "" && email.value !== "") {
            // check if password fulfills requirements
            if (!this.checkIfPasswordValidFormat(password.value)) {
                console.log("Passwords must contain at least one number, one lower case letter, one upper case letter, one special character. Passwords must be at least 8 characters long.")
                return
            }
            // check if passwords match
            if (password.value !== passwordConfirm.value) {
                console.log("Passwords do not match.")
                return
            }
            let registerData = {username: username.value, password: password.value, email: email.value}
            console.log(registerData)
            let data = await postData(`${config.SERVER_ADDRESS}/register`, registerData)
            console.log(data)
            if (data.success) {
                this.setState({login:true, register: false})
            }
        }
    }
    handleDeleteAccountSuccess() {
        document.querySelectorAll(".sidebar button").forEach(btn=>btn.style.background="none")
        this.setState(INITIAL_STATE)
    }
    handleChangePageView(e) {
        // function for sidebar buttons to enable navigation
        // change state of the app to go to the specific page
        document.querySelectorAll(".sidebar button").forEach(btn=>btn.style.background="none")
        e.target.style.background = SIDEBAR_HIGHLIGHT_COLOR
        let newState = {
            overview: false, 
            addSession: false, 
            settings: false}
        const newPage = e.target.id.match(/sidebar-([a-zA-Z]+)-btn/).slice(-1)
        newState[newPage] = true
        this.setState(newState)
    }
    handleLogout() {
        document.querySelectorAll(".sidebar button").forEach(btn=>btn.style.background="none")
        this.setState(INITIAL_STATE)
    }

    async getGrades() {
        
        let boulderSelector = this.state.user_settings.boulderGrades === "fb"? "fra_boulders" : "usa_boulders"
        let boulders = await postData(`${config.SERVER_ADDRESS}/getGrades`, {selector: boulderSelector})

        let routeSelector = this.state.user_settings.routeGrades === "french"? "fra_routes" : "usa_routes"
        let routes = await postData(`${config.SERVER_ADDRESS}/getGrades`, {selector: routeSelector})
        
        this.setState({
            boulderGrades: boulders.grades,
            routeGrades: routes.grades,
            boulderBrackets: boulders.brackets,
            routeBrackets: routes.brackets
        })
    }
    async getUserSettings(username) {
        let res = await postData(`${config.SERVER_ADDRESS}/getUserSettings`, {username: username})
        let settings = res.data[0]
        console.log(settings)
        this.setState({
                user_settings: {
                    boulderGrades: settings.boulderGradeFB? "fb" : settings.boulderGradeV? "v" : "",
                    routeGrades: settings.routesGradeFrench? "french" : settings.routesGradeYDS? "yds" : "",
                }
        })
    }
    updateUserSettingsAPP(settings) {
        this.setState({
            user_settings: {
                boulderGrades: settings.boulderGradeFB? "fb" : settings.boulderGradeV? "v" : "",
                routeGrades: settings.routesGradeFrench? "french" : settings.routesGradeYDS? "yds" : "",
            }
        })
        this.getGrades()
        console.log("User settings in App:", this.state.user_settings)
    }
    checkIfPasswordValidFormat(password) {
        // regex adapted from https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
        if (typeof(password) !== "string") return false
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W|_)([a-zA-Z0-9\W|_]{8,})$/
        // password must contain at least one of: digit, lowerCase, upperCase, specialChar,   be at least 8 chars long
        let match = password.match(passwordRegex)
        return match !== null
    }



    async componentDidMount() {
        this.getGrades()
    }
    
    

    render() {
        let display = <div></div>
        let containerContent = <div></div>
        
        if (this.state.overview) {
            containerContent = <OverviewScreen boulderBrackets={this.state.boulderBrackets} routeBrackets={this.state.routeBrackets} boulderGrades={this.state.boulderGrades} routeGrades={this.state.routeGrades} username={this.state.username}></OverviewScreen>
        } else if (this.state.addSession) {
            containerContent = <AddSessionScreen routeGrades={this.state.routeGrades} boulderGrades={this.state.boulderGrades} user_name={this.state.username} user_id={this.state.user_id} boulderBrackets={this.state.boulderBrackets} routeBrackets={this.state.routeBrackets}></AddSessionScreen>
        } else if (this.state.settings) {
            containerContent = <SettingsScreen checkIfPasswordValidFormat={this.checkIfPasswordValidFormat} settings={this.state.user_settings} username={this.state.username} updateUserSettingsAPP={this.updateUserSettingsAPP} handleDeleteAccountSuccess={this.handleDeleteAccountSuccess}></SettingsScreen>
        }

        if (this.state.login) {
            display = <LoginScreen handleLogin={this.handleLogin} handleGoToRegister={this.handleGoToRegister}></LoginScreen>
        } else if (this.state.register) {
            display = <RegisterScreen handleRegisterSuccess={this.handleRegisterSuccess} handleGoBackToLogin={this.handleGoBackToLogin}></RegisterScreen>
        } else {
            let navbar = <Navbar username={this.state.username}></Navbar>
            let sidebar = <Sidebar 
                        handleChangePageView={this.handleChangePageView} 
                        handleLogout={this.handleLogout}></Sidebar>
            display = <div className="App">
                        {sidebar}
                        {navbar}
                        {containerContent}
                      </div>
        }
        return display
    
    }
}

export default App;






















// let hangboardData = []
//         for (let i=0; i<36; i++) {
//             let point = {x: i, 
//                         "Left": 40*Math.sin(i*Math.PI/50) + 3*Math.random(),
//                         "Right": 48*Math.sin(i*Math.PI/60) + 5*Math.random(),
//                     }
//             hangboardData.push(point)
//         }
//         let hangboardDataKeys = ["Left", "Right"]
//         hangboardData = {data: hangboardData, keys: hangboardDataKeys}
        
//         let leaderboardData = []
//         for (let i=0; i<120; i++) {
//             let point = {x: i, "Rank": 1+Math.floor(5*Math.sin(i*Math.PI/420) + Math.random())}
//             leaderboardData.push(point)
//         }
//         leaderboardData = {data: leaderboardData, keys: ["Rank"]}
