import React, {Component} from 'react'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <button id="sidebar-overview-btn"   onClick={this.props.handleChangePageView}>Overview</button>
                <button id="sidebar-addSession-btn" onClick={this.props.handleChangePageView}>Add Session</button>
                <button id="sidebar-settings-btn"   onClick={this.props.handleChangePageView}>Settings</button>
                <button id="sidebar-logout-btn"     onClick={this.props.handleLogout}>Log out</button>
            </div>
        )
    }
}

export default Sidebar