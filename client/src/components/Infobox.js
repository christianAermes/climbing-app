import React, {Component} from 'react'

class Infobox extends Component {

    render() {
        let infoColor, countColor
        switch (this.props.name) {
            case "Indoor Sessions": 
                infoColor = "#6DA9E1"
                countColor = "#8BC2F5"
                break
            case "Outdoor Sessions": 
                infoColor = "#629DA5"
                countColor = "#7FB3BA"
                break
            case "Hangboard Sessions": 
                infoColor = "#196F82"
                countColor = "#248499"
                break
            case "Leader Board": 
                infoColor = "#3EA2FF"
                countColor = "#71BBFF"
                break
            default:
                infoColor = "#fff"
                countColor = "#fff"
        }
        return (
            <div className="infobox">
                <div className="info-name" style={{"background": infoColor}}>{this.props.name}</div>
                <div className="info-count" style={{"background": countColor}}>{this.props.count}</div>
            </div>
        )
    }
}

export default Infobox