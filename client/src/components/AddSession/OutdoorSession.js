import React, {Component} from 'react'
import AscentList from "./AscentList"

import {postData} from "../../serverRequests"
import config from "../../config"

class OutdoorSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boulders: [],
            routes: [],
            reset: false,

        }
        this.handleSaveSession      = this.handleSaveSession.bind(this)
        this.handleAscentListUpdate = this.handleAscentListUpdate.bind(this)
    }

    handleAscentListUpdate(ascentList, climbtype) {
        if (climbtype===1) {
            this.setState({boulders: ascentList})
        }
        if (climbtype===0) {
            this.setState({routes: ascentList})
        }
    }

    async handleSaveSession() {
        // console.log(this.props.user_name)
        for (let i=0; i<this.state.boulders.length; i++) {
            let ascent = this.state.boulders[i]
            if (!ascent.flash && !ascent.top) {
                console.log(`Boulder number ${ascent.id} needs a method of climbing (flash/top)`)
                return
            }
            if (ascent.name === null || ascent.name === "") {
                console.log(`Boulder number ${ascent.id} needs a name`)
                return
            }
            if (ascent.grade === null) {
                console.log(`Boulder number ${ascent.id} needs a grade`)
                return
            }
            if (ascent.crag === null || ascent.name === "") {
                console.log(`Boulder number ${ascent.id} needs a crag`)
                return
            }
            console.log(ascent)
        }
        let res = await postData(`${config.SERVER_ADDRESS}/insertOutdoorAscents`, {boulders: this.state.boulders, routes: this.state.routes, user_name: this.props.user_name, user_id: this.props.user_id})
        if (res.success) {
            // this.setState({reset: true})
            console.log(res)
            // this.render()
            // this.setState({reset: false})

        }
    }
    
    componentDidMount() {
        console.log(this.props)
    }


    render() {
        
        return (
            <div className="session">
                <AscentList reset={this.state.reset} climbtype={1} handleAscentListUpdate={this.handleAscentListUpdate} grades={this.props.boulderGrades}></AscentList>
                <AscentList reset={this.state.reset} climbtype={0} handleAscentListUpdate={this.handleAscentListUpdate} grades={this.props.routeGrades}></AscentList>
                
                <button id="save-add-sessions-btn" onClick={this.handleSaveSession}>Save Session</button>
            </div>
        )
    }
}

export default OutdoorSession