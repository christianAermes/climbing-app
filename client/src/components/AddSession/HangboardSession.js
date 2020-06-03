import React, {Component} from 'react'
import MessagePopUp from "../General/MessagePopUp"
import DatePicker from "react-datepicker";

import {postData} from "../../serverRequests"
import config from "../../config"

import "react-datepicker/dist/react-datepicker.css";

class HangboardSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
                showPopUp: false,
                startDate: new Date(),
        }
        this.handleDateSelect    = this.handleDateSelect.bind(this)
        this.handleSubmitSession = this.handleSubmitSession.bind(this)
    }
    
    handleDateSelect(date) {
        this.setState({startDate: date})
    }

    async handleSubmitSession() {
        // check that all required inputs are filled out
        // storage boolean variable to check if any of the required fields is empty
        let anyEmpty = false
        let setsInput          = document.getElementById("hangboard-session-sets")
        let repsInput          = document.getElementById("hangboard-session-reps")
        let hangsInput         = document.getElementById("hangboard-session-hang-s")
        let restInput          = document.getElementById("hangboard-session-rest")
        let pauseInput         = document.getElementById("hangboard-session-pause")
        let bodyweightInput    = document.getElementById("hangboard-session-bodyweight")
        let extraweightInput   = document.getElementById("hangboard-session-extraweight")
        let strengthleftInput  = document.getElementById("hangboard-session-maxstrength-left")
        let strengthrightInput = document.getElementById("hangboard-session-maxstrength-right")
        
        if (setsInput.value === "") {
            setsInput.classList.add("blinking")
            anyEmpty = true
        }
        if (repsInput.value === "") {
            repsInput.classList.add("blinking")
            anyEmpty = true
        }
        if (hangsInput.value === "") {
            hangsInput.classList.add("blinking")
            anyEmpty = true
        }
        if (restInput.value === "") {
            restInput.classList.add("blinking")
            anyEmpty = true
        }
        if (pauseInput.value === "") {
            pauseInput.classList.add("blinking")
            anyEmpty = true
        }
        if (bodyweightInput.value === "") {
            bodyweightInput.classList.add("blinking")
            anyEmpty = true
        }
        if (anyEmpty) {
            this.setState({showPopUp: true})
            setTimeout(()=>{
                this.setState({showPopUp: false})
            }, 1500)
            return
        }
                
        const session = {
            date:                   this.state.startDate,
            user_name:              this.props.user_name,
            user_id:                this.props.user_id,
            sets:                   parseInt(setsInput.value),
            repetitions:            parseInt(repsInput.value),
            hang_seconds:           parseInt(hangsInput.value),
            rest_btw_hangs_seconds: parseInt(restInput.value),
            pause_btw_sets_seconds: parseInt(pauseInput.value),
            body_weight_kg:         parseFloat(bodyweightInput.value),
            extra_weight_kg:        parseFloat(extraweightInput.value),
            max_strength_left_kg:   parseFloat(strengthleftInput.value),
            max_strength_right_kg:  parseFloat(strengthrightInput.value), 
        }

        
        let res = await postData(`${config.SERVER_ADDRESS}/insertNewHangboardSession`, {session: session})

        if (res.success) {
            setsInput.value = ""
            repsInput.value = ""
            hangsInput.value = ""
            restInput.value = ""
            pauseInput.value = ""
            bodyweightInput.value = ""
            extraweightInput.value = ""
            strengthleftInput.value = ""
            strengthrightInput.value = ""
        }

        console.log(res)
    }

    render() {
        let popup = this.state.showPopUp? <MessagePopUp message="Please fill out all required fields."></MessagePopUp> : <div></div>
        return (
            <div className="session">
                
                <div className="hangboard-input-container">
                    <DatePicker  dateFormat="dd.MM.yyyy"  onChange={this.handleDateSelect} selected={this.state.startDate}></DatePicker>
                    <input placeholder="Sets" type="number" min={0} id="hangboard-session-sets"/>
                    <input placeholder="Reps" type="number" min={0} id="hangboard-session-reps"/>
                    <input placeholder="Hang / s" type="number" min={0} id="hangboard-session-hang-s"/>
                    <input placeholder="Rest between hangs / s" type="number" min={0} id="hangboard-session-rest"/>
                    <input placeholder="Pause between sets / s" type="number" min={0} id="hangboard-session-pause"/>
                    <input placeholder="Body Weight / kg" type="number" min={0} step={0.1} id="hangboard-session-bodyweight"/>
                    <input placeholder="Extra Weight" type="number" min={0} step={0.1} id="hangboard-session-extraweight"/>
                    

                </div>

                <div className="hangboard-strength-test">
                    <p>Max Strength Test on 20 mm Edge</p>
                    <input placeholder="Left" type="number" min={0} step={0.1} id="hangboard-session-maxstrength-left"/>
                    <input placeholder="Right" type="number" min={0} step={0.1} id="hangboard-session-maxstrength-right"/>
                </div>
                
                <button onClick={this.handleSubmitSession} id="save-add-sessions-btn">Save Session</button>
                {popup}
            </div>
        )
    }
}

export default HangboardSession