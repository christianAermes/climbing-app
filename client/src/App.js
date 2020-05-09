import React, {Component} from 'react';
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OverviewScreen from './components/OverviewScreen'
import AddSessionScreen from './components/AddSessionScreen'
import SettingsScreen from './components/SettingsScreen'



import './App.css';

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { apiResponse: null }
//         this.postLoginData = this.postLoginData.bind(this)
//     }

//     async postLoginData(username, password) {
//         let data = {username: username, password: password}
//         const response = await fetch("http://localhost:8000/login", {
//                                         method: "POST",
//                                         mode: "cors",
//                                         cache: "no-cache",
//                                         credentials: "same-origin",
//                                         headers: {
//                                             "Content-Type": "application/json"
//                                         },
//                                         redirect: "follow",
//                                         referrerPolicy: "no-referrer",
//                                         body: JSON.stringify(data)
//         })
//         return response.json()

//     }

//     componentDidMount() {
//         // this.callAPI()
//         // this.postLoginData("Christian", "rammstein").then(data=>{console.log(data)})
        
//         this.postLoginData("Christian", "rammstein")
//                 .then(data=>{
//                     console.log(data)
//                     this.setState({apiResponse: data.message})
//                 })
        
//     }

//     render() {
        
//         return (
//             <p>{this.state.apiResponse}</p>
//         )
//     }



