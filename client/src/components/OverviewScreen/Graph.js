import React, {Component} from 'react'
import {ResponsiveContainer,/* LineChart,  Line, */XAxis, YAxis, Tooltip, BarChart, Bar, Brush, ScatterChart, Scatter, Legend} from 'recharts'

const COLORS = [
    "#575757",
    "#a8a75e",
    "#82ca9d", 
    "#1a63a3",
    "#8884d8", 
    "#a86a5e", 
]




class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.tickFormatter = this.tickFormatter.bind(this)
        this.formatMillisToDateString = this.formatMillisToDateString.bind(this)
    }
    renderColorfulLegendText(value, entry) {
        return <span style={{ color: "#fff" }}>{value}</span>;
    }
    formatNumberToInt(value) {
        return typeof(value)==="number"? Math.floor(value) : value;
    }
    formatMillisToDateString(millis) {

        let date = new Date(millis)
        const paddingZeros = (number) => { 
            return number<100? (number<10? `0${number}` : `${number}`) : ""
        }
    
        let MM = paddingZeros(date.getMonth() + 1) // is zero based
        let dd = paddingZeros(date.getDate())
        
        let dateString = `${date.getFullYear()}-${MM}-${dd}`
        // console.log(dateString)
        
        return dateString
    }

    tickFormatter(value, name) {
        if (name === "x") {
            // let dateStr = new Date(value).toDateString()
            let formattedDateStr = this.formatMillisToDateString(value)
            return [formattedDateStr, "Date"]
        }
        return [value, "Max Strength"]
    }

    

    render() {

        // let lines = this.props.datakeys.map((key, idx)=>(               
        //     <Line 
        //         type="monotone" 
        //         dataKey={key}
        //         stroke={COLORS[idx%COLORS.length]} 
        //         isAnimationActive={false}
        //         strokeWidth={5}
        //         dot={false}
        //         key={idx}
        //     />)
        //     )
        let lines = []
        for (let i=0; i<this.props.datakeys.length; i++) {
            let key = this.props.datakeys[i]
            console.log(key)
            let data = this.props.data.map(el => ({x:Date.parse(el.x), y: el[key]}))
            let scatter = <Scatter 
                                name={key} 
                                data={data} 
                                fill={COLORS[i%COLORS.length]}
                                lineJointType='monotoneX'
                                line strokeWidth={5}
                                shape="circle"
                                key={i}
                                />
            lines.push(scatter)
        }
        console.log(this.props.datakeys.length)

        // let times = this.props.data.map(el => Date.parse(el.x))
        let data = this.props.data
        let minT = Infinity
        let maxT = -Infinity
        for (let i=0; i<data.length; i++) {
            // data[i]["time"] = Date.parse(data[i].x)/(1000*60*60*24)
            if (data[i]["time"] > maxT) maxT = data[i]["time"]
            if (data[i]["time"] < minT) minT = data[i]["time"]
        }
        // console.log(data)
        

        return (
            <div className="graph-border">
                <div className="graph-title">{this.props.title? this.props.title : ""}</div>
                <div className="graph">
                    <ResponsiveContainer  height='100%' width='100%'>
                        
                        {/* <LineChart data={data} margin={{top: 5, right: 5, bottom: 5, left: 5}}>
                            <XAxis dataKey="time" stroke="#fff" scale="linear" domain={[minT, maxT]} allowDataOverflow={true}/>
                            <YAxis width={2} tick={false} stroke="#fff" reversed={this.props.invertY? true : false}/>
                            <Tooltip 
                                // formatter={this.props.formatter? this.props.formatter : this.formatNumberToInt}
                            />
                            {lines}
                        </LineChart> */}
                        <ScatterChart margin={{top: 5, right: 5, bottom: 5, left: 5}}>
                            <XAxis type="number" dataKey="x" stroke="#fff" domain={[minT, maxT]} tickFormatter={this.formatMillisToDateString}/>
                            <YAxis type="number" unit="kg" dataKey="y" width={2} tick={false} stroke="#fff" domain={[minT, maxT]} reversed={this.props.invertY? true : false}/>
                            <Tooltip 
                                formatter={this.tickFormatter}
                                // formatter={this.dateTickFormatter}
                                // labelFormatter={this.dateTickFormatter}
                            />
                            <Legend formatter={this.renderColorfulLegendText}/>
                            {lines}
                        </ScatterChart>
                        
                    </ResponsiveContainer>
                </div>
            </div>
            
        )
    }
}

class BarGraph extends Component {
    formatNumberToInt(value) {
        return typeof(value)==="number"? Math.floor(value) : value;
    }

    render() {

        let data, labels
        if (this.props.brackets !== null && this.props.datakeys.length===this.props.brackets.length) {
            data = []
            labels = this.props.brackets.map(el => el.grade)
            for (let i=0; i<this.props.data.length; i++) {
                let newPoint = {x: this.props.data[i].x}
                for (let j=0; j<this.props.datakeys.length; j++) {
                    newPoint[this.props.brackets[j].grade] = this.props.data[i][this.props.datakeys[j]]
                }
                data.push(newPoint)
            }
        }
        else {
            data = this.props.data
            labels = this.props.datakeys
        }

        let bars = labels.map((key, idx)=>(               
            <Bar
                stackId="a" 
                type="monotone" 
                dataKey={key}
                fill={COLORS[idx%COLORS.length]} 
                isAnimationActive={false}
                key={idx}
            />)
            )
        
        

        return (
            <div className="graph-border">
                <div className="graph-title">{this.props.title? this.props.title : ""}</div>
                <div className="graph">
                    <ResponsiveContainer  height='100%' width='100%'>
                        
                        <BarChart data={data} margin={{top: 5, right: 5, bottom: 5, left: 5}}>
                            <XAxis dataKey="x" stroke="#fff"/>
                            <YAxis width={2} tick={false} stroke="#fff" reversed={this.props.invertY? true : false}/>
                            <Tooltip 
                                // formatter={this.props.formatter? this.props.formatter : this.formatNumberToInt}
                                // formatter={formatter}
                            />
                            {bars}
                            <Brush dataKey="x" height={8} data={data} startIndex={0}>
                                
                                
                            </Brush>
                        </BarChart>
                        
                    </ResponsiveContainer>
                </div>
            </div>
            
        )
    }
}

export {LineGraph, BarGraph}