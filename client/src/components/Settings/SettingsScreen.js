import React, {Component} from 'react'
import DefaultProfileImg from '../../images/profile200.png'

import {postData} from "../../serverRequests"

class DeleteAccountPopUp extends Component {
    componentDidMount() {
        window.scrollTo(0,0)
    }
    
    render() {
        return (
            <div className="popup-background">
                <div className="delete-account-message-container sub-container">
                    <button id="close-delete-account-popup-btn" onClick={this.props.closePopUpWindow}></button>
                    <p>
                        Are you sure you want to delete your account? This action cannot be undone.
                        If you still want to proceed, please enter your password and click the "Confirm"
                        button below.
                    </p>
                    <input type="password" id="delete-account-password-input"></input>
                    <button id="confirm-delete-account-btn" onClick={this.props.confirmDeleteAccount}>Confirm</button>
                </div>
            </div>
        )
    }
}

class SaveSettingsConfirmationPopup extends Component {
    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {
        return (
            <div className="popup-background">
                <div className="saved-changes-message-container sub-container">
                    <p>
                        Saved Changes.
                    </p>
                </div>
            </div>
        )
    }
}

class SettingsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fra_boulders: this.props.settings.boulderGrades === "fb",
            fra_routes:   this.props.settings.routeGrades === "french",
            usa_boulders: this.props.settings.boulderGrades === "v",
            usa_routes:   this.props.settings.routeGrades ==="yds",

            id: this.props.id,
            username: this.props.username,
            showPopUpWindowDELETE: false,
            showPopUpWindowCONFIRM_CHANGES: false,
        }

        this.saveGradeSettings        = this.saveGradeSettings.bind(this)
        this.savePasswordSettings     = this.savePasswordSettings.bind(this)
        this.saveSettings             = this.saveSettings.bind(this)
        this.handleBoulderGradeChange = this.handleBoulderGradeChange.bind(this)
        this.handleRouteGradeChange   = this.handleRouteGradeChange.bind(this)
        this.deleteAccount            = this.deleteAccount.bind(this)
        this.closePopUpWindow         = this.closePopUpWindow.bind(this)
        this.confirmDeleteAccount     = this.confirmDeleteAccount.bind(this)
    }

    getUserSettings() {
        postData("http://localhost:8000/getUserSettings", {username: this.props.username}).then((res)=>{
            let settings = res.data[0]
            console.log("PREVIOUS SETTINGS FROM DB", settings)
            this.setState({
                fra_boulders: settings.boulderGradeFB,//? "fb" : "",
                fra_routes: settings.routesGradeFrench,//? "french" : "",
                usa_boulders: settings.boulderGradeV,//? "v" : "",
                usa_routes: settings.routesGradeYDS,//? "yds" : "",

            })
        })
    }

    componentDidMount() {
        this.getUserSettings()
    }

    async savePasswordSettings() {
        let oldPassword        = document.getElementById("settings-old-password")
        let newPassword        = document.getElementById("settings-new-password")
        let newPasswordConfirm = document.getElementById("settings-confirm-new-password")

        if (oldPassword.value!=="" && newPassword.value!=="" && newPasswordConfirm.value!=="") {
            if (!this.props.checkIfPasswordValidFormat(newPassword.value)) {
                console.log("Passwords must contain at least one number, one lower case letter, one upper case letter, one special character. Passwords must be at least 8 characters long.")
                return
            }
            if (!newPassword.value===newPasswordConfirm.value) {
                console.log("Passwords do not match.")
                return
            }
            console.log("Password changed.")
        }

        

    }

    async saveGradeSettings() {
        // let oldEmail           = document.getElementById("settings-new-email")
        // let newEmail           = document.getElementById("settings-old-email")
        // if (oldEmail.value!=="" && newEmail.value!=="") {
        //     console.log("Send confirmation email")
        // }
        let gradeSettings = {
            boulderGradeFB: this.state.fra_boulders,
            boulderGradeV: this.state.usa_boulders,
            routesGradeFrench: this.state.fra_routes,
            routesGradeYDS: this.state.usa_routes,
        }

        let res = await postData("http://localhost:8000/updateUserSettings", {settings: gradeSettings, username: this.state.username})
        this.props.updateUserSettingsAPP(res.settings)
        
    }

    async saveSettings() {
        await this.savePasswordSettings()
        await this.saveGradeSettings()

        this.setState({showPopUpWindowCONFIRM_CHANGES: true})
        setTimeout(()=>{
            this.setState({showPopUpWindowCONFIRM_CHANGES: false})
        }, 1500)
    }

    deleteAccount() {
        this.setState({showPopUpWindowDELETE: true})
    }
    async confirmDeleteAccount() {
        // check password
        let username = this.state.username
        let password = document.getElementById("delete-account-password-input")
        let loginData = {username: username, password: password.value}
        let data = await postData("http://localhost:8000/login", loginData)
        console.log("Login Data:", data)
        if (data.success) {
            let res = await postData("http://localhost:8000/deleteUser", {username: username})
            console.log(res.success)
            this.props.handleDeleteAccountSuccess()
        } else {
            password.value = ""
            if (!password.classList.contains("blinking")) {
                password.classList.add("blinking")
            }
        }
    }
    closePopUpWindow() {
        this.setState({showPopUpWindowDELETE: false, showPopUpWindowCONFIRM_CHANGES: false})
    }

    handleBoulderGradeChange(e) {
        let newBoulderGrade = e.target.value
        this.setState({
            fra_boulders: newBoulderGrade === "fb",
            usa_boulders: newBoulderGrade === "v"
        })
    }
    handleRouteGradeChange(e) {
        let newRouteGrade = e.target.value
        this.setState({
            fra_routes: newRouteGrade === "french",
            usa_routes: newRouteGrade === "yds"
        })
    }


    render() {
        let popupWindowCONFIRM_CHANGES = this.state.showPopUpWindowCONFIRM_CHANGES? <SaveSettingsConfirmationPopup closePopUpWindow={this.closePopUpWindow}></SaveSettingsConfirmationPopup> : <div></div>
        let popupWindowDELETE = this.state.showPopUpWindowDELETE? <DeleteAccountPopUp closePopUpWindow={this.closePopUpWindow} confirmDeleteAccount={this.confirmDeleteAccount}></DeleteAccountPopUp> : <div></div>
        return (
            <div className="main-container">
                {popupWindowDELETE}
                {popupWindowCONFIRM_CHANGES}
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
                                <input type="radio" name="boulder" value="fb"  id="settings-bouldergrades-fb" checked={this.state.fra_boulders} onChange={this.handleBoulderGradeChange}/>
                                {/* <input type="radio" name="boulder" value="fb"  id="settings-bouldergrades-fb" checked={this.props.settings.boulderGrades === "fb"} onChange={this.handleBoulderGradeChange}/> */}
                            </label>
                        </div>
                        <div>
                            <label>V
                                <input type="radio" name="boulder" value="v" id="settings-bouldergrades-v" checked={this.state.usa_boulders} onChange={this.handleBoulderGradeChange}/>
                                {/* <input type="radio" name="boulder" value="v" id="settings-bouldergrades-v" checked={this.props.settings.boulderGrades === "v"} onChange={this.handleBoulderGradeChange}/> */}
                            </label>
                        </div>
                    </div>
                    <div className="grade-settings route-grades">
                        <p>Grades Routes</p>
                        <div>
                            <label>French
                                <input type="radio" name="routes" value="french" id="settings-routegrades-french" checked={this.state.fra_routes} onChange={this.handleRouteGradeChange}/>
                                {/* <input type="radio" name="routes" value="french" id="settings-routegrades-french" checked={this.props.settings.routeGrades === "french"} onChange={this.handleRouteGradeChange}/> */}
                            </label>
                        </div>
                        <div>
                            <label>YDS
                                <input type="radio" name="routes" value="yds" id="settings-routegrades-yds" checked={this.state.usa_routes} onChange={this.handleRouteGradeChange}/>
                                {/* <input type="radio" name="routes" value="yds" id="settings-routegrades-yds" checked={this.props.settings.routeGrades === "yds"} onChange={this.handleRouteGradeChange}/> */}
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