// }
// export default App

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: !true,
            register: false,
            overview: !false,
            addSession: false,
            settings: false,

            username: "Christian"
        }
        this.handleLogin           = this.handleLogin.bind(this)
        this.handleRegister        = this.handleRegister.bind(this)
        this.handleRegisterSuccess = this.handleRegisterSuccess.bind(this)
        this.handleLogout          = this.handleLogout.bind(this)
        this.handleGoToOverview    = this.handleGoToOverview.bind(this)
        this.handleAddSession      = this.handleAddSession.bind(this)
        this.handleGoToSettings    = this.handleGoToSettings.bind(this)

        this.postLoginData = this.postLoginData.bind(this)
        this.postRegisterData = this.postRegisterData.bind(this)
    }

    async postLoginData(username, password) {
        let data = {username: username, password: password}
        const response = await fetch("http://localhost:8000/login", {
                                        method: "POST",
                                        mode: "cors",
                                        cache: "no-cache",
                                        credentials: "same-origin",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        redirect: "follow",
                                        referrerPolicy: "no-referrer",
                                        body: JSON.stringify(data)
        })
        return response.json()
    }

    async postRegisterData(username, password, email) {
        let data = {username: username, password: password, email: email}
        const response = await fetch("http://localhost:8000/register", {
                                        method: "POST",
                                        mode: "cors",
                                        cache: "no-cache",
                                        credentials: "same-origin",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        redirect: "follow",
                                        referrerPolicy: "no-referrer",
                                        body: JSON.stringify(data)
        })
        return response.json()
    }
    
    
    handleLogin(e) {
        e.preventDefault()
        let username = document.getElementById("login-username-input")
        let password = document.getElementById("login-password-input")
        this.postLoginData(username.value, password.value).then(data=>{
            console.log(data)
            let correctCredentials = data.success
            if (correctCredentials) {
                this.setState({login: false, overview:true, username: username.value})
                if (username.classList.contains("blinking") && password.classList.contains("blinking")) {
                    username.classList.remove("blinking")
                    password.classList.remove("blinking")
                }
            } else {
                username.value = ""
                password.value = ""
                if (!username.classList.contains("blinking") && !password.classList.contains("blinking")) {
                    username.classList.add("blinking")
                    password.classList.add("blinking")
                }
            }
        })
    }
    handleRegister(e) {
        e.preventDefault()
        this.setState({login:false, register: true})
    }
    handleRegisterSuccess(e) {
        e.preventDefault()
        let username = document.getElementById("register-username")
        let password = document.getElementById("register-password")
        let passwordConfirm = document.getElementById("register-password-confirm")
        let age = document.getElementById("register-age")
        let email = document.getElementById("register-email")

        if (username.value !== "" && password.value !== "" && age.value !== "" && email.value !== "") {
            // check if passwords match
            if (password.value === passwordConfirm.value) {
                this.postRegisterData(username.value, password.value, email.value).then(data=>{
                    console.log(data)
                    if (data.success) {
                        this.setState({login:true, register: false})
                    }
                })
            }
        }
        // this.setState({login:true, register: false})
    }
    handleGoToOverview(e) {
        document.querySelectorAll(".sidebar button").forEach(btn=>btn.style.background="none")
        e.target.style.background = "#248499"
        if (!this.state.overview) {
            this.setState({login: false,
                register: false,
                overview: true,
                addSession: false,
                settings: false,
            })
        }
    }
    handleAddSession(e) {
        document.querySelectorAll(".sidebar button").forEach(btn=>btn.style.background="none")
        e.target.style.background = "#248499"
        if (!this.state.addSession) {
            this.setState({login: false,
                register: false,
                overview: false,
                addSession: true,
                settings: false,
            })
        }
    }
    handleGoToSettings(e) {
        document.querySelectorAll(".sidebar button").forEach(btn=>btn.style.background="none")
        e.target.style.background = "#248499"
        if (!this.state.setting) {
            this.setState({login: false,
                register: false,
                overview: false,
                addSession: false,
                settings: true,
            })
        }
        
    }
    handleLogout() {
        this.setState({login:true, username: ""})
    }

    
    

    render() {
        let indoorData = []
        for (let i=0; i<120; i++) {
            let point = {x: i, 
                        "Max Grade": Math.log(1+i) + Math.random(),
                        "Avg Grade": 0.75*Math.log(1+i) + 0.5*Math.random(),
                    }
            indoorData.push(point)
        }
        let indoorDataKeys = ["Max Grade", "Avg Grade"]
        indoorData = {data: indoorData, keys: indoorDataKeys}

        let outdoorData = []
        for (let i=0; i<12; i++) {
            let point = {x: i*i, 
                        "Max Grade": i+1 + Math.random(),
                        "Avg Grade": 0.5*(i+1 + Math.random())
                    }
            outdoorData.push(point)
        }
        let outdoorDataKeys = ["Max Grade", "Avg Grade"]
        outdoorData = {data: outdoorData, keys:outdoorDataKeys}

        let hangboardData = []
        for (let i=0; i<36; i++) {
            let point = {x: i, 
                        "Left": 40*Math.sin(i*Math.PI/50) + 3*Math.random(),
                        "Right": 48*Math.sin(i*Math.PI/60) + 5*Math.random(),
                    }
            hangboardData.push(point)
        }
        let hangboardDataKeys = ["Left", "Right"]
        hangboardData = {data: hangboardData, keys: hangboardDataKeys}
        
        let leaderboardData = []
        for (let i=0; i<120; i++) {
            let point = {x: i, "Rank": 1+Math.floor(5*Math.sin(i*Math.PI/420) + Math.random())}
            leaderboardData.push(point)
        }
        leaderboardData = {data: leaderboardData, keys: ["Rank"]}

        let navbar = <Navbar username={this.state.username}></Navbar>
        let sidebar = <Sidebar 
                        handleGoToOverview={this.handleGoToOverview}
                        handleAddSession = {this.handleAddSession}
                        handleGoToSettings={this.handleGoToSettings}
                        handleLogout={this.handleLogout}
                        >
                    </Sidebar>
        
        if (this.state.login) {
            return <LoginScreen handleLogin={this.handleLogin} handleRegister={this.handleRegister}></LoginScreen>
        } else if (this.state.register) {
            return <RegisterScreen handleRegisterSuccess={this.handleRegisterSuccess}></RegisterScreen>
        } else if (this.state.overview) {
            return (
                <div className="App">
                {sidebar}
                {navbar}
                <OverviewScreen
                        username={this.state.username}
                        indoorData={indoorData}
                        outdoorData={outdoorData}
                        hangboardData={hangboardData}
                        leaderboardData={leaderboardData}
                        ></OverviewScreen>
                </div>
            )
        } else if (this.state.addSession) {
            return (
                <div className="App">
                    {sidebar}
                    {navbar}
                    <AddSessionScreen></AddSessionScreen>
                </div>
            )
        }
        
        else if (this.state.settings) {
            return (
                <div className="App">
                    {sidebar}
                    {navbar}
                    <SettingsScreen></SettingsScreen>
                </div>
            )
        }
    
    }
}

export default App;
