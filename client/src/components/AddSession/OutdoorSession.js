import React, {Component} from 'react'
import AscentList from "./AscentList"

class OutdoorSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // startDate: new Date(),
            n_ascents: 1,
            // ascents: [{
            //     name:  null,
            //     crag:  null,
            //     grade: null,
            //     startDate:  new Date(),
            //     flash: false,
            //     top:   false,
            //     id: 0,
            // }]
        }
        this.handleSaveSession  = this.handleSaveSession.bind(this)
    }
    
    handleSaveSession() {
        for (let ascent of this.state.ascents) {
            console.log(ascent)
        }
    }
    
    componentDidUpdate() {
        this.render()
    }
    componentDidMount() {
        console.log(this.props)
    }


    render() {
        // let boulderAscents = this.state.ascents.map(ascent => <Ascent ascent={ascent} climbtype={1} handleAscentChange={this.handleAscentChange} grades={this.props.boulderGrades} key={ascent.id}></Ascent>)
        // let routeAscents = this.state.ascents.map(ascent => <Ascent ascent={ascent} climbtype={0} handleAscentChange={this.handleAscentChange} grades={this.props.routeGrades} key={ascent.id}></Ascent>)
        return (
            <div className="session">
                {/* <div className="outdoor-session-climbing-type">Boulder</div> */}
                {/* {boulderAscents} */}
                {/* <button className="add-ascent-to-list-btn" onClick={this.handleAddAscent}></button> */}
                <AscentList climbtype={1} handleAscentChange={this.handleAscentChange} grades={this.props.boulderGrades}></AscentList>
                {/* <AscentList climbtype={0} handleAscentChange={this.handleAscentChange} grades={this.props.routeGrades}></AscentList> */}
                {/* <div className="outdoor-session-climbing-type">Routes</div> */}
                {/* {routeAscents} */}
                {/* <div className="outdoor-session-btn-container"> */}
                    {/* <button className="add-ascent-to-list-btn" onClick={this.handleAddAscent}></button> */}
                    <button id="save-add-sessions-btn" onClick={this.handleSaveSession}>Save Session</button>
                {/* </div> */}
                
            </div>
        )
    }
}

export default OutdoorSession