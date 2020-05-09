import React, {Component} from 'react'
import {ResponsiveContainer, LineChart,  Line, XAxis, YAxis, Tooltip} from 'recharts'

class Graph extends Component {
    render() {
        // let data = [
        //     {x: 1, y: 4000, pv: 24, amt: 2400},
        //     {x: 2, y: 3000, pv: 13, amt: 2210},
        //     {x: 3, y: 2000, pv: 98, amt: 2290},
        //     {x: 4, y: 2780, pv: 39, amt: 2000},
        //     {x: 5, y: 1890, pv: 48, amt: 2181},
        //     {x: 6, y: 2390, pv: 38, amt: 2500},
        //     {x: 7, y: 3490, pv: 43, amt: 2100},
        // ]

        const COLORS = ["#8884d8", "#82ca9d", "000"]
        
        let lines = this.props.datakeys.map((key, idx)=>(               
            <Line 
                type="monotone" 
                dataKey={key}
                stroke={COLORS[idx%COLORS.length]} 
                isAnimationActive={false}
                strokeWidth={5}
                dot={false}
                key={idx}
            />)
            )
        

        return (
            <div className="graph-border">
                <div className="graph">
                    <ResponsiveContainer  height='100%' width='100%'>
                        
                        <LineChart data={this.props.data} margin={{top: 5, right: 5, bottom: 5, left: 5}}>
                            <XAxis dataKey="x" stroke="#fff"/>
                            <YAxis width={2} tick={false} stroke="#fff" reversed={this.props.invertY? true : false}/>
                            <Tooltip formatter={this.props.formatter? this.props.formatter : (value)=>(typeof(value)==="number"? Math.floor(value) : value)}/>
                            {lines}
                            </LineChart>
                        
                        {/* <LineChart data={this.props.data? this.props.data : data} margin={{top: 5, right: 5, bottom: 5, left: 5}}>
                            <XAxis dataKey="x" stroke="#fff"/>
                            <YAxis width={2} tick={false} stroke="#fff" reversed={this.props.invertY? true : false}/>
                            <Tooltip/>
                            
                            <Line 
                                type="monotone" 
                                dataKey="y" 
                                stroke="#8884d8" 
                                isAnimationActive={false}
                                strokeWidth={5}
                                dot={false}
                                />
                        </LineChart> */}
                    </ResponsiveContainer>
                </div>
            </div>
            
        )
    }
}

export default Graph