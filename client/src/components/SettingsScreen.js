import React, {Component} from 'react'
import DefaultProfileImg from '../images/profile200.png'


class SettingsScreen extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="sub-container">
                    <div className="two-col-grid">
                        <img className="profile-img" src={DefaultProfileImg} alt="Profile"/>
                        <div className="login-settings">
                            <div className="settings-block">
                                <input type="password" placeholder="Old Password"></input>
                                <input type="password" placeholder="New Password"></input>
                                <input type="password" placeholder="Repeat New Password"></input>
                            </div>
                            <div className="settings-block">
                                <input type="email" placeholder="Old email"></input>
                                <input type="email" placeholder="New email"></input>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grade-settings boulder-grades">
                        <p>Grades Boulder</p>
                        <div>
                            <label>Fb
                                <input type="radio" id="font" name="boulder" value="font" defaultChecked/>
                            </label>
                        </div>
                        <div>
                            <label>V
                                <input type="radio" id="V" name="boulder" value="V"/>
                            </label>
                        </div>
                    </div>
                    <div className="grade-settings route-grades">
                        <p>Grades Routes</p>
                        <div>
                            <label>French
                                <input type="radio" id="french" name="routes" value="french" defaultChecked/>
                            </label>
                        </div>
                        <div>
                            <label>UIAA
                                <input type="radio" id="UIAA" name="routes" value="UIAA"/>
                            </label>
                        </div>
                        <div>
                            <label>YDS
                                <input type="radio" id="YDS" name="routes" value="YDS"/>
                            </label>
                        </div>
                    </div>
                        <button id="save-settings-changes-btn">Save changes</button>
                    
                </div>

                <div className="sub-container">
                    <button id="delete-account-btn">Delete Account</button>
                </div>
            </div>
        )
    }
}

export default SettingsScreen