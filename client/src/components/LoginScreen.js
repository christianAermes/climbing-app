import React, {Component} from 'react';


class LoginScreen extends Component {

    render() {
        return (
            <div className="background">
                <h1>Track your climbing progression</h1>
                <form className="login-form" onSubmit={this.props.handleLogin}>
                    <input type="text" placeholder="Username" id="login-username-input" autoComplete="off"></input>
                    <input type="password" placeholder="Password" id="login-password-input"></input>
                    <button onClick={this.props.handleLogin}>Login</button>
                    <button onClick={this.props.handleRegister}>Register</button>
                </form>
            </div>
        )
    }
}

export default LoginScreen

