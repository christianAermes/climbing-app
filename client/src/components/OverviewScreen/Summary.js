import React, {Component} from "react"
import Infobox from './Infobox'
import {LineGraph, BarGraph} from './Graph'


class Summary extends Component {
    
    
    render() {
        let graphs = this.props.graphTypes.map((el, idx) => {
            if (el === "bar") return <BarGraph key={idx} title={this.props.titles[idx]} data={this.props.data[idx]} datakeys={this.props.datakeys[idx]} brackets={this.props.brackets[idx]}></BarGraph>
            else if (el === "line") return <LineGraph key={idx} title={this.props.titles[idx]} data={this.props.data[idx]} datakeys={this.props.datakeys[idx]}></LineGraph>
            else return <div></div>
        })
        return (
            <div className="summary">
                <Infobox name={this.props.name} count={this.props.count}></Infobox>
                {graphs}
            </div>
        )
    }
}

export default Summary