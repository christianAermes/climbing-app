import React, {Component} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class HangboardSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
                startDate: new Date(),
        }
        this.handleDateSelect = this.handleDateSelect.bind(this)
    }
    
    handleDateSelect(date) {
        this.setState({startDate: date})
    }

    render() {
        return (
            <div className="session">
                <div className="hangboard-input-container">
                    <DatePicker  dateFormat="dd.MM.yyyy"  onChange={this.handleDateSelect} selected={this.state.startDate}></DatePicker>
                    <input placeholder="Sets" type="number" min={0}/>
                    <input placeholder="Reps" type="number" min={0}/>
                    <input placeholder="Hang / s" type="number" min={0}/>
                    <input placeholder="Rest between hangs / s" type="number" min={0}/>
                    <input placeholder="Pause between sets / s" type="number" min={0}/>

                </div>

                <div className="hangboard-strength-test">
                    <p>Max Strength Test on Smallest Edge</p>
                    <input placeholder="Left" type="number" min={0}/>
                    <input placeholder="Right" type="number" min={0}/>
                </div>
                
                <button id="save-add-sessions-btn">Save Session</button>
            </div>
        )
    }
}

export default HangboardSession