import React, {Component} from 'react'
import {ResponsiveContainer, LineChart,  Line, XAxis, YAxis, Tooltip} from 'recharts'

class Graph extends Component {
    formatNumberToInt(value) {
        return typeof(value)==="number"? Math.floor(value) : value;
    }

    render() {

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
                            <Tooltip 
                                formatter={this.props.formatter? this.props.formatter : this.formatNumberToInt}/>
                            {lines}
                        </LineChart>
                        
                    </ResponsiveContainer>
                </div>
            </div>
            
        )
    }
}

export default Graph