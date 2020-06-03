import React, {Component} from 'react'
import GradeSelector from './GradeSelector'
import DatePicker from "react-datepicker"

import {postData} from "../../serverRequests"
import config from "../../config"

import "react-datepicker/dist/react-datepicker.css"

class IndoorSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
                startDate: new Date(),
                climbs: {},
                boulderBrackets: []
                }
        this.handleDateSelect    = this.handleDateSelect.bind(this)
        this.handleSubmitSession = this.handleSubmitSession.bind(this)
        this.handleChange        = this.handleChange.bind(this)
        this.handleGymNameChange = this.handleGymNameChange.bind(this)
    }
    
    handleDateSelect(date) {
        this.setState({startDate: date})
    }

    async handleSubmitSession() {
        let {startDate, climbs, gym} = this.state
        let user_name = this.props.user_name
        let user_id = this.props.user_id
        let date = startDate
        let session = {date, ...climbs, user_name, user_id, gym}
        // console.log(session)

        let res = await postData(`${config.SERVER_ADDRESS}/insertNewIndoorSession`, {session: session})
        console.log(res)
        
    }

    handleGymNameChange(e) {
        let gym = e.target.value
        this.setState({gym: gym})

    }

    handleChange(e) {
        let id = e.target.id
        let value = e.target.value
        this.setState((oldState) => {oldState.climbs[id] = value})
        // console.log(this.state.climbs)
        
    }

    componentDidUpdate() {
        // console.log(this.props.boulderBrackets)
    }


    render() {
        let boulderGrades = this.props.boulderBrackets
        let boulderGradesComponents = boulderGrades.map(bg=><GradeSelector grade={bg.grade} key={bg.id} id={`boulder_bracket_${bg.id}`} handleChange={this.handleChange}></GradeSelector>)
        
        let routeGrades = this.props.routeBrackets
        let routeGradesComponents = routeGrades.map(rg=><GradeSelector grade={rg.grade} key={rg.id} id={`route_bracket_${rg.id}`} handleChange={this.handleChange}></GradeSelector>)
        
        return (
            <div className="session">
                <div className="indoor-session-details">
                    <input type="text" placeholder="Gym" onChange={this.handleGymNameChange}/>
                    <DatePicker  dateFormat="dd.MM.yyyy"  onChange={this.handleDateSelect} selected={this.state.startDate}></DatePicker>
                </div>
                
                <div className="table-head">
                    <p>Boulder</p><p>Routes</p>
                </div>
                <div className="table-body">
                    <div>
                        {boulderGradesComponents}
                    </div>

                    <div>
                        {routeGradesComponents}
                    </div>
                    
                </div>

                <button onClick={this.handleSubmitSession} id="save-add-sessions-btn">Save Session</button>
            </div>
        )
    }
}

export default IndoorSession