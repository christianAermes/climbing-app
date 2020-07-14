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
            lastIdBoulder: 0,
            lastIdRoutes: 0,
        }
        this.handleSaveSession      = this.handleSaveSession.bind(this)

        this.handleAscentChange     = this.handleAscentChange.bind(this)
        this.handleAddAscent        = this.handleAddAscent.bind(this)
        this.handleRemoveAscent     = this.handleRemoveAscent.bind(this)
    }

    handleAddAscent(climbtype) {
        if (climbtype===1) {
            let newAscent = {
                name:  null,
                crag:  null,
                grade: null,
                startDate:  new Date(),
                flash: false,
                top:   false,
                id: this.state.lastIdBoulder + 1,
            }
            console.log("Id of new ascent: ", newAscent.id)
            let ascents = this.state.boulders
            ascents.push(newAscent)
            this.setState(state => ({
                boulders: ascents,
                lastIdBoulder: state.lastIdBoulder + 1
            }))
        } else if (climbtype===0) {
            let newAscent = {
                name:  null,
                crag:  null,
                grade: null,
                startDate:  new Date(),
                flash: false,
                top:   false,
                id: this.state.lastIdRoutes + 1,
            }
            console.log("Id of new ascent: ", newAscent.id)
            let ascents = this.state.routes
            ascents.push(newAscent)
            this.setState(state => ({
                routes: ascents,
                lastIdRoutes: state.lastIdRoutes + 1
            }))
        }
        
    }
    handleRemoveAscent(id, climbtype) {
        console.log(id, typeof id)
        if (climbtype===1) {
            let ascents = this.state.boulders
            let filteredAscents = ascents.filter(el => el.id !== id)
            
            this.setState(state => ({
                boulders: filteredAscents
            }))
        } else if (climbtype===0) {
            let ascents = this.state.routes
            let filteredAscents = ascents.filter(el => el.id !== id)
            
            this.setState(state => ({
                routes: filteredAscents
            }))
        }
    }
    handleAscentChange(ascent, climbtype) {
        if (climbtype===1) {
            let changedAscents = this.state.boulders
            let updatedChangedAscents = changedAscents.map(el => el.id===ascent.id? ascent : el)
            this.setState({boulders: updatedChangedAscents})
        } else if (climbtype===0) {
            let changedAscents = this.state.routes
            let updatedChangedAscents = changedAscents.map(el => el.id===ascent.id? ascent : el)
            this.setState({routes: updatedChangedAscents})
        }
        
    }

    async handleSaveSession() {
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
        for (let i=0; i<this.state.routes.length; i++) {
            let ascent = this.state.routes[i]
            if (!ascent.flash && !ascent.top) {
                console.log(`Route number ${ascent.id} needs a method of climbing (flash/top)`)
                return
            }
            if (ascent.name === null || ascent.name === "") {
                console.log(`Route number ${ascent.id} needs a name`)
                return
            }
            if (ascent.grade === null) {
                console.log(`Route number ${ascent.id} needs a grade`)
                return
            }
            if (ascent.crag === null || ascent.name === "") {
                console.log(`Route number ${ascent.id} needs a crag`)
                return
            }
            console.log(ascent)
        }
        let res = await postData(`${config.SERVER_ADDRESS}/insertOutdoorAscents`, {boulders: this.state.boulders, routes: this.state.routes, user_name: this.props.user_name, user_id: this.props.user_id})
        if (res.success) {
            this.setState({
                boulders: [],
                routes: [],
                lastIdBoulder: 0,
                lastIdRoutes: 0,
            })
            console.log(res)

        }
    }
    
    componentDidMount() {
        console.log(this.props)
    }


    render() {
        
        return (
            <div className="session">
                <AscentList climbtype={1} 
                            handleRemoveAscent={this.handleRemoveAscent} 
                            handleAddAscent={this.handleAddAscent} 
                            handleAscentChange={this.handleAscentChange}
                            grades={this.props.boulderGrades} 
                            ascents={this.state.boulders}>
                </AscentList>
                <AscentList climbtype={0} 
                            handleRemoveAscent={this.handleRemoveAscent} 
                            handleAddAscent={this.handleAddAscent} 
                            handleAscentChange={this.handleAscentChange}
                            grades={this.props.routeGrades} 
                            ascents={this.state.routes}>
                </AscentList>
                
                <button id="save-add-sessions-btn" onClick={this.handleSaveSession}>Save Session</button>
            </div>
        )
    }
}

export default OutdoorSession