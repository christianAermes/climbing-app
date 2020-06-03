import React, {Component} from "react"
import Ascent from "./Ascent"

class AscentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lastId: 0,
            ascents: [{
                name:  null,
                crag:  null,
                grade: null,
                startDate:  new Date(),
                flash: false,
                top:   false,
                id: 0,
            }]
        }
        this.handleAddAscent    = this.handleAddAscent.bind(this)
        this.handleRemoveAscent = this.handleRemoveAscent.bind(this)
        this.handleAscentChange = this.handleAscentChange.bind(this)
    }

    handleAscentChange(ascent) {
        let changedAscents = this.state.ascents
        let updatedChangedAscents = changedAscents.map(el => el.id===ascent.id? ascent : el)
        this.setState({ascents: updatedChangedAscents})
    }
    handleRemoveAscent(id) {
        console.log(id, typeof id)
        let ascents = this.state.ascents
        let filteredAscents = ascents.filter(el => el.id !== id)
        // for (let i=0; i<ascents.length; i++) {
        //     ascents[i].id = i
        //     // console.log(ascents[i].name)
        // }
        this.setState(state => ({
            ascents: filteredAscents
        }))

    }
    handleAddAscent() {
        let newAscent = {
            name:  null,
            crag:  null,
            grade: null,
            startDate:  new Date(),
            flash: false,
            top:   false,
            id: this.state.lastId + 1,
        }
        console.log("Id of new ascent: ", newAscent.id)
        let ascents = this.state.ascents
        ascents.push(newAscent)
        this.setState(state => ({
            ascents: ascents,
            lastId: state.lastId + 1
        }))
    }
    

    render() {
        // for (let i=0; i<this.state.ascents.length; i++) {
        //     console.log(this.state.ascents[i].name)
        // }
        // for (let ascent of this.state.ascents) {
        //     console.log(ascent.name)
        // }
        
        let ascents = this.state.ascents.map(ascent => <Ascent ascent={ascent} climbtype={this.props.climbtype} handleRemoveAscent={this.handleRemoveAscent} handleAscentChange={this.handleAscentChange} grades={this.props.grades} key={ascent.id}></Ascent>)
        let title = this.props.climbtype===1? "Boulder" : this.props.climbtype===0? "Routes" : ""
        
        return (
            <div className="ascent-list-container">
                <div className="outdoor-session-climbing-type">{title}</div>
                <div className="ascent-list">
                    {ascents}
                </div>
                <button className="add-ascent-to-list-btn" onClick={this.handleAddAscent}></button>
            </div>
        )
    }
}

export default AscentList