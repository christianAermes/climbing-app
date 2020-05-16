import React, {Component} from 'react'
import Infobox from './Infobox'
import Graph from './Graph'
// import Table from './Table'

import {boulderGradeConversionToFB, boulderGradeConversionToV} from '../boulderGradeConversion'

class OverviewScreen extends Component {
    constructor(props) {
        super(props)
        this.makedata = this.makedata.bind(this)
        this.makedata()

        this.state = {
            indoorData: {data: [], keys: []},
            outdoorData: {data: [], keys: []},
            hangboardData: {data: [], keys: []},
            leaderboardData: {data: [], keys: []},
            boulderGrades: "v",
        }
    }

    async getData(url, request) {
        const response = await fetch(url, {
                                        method: "POST",
                                        mode: "cors",
                                        cache: "no-cache",
                                        credentials: "same-origin",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        redirect: "follow",
                                        referrerPolicy: "no-referrer",
                                        body: JSON.stringify(request)
        })
        return response.json()
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
        console.log(this.props)
        document.querySelector(".sidebar button").style.background = "#248499"
        
        let data_indoorDB = await this.getData("http://localhost:8000/getIndoorSessions", {username: this.props.username})
        let indoorData = this.formatClimbingSessionData(data_indoorDB.data)
        if (data_indoorDB.success) this.setState({indoorData: indoorData})
        // console.log(data_indoorDB)

        let data_outdoorDB = await this.getData("http://localhost:8000/getOutdoorSessions", {username: this.props.username})
        let outdoorData = this.formatClimbingSessionData(data_outdoorDB.data)
        if (data_outdoorDB.success) this.setState({outdoorData: outdoorData})
        // console.log(data_outdoorDB)
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
        let currentRank = this.props.leaderboardData.data.slice(-1)[0].Rank
        
        return (
            
            <div className="main-container">
                
                <div className="infobox-container">
                    <div className="infobox-container">
                        <Infobox name={"Indoor Sessions"} count={this.state.indoorData.data.length}></Infobox>
                        <Infobox name={"Outdoor Sessions"} count={this.state.outdoorData.data.length}></Infobox>
                    </div>
                    <div className="infobox-container">
                        <Infobox name={"Hangboard Sessions"} count={this.hangboardData.data.length}></Infobox>
                        <Infobox name={"Leader Board"} count={currentRank}></Infobox>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="graph-container">
                        <Graph data={this.state.indoorData.data} datakeys={this.state.indoorData.keys} formatter={this.props.boulderGrades==="fb"? boulderGradeConversionToFB : boulderGradeConversionToV}></Graph>
                        <Graph data={this.state.outdoorData.data} datakeys={this.state.outdoorData.keys} formatter={this.props.boulderGrades==="fb"? boulderGradeConversionToFB : boulderGradeConversionToV}></Graph>
                    </div>
                    <div className="graph-container">
                        <Graph data={this.hangboardData.data} datakeys={this.hangboardData.keys}></Graph>
                        <Graph data={this.leaderboardData.data} datakeys={this.leaderboardData.keys} invertY={true}></Graph>
                        </div>
                </div>

                {/* <Table></Table> */}
                
            </div>
        )
    }
}

export default OverviewScreen