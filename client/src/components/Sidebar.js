import React, {Component} from 'react'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <button onClick={this.props.handleGoToOverview}>Overview</button>
                <button onClick={this.props.handleAddSession}>Add Session</button>
                <button onClick={this.props.handleGoToSettings}>Settings</button>
                <button onClick={this.props.handleLogout}>Log out</button>
            </div>
        )
    }
}

export default Sidebar