import React, {Component} from 'react'

class GradeSelector extends Component {
    render() {
        return(
            <div className="grade-selector">
                <p>{this.props.grade}</p>
                <input type="number" min={0}/>
            </div>
        )
    }
}

export default GradeSelector