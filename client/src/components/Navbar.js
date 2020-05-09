import React, {Component} from 'react';
import DefaultProfileImg from '../images/profile100.png'

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <h1>ABC Climbing</h1>
                <button className="ProfileName">{this.props.username}</button>
                <img src={DefaultProfileImg} alt="Profile"></img>
            </div>
        )
    }
}

export default Navbar