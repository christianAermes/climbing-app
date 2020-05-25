import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import IndoorSession from './IndoorSession'
import OutdoorSession from './OutdoorSession'
import HangboardSession from './HangboardSession'


class AddSessionScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            indoorSession: false,
            outdoorSession: false,
            hangboardSession: false
        }
        this.handleDropDownClick = this.handleDropDownClick.bind(this)
        this.handleSessionSelect = this.handleSessionSelect.bind(this)
    }

    componentDidMount() {
        console.log("AddSessionScreen Props", this.props)
    }

    

    handleDropDownClick() {
        document.getElementById("select-session-dropdown").classList.toggle("show")
    }
    handleSessionSelect(e) {
        let targetId = e.target.id
        document.getElementById("select-session-dropdown").classList.toggle("show")
        let indoorSession = targetId === "select-indoor-session"
        let outdoorSession = targetId === "select-outdoor-session"
        let hangboardSession = targetId === "select-hangboard-session"
        this.setState({indoorSession: indoorSession,
                       outdoorSession: outdoorSession,
                       hangboardSession: hangboardSession
                      })
        let dropBtnTxt = document.getElementById("selected-session-name")
        let sessionName = indoorSession? "Indoor Session" : outdoorSession? "Outdoor Session" : hangboardSession? "HangboardSession" : "Select Session"
        dropBtnTxt.innerText = sessionName
    }

    render() {
        let session
        if (this.state.indoorSession) {
            session = <IndoorSession routeGrades={this.props.routeGrades} boulderGrades={this.props.boulderGrades}></IndoorSession>
        } else if (this.state.outdoorSession) {
            session = <OutdoorSession routeGrades={this.props.routeGrades} boulderGrades={this.props.boulderGrades}></OutdoorSession>
        } else if (this.state.hangboardSession) {
            session = <HangboardSession></HangboardSession>
        } else {
            session = <div></div>
        }
        return (
            <div className="main-container">
                <div className="sub-container">
                    <div className="dropdown">
                        <button className="dropBtn" onClick={this.handleDropDownClick}>
                            <span id="selected-session-name">Select Session</span> <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                        </button>
                        <div className="dropdown-content" id="select-session-dropdown">
                            <button id="select-indoor-session" onClick={this.handleSessionSelect}>Indoor Session</button>
                            <button id="select-outdoor-session" onClick={this.handleSessionSelect}>Outdoor Session</button>
                            <button id="select-hangboard-session" onClick={this.handleSessionSelect}>Hangboard Session</button>
                        </div>
                    </div>

                    {session}

                </div>
            </div>
        )
    }
}

export default AddSessionScreen