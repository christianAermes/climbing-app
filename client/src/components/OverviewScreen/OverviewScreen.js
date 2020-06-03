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
        // this.makedata = this.makedata.bind(this)
        // this.makedata()

        this.state = {
            indoorData: {boulder: {data: [], keys: []}, routes: {data: [], keys: []}},
            outdoorData: {data: [], keys: []},
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
        // let data_outdoorDB = await postData(`${config.SERVER_ADDRESS}/getOutdoorSessions`, {username: this.props.username})
        // let outdoorData = this.formatClimbingSessionData(data_outdoorDB.data)
        // if (data_outdoorDB.success) this.setState({outdoorData: outdoorData})

        let hangboardDataDB = await postData(`${config.SERVER_ADDRESS}/getHangboardSessions`, {username: this.props.username})
        if (hangboardDataDB.success) this.setState({hangboardData: hangboardDataDB.data})
        // console.log(hangboardDataDB)
    }

    makedata() {
        this.indoorData = []
        for (let i=0; i<120; i++) {
            let point = {x: i, 
                        "Max Grade": Math.log(1+i) + Math.random(),
                        "Avg Grade": 0.75*Math.log(1+i) + 0.5*Math.random(),
                    }
            this.indoorData.push(point)
        }
        let indoorDataKeys = ["Max Grade", "Avg Grade"]
        this.indoorData = {data: this.indoorData, keys: indoorDataKeys}

        this.outdoorData = []
        for (let i=0; i<12; i++) {
            let point = {x: i*i, 
                        "Max Grade": i+1 + Math.random(),
                        "Avg Grade": 0.5*(i+1 + Math.random())
                    }
            this.outdoorData.push(point)
        }
        let outdoorDataKeys = ["Max Grade", "Avg Grade"]
        this.outdoorData = {data: this.outdoorData, keys:outdoorDataKeys}

        this.hangboardData = []
        for (let i=0; i<36; i++) {
            let point = {x: i, 
                        "Left": 40*Math.sin(i*Math.PI/50) + 3*Math.random(),
                        "Right": 48*Math.sin(i*Math.PI/60) + 5*Math.random(),
                    }
            this.hangboardData.push(point)
        }
        let hangboardDataKeys = ["Left", "Right"]
        this.hangboardData = {data: this.hangboardData, keys: hangboardDataKeys}
        
        this.leaderboardData = []
        for (let i=0; i<120; i++) {
            let point = {x: i, "Rank": 1+Math.floor(5*Math.sin(i*Math.PI/420) + Math.random())}
            this.leaderboardData.push(point)
        }
        this.leaderboardData = {data: this.leaderboardData, keys: ["Rank"]}
    }
    
    render() {
        // let currentRank = this.state.leaderboardData.length>0? this.state.leaderboardData.data.slice(-1)[0] : 1
        // {/* <Graph data={this.state.indoorData.data} datakeys={this.state.indoorData.keys} formatter={this.props.boulderGrades==="fb"? boulderGradeConversionToFB : boulderGradeConversionToV}></Graph> */}
        // {/* <Graph data={this.state.outdoorData.data} datakeys={this.state.outdoorData.keys} formatter={this.props.boulderGrades==="fb"? boulderGradeConversionToFB : boulderGradeConversionToV}></Graph> */}
                       
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
                        count={(this.state.indoorData.boulder.data.length+this.state.indoorData.routes.data.length)/2}
                        data={[this.state.indoorData.boulder.data, this.state.indoorData.routes.data]}
                        datakeys={[this.state.indoorData.boulder.keys, this.state.indoorData.routes.keys]}
                        brackets={[this.props.boulderBrackets, this.props.routeBrackets]}
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