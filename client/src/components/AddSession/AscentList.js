import React, {Component} from "react"
import Ascent from "./Ascent"

class AscentList extends Component {
    constructor(props) {
        super(props)
        this.handleAddAscent    = this.handleAddAscent.bind(this)
        this.handleAscentChange = this.handleAscentChange.bind(this)
    }

    handleAscentChange(ascent) {
        let changedAscents = this.state.ascents
        let updatedChangedAscents = changedAscents.map(el => el.id===ascent.id? ascent : el)
        this.props.handleAscentListUpdate(updatedChangedAscents, this.props.climbtype)
        this.setState({ascents: updatedChangedAscents})
    }

    handleAddAscent() {
        this.props.handleAddAscent(this.props.climbtype)
    }
    
    render() {
        
        // let ascents = this.state.ascents.map(ascent => <Ascent ascent={ascent} climbtype={this.props.climbtype} handleRemoveAscent={this.handleRemoveAscent} handleAscentChange={this.handleAscentChange} grades={this.props.grades} key={ascent.id}></Ascent>)
        let ascents = this.props.ascents.map(ascent => <Ascent ascent={ascent} climbtype={this.props.climbtype} grades={this.props.grades} key={ascent.id} handleRemoveAscent={this.props.handleRemoveAscent} handleAscentChange={this.props.handleAscentChange}></Ascent>)
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