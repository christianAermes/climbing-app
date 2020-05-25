import React, {Component} from 'react'
import GradeSelector from './GradeSelector'
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

class OutdoorSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
                startDate: new Date(),
                boulderGrades: "fb",
                routeGrades: "UIAA"
                }
        this.handleDateSelect = this.handleDateSelect.bind(this)
    }
    
    handleDateSelect(date) {
        this.setState({startDate: date})
    }

    

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        // let boulderGrades = this.state.boulderGrades==="fb"?
        //         ["1", "2", "3", "4", "5", "6A", "6A+", "6B", "6B+", "6C", "6C+", "7A", "7A+", "7b", "7B+", "7C", "7C+", "8A", "8A+", "8B", "8B+", "8C", "8C+", "9A"] :
        //         ["VB", "V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"]
        let boulderGrades = this.props.boulderGrades
        let boulderGradesComponents = boulderGrades.map(bg=><GradeSelector grade={bg} key={bg}></GradeSelector>)
        
        // let routeGrades = ["3-", "3", "3+", "4-", "4", "4+", "5-", "5", "5+", "6-", "6", "6+", "7-", "7", "7+", "8-", "8", "8+", "9-", "9", "9+", "10-", "10", "10+", "11-", "11", "11+"]
        let routeGrades = this.props.routeGrades
        let routeGradesComponents = routeGrades.map(rg=><GradeSelector grade={rg} key={rg}></GradeSelector>)
        
        return (
            <div className="session">
                    <input type="text" placeholder="Crag"/>
                    <DatePicker  dateFormat="dd.MM.yyyy"  onChange={this.handleDateSelect} selected={this.state.startDate}></DatePicker>

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

                <button id="save-add-sessions-btn">Save Session</button>
            </div>
        )
    }
}

export default OutdoorSession