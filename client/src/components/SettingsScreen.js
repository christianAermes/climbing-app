import React, {Component} from 'react'
import DefaultProfileImg from '../images/profile200.png'


class SettingsScreen extends Component {
    constructor(props) {
        super(props)

        this.saveSettings = this.saveSettings.bind(this)
    }

    async postData(url, data) {
        const response = await fetch(url, {
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

    componentDidMount() {
        console.log(this.props.settings)
    }

    async saveSettings() {
        let oldPassword        = document.getElementById("settings-old-password")
        let newPassword        = document.getElementById("settings-new-password")
        let newPasswordConfirm = document.getElementById("settings-confirm-new-password")

        let oldEmail           = document.getElementById("settings-new-email")
        let newEmail           = document.getElementById("settings-old-email")

        let boulderGradesFB    = document.getElementById("settings-bouldergrades-fb")
        let boulderGradesV     = document.getElementById("settings-bouldergrades-v")
        
        let routeGradesFrench  = document.getElementById("settings-routegrades-french")
        let routeGradesUIAA    = document.getElementById("settings-routegrades-uiaa")
        let routeGradesYDS     = document.getElementById("settings-routegrades-yds")

        console.log(oldPassword.value)
        console.log(newPassword.value)
        console.log(newPasswordConfirm.value)
        console.log(oldEmail.value)
        console.log(newEmail.value)
        console.log(boulderGradesFB.value)
        console.log(boulderGradesV.value)
        console.log(routeGradesFrench.value)
        console.log(routeGradesUIAA.value)
        console.log(routeGradesYDS.value)

        if (oldPassword.value!=="" && newPassword.value!=="" && newPasswordConfirm.value!=="") {
            if (newPassword.value===newPasswordConfirm.value) {
                console.log("changed password")
            }
        }

        if (oldEmail.value!=="" && newEmail.value!=="") {

        }
        
    }

    async deleteAccount() {

    }


    render() {
        return (
            <div className="main-container">
                <div className="sub-container">
                    <div className="two-col-grid">
                        <img className="profile-img" src={DefaultProfileImg} alt="Profile"/>
                        <div className="login-settings">
                            <div className="settings-block">
                                <input type="password" placeholder="Old Password" id="settings-old-password"></input>
                                <input type="password" placeholder="New Password" id="settings-new-password"></input>
                                <input type="password" placeholder="Repeat New Password" id="settings-confirm-new-password"></input>
                            </div>
                            <div className="settings-block">
                                <input type="email" placeholder="Old email" id="settings-old-email"></input>
                                <input type="email" placeholder="New email" id="settings-new-email"></input>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grade-settings boulder-grades">
                        <p>Grades Boulder</p>
                        <div>
                            <label>Fb
                                <input type="radio" name="boulder" value="fb"  id="settings-bouldergrades-fb" checked={this.props.settings.boulderGrades==="fb"}/>
                            </label>
                        </div>
                        <div>
                            <label>V
                                <input type="radio" name="boulder" value="v" id="settings-bouldergrades-v"/>
                            </label>
                        </div>
                    </div>
                    <div className="grade-settings route-grades">
                        <p>Grades Routes</p>
                        <div>
                            <label>French
                                <input type="radio" name="routes" value="French" id="settings-routegrades-french" defaultChecked/>
                            </label>
                        </div>
                        <div>
                            <label>UIAA
                                <input type="radio" name="routes" value="UIAA" id="settings-routegrades-uiaa"/>
                            </label>
                        </div>
                        <div>
                            <label>YDS
                                <input type="radio" name="routes" value="YDS" id="settings-routegrades-yds"/>
                            </label>
                        </div>
                    </div>
                        <button id="save-settings-changes-btn" onClick={this.saveSettings}>Save changes</button>
                    
                </div>

                <div className="sub-container">
                    <button id="delete-account-btn" onClick={this.deleteAccount}>Delete Account</button>
                </div>
            </div>
        )
    }
}

export default SettingsScreen