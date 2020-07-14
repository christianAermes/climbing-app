import React, {Component} from 'react'
// import Infobox from './Infobox'
// import {LineGraph, BarGraph} from './Graph'
import Summary from "./Summary"
// import Table from './Table'
import {postData} from "../../serverRequests"
import config from "../../config"

// import {boulderGradeConversionToFB, boulderGradeConversionToV} from '../../boulderGradeConversion'

class OverviewScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            indoorData:  {boulder: {data: [], keys: []}, routes: {data: [], keys: []}},
            outdoorData: {boulder: {data: [], keys: []}, routes: {data: [], keys: []}},
            hangboardData: {data: [], keys: []},
            leaderboardData: {data: [], keys: []},
            // boulderGrades: "v",
        }
    }

    formatClimbingSessionData(data) {
        let formattedData = {data:[], keys: ["Max Grade", "Avg Grade"]}
        
        for (let i=0; i<data.length; i++) {
            let maxGrade = -1
            let avgGrade = 0
            let count = 0
            for (let grade=0; grade<19; grade++) {
                if (data[i][`boulders_grade${grade}`] > 0 && grade > maxGrade) {
                    maxGrade = grade
                }
                avgGrade += data[i][`boulders_grade${grade}`]*grade
                count += data[i][`boulders_grade${grade}`]
            }
            avgGrade /= count
            let point = {x: i, //data[i].date.substring(0,10), 
                         "Max Grade": maxGrade,
                         "Avg Grade": avgGrade
                        }
            formattedData.data.push(point)
        }
        return formattedData

    }

    
    async componentDidMount() {

        document.querySelector(".sidebar button").style.background = "#248499"
        
        let indoorDataDB = await postData(`${config.SERVER_ADDRESS}/getIndoorSessions`, {username: this.props.username})
        if (indoorDataDB.success) this.setState({indoorData: indoorDataDB.data})
        // console.log(indoorDataDB.data)
        let outdoorDataDB = await postData(`${config.SERVER_ADDRESS}/getOutdoorAscents`, {username: this.props.username, boulderGrades: this.props.boulderGrades, routeGrades: this.props.routeGrades})
        console.log(outdoorDataDB.data)
        if (outdoorDataDB.success) this.setState({outdoorData: outdoorDataDB.data})
        
        let hangboardDataDB = await postData(`${config.SERVER_ADDRESS}/getHangboardSessions`, {username: this.props.username})
        if (hangboardDataDB.success) this.setState({hangboardData: hangboardDataDB.data})
        // console.log(hangboardDataDB)
    }
    async componentWillReceiveProps() {
        
        document.querySelector(".sidebar button").style.background = "#248499"
        
        let indoorDataDB = await postData(`${config.SERVER_ADDRESS}/getIndoorSessions`, {username: this.props.username})
        if (indoorDataDB.success) this.setState({indoorData: indoorDataDB.data})
        // console.log(indoorDataDB.data)
        let outdoorDataDB = await postData(`${config.SERVER_ADDRESS}/getOutdoorAscents`, {username: this.props.username, boulderGrades: this.props.boulderGrades, routeGrades: this.props.routeGrades})
        console.log(outdoorDataDB.data)
        if (outdoorDataDB.success) this.setState({outdoorData: outdoorDataDB.data})
        
        let hangboardDataDB = await postData(`${config.SERVER_ADDRESS}/getHangboardSessions`, {username: this.props.username})
        if (hangboardDataDB.success) this.setState({hangboardData: hangboardDataDB.data})
        // console.log(hangboardDataDB)
    }

    
    
    render() {
        // let currentRank = this.state.leaderboardData.length>0? this.state.leaderboardData.data.slice(-1)[0] : 1
        // {/* <Graph data={this.state.indoorData.data} datakeys={this.state.indoorData.keys} formatter={this.props.boulderGrades==="fb"? boulderGradeConversionToFB : boulderGradeConversionToV}></Graph> */}
        // {/* <Graph data={this.state.outdoorData.data} datakeys={this.state.outdoorData.keys} formatter={this.props.boulderGrades==="fb"? boulderGradeConversionToFB : boulderGradeConversionToV}></Graph> */}
        
        // console.log(this.props.boulderGrades)
        return (
            
            <div className="main-container">
                <div className="summary-container">
                    <Summary 
                        name={"Indoor Sessions"} 
                        count={(this.state.indoorData.boulder.data.length+this.state.indoorData.routes.data.length)/2}
                        data={[this.state.indoorData.boulder.data, this.state.indoorData.routes.data]}
                        datakeys={[this.state.indoorData.boulder.keys, this.state.indoorData.routes.keys]}
                        brackets={[this.props.boulderBrackets, this.props.routeBrackets]}
                        graphTypes={["bar", "bar"]}
                        titles={["Boulder", "Routes"]}
                    ></Summary>

                    <Summary 
                        name={"Outdoor Sessions"} 
                        count={(this.state.outdoorData.boulder.data.length+this.state.outdoorData.routes.data.length)/2}
                        data={[this.state.outdoorData.boulder.data, this.state.outdoorData.routes.data]}
                        datakeys={[this.state.outdoorData.boulder.keys, this.state.outdoorData.routes.keys]}
                        brackets={[this.props.boulderGrades, this.props.routeGrades]}
                        graphTypes={["bar", "bar"]}
                        titles={["Boulder", "Routes"]}
                    ></Summary>

                    <Summary 
                        name={"Hangboard Sessions"} 
                        count={this.state.hangboardData.data.length}
                        data={[this.state.hangboardData.data]}
                        datakeys={[this.state.hangboardData.keys]}
                        brackets={[]}
                        graphTypes={["line"]}
                        titles={["Max Strength on 20 mm Edge"]}
                    ></Summary>
                </div>
                
                {/* <div className="infobox-container">
                    <div className="infobox-container">
                        <Infobox name={"Indoor Sessions"} count={(this.state.indoorData.boulder.data.length+this.state.indoorData.routes.data.length)/2}></Infobox>
                        <Infobox name={"Outdoor Sessions"} count={this.state.outdoorData.data.length}></Infobox>
                    </div>
                    <div className="infobox-container">
                        <Infobox name={"Hangboard Sessions"} count={this.state.hangboardData.data.length}></Infobox>
                        <Infobox name={"Leader Board"} count={currentRank}></Infobox>
                    </div>
                </div> */}
                <div className="graph-container">
                    <div className="graph-container">
                        {/* <BarGraph data={this.state.indoorData.boulder.data} datakeys={this.state.indoorData.boulder.keys} brackets={this.props.boulderBrackets}></BarGraph> */}
                        {/* <BarGraph data={this.state.indoorData.routes.data} datakeys={this.state.indoorData.routes.keys} brackets={this.props.routeBrackets}></BarGraph> */}
                    </div>
                    <div className="graph-container">
                        {/* <LineGraph data={this.state.hangboardData.data} datakeys={this.state.hangboardData.keys}></LineGraph> */}
                        {/* <LineGraph data={this.state.leaderboardData.data} datakeys={this.state.leaderboardData.keys} invertY={true}></LineGraph> */}
                        </div>
                </div>

                {/* <Table></Table> */}
                
            </div>
        )
    }
}

export default OverviewScreen