import React, {Component} from 'react';

class RegisterScreen extends Component {
    render() {
        return (
            <div className="background">
                <h1>Register</h1>
                <form className="login-form">
                    <input type="text" placeholder="Username" autoComplete="off" id="register-username" ></input>
                    <input type="password" placeholder="Password" id="register-password" ></input>
                    <input type="password" placeholder="Confirm Password" id="register-password-confirm" ></input>
                    <input type="number" placeholder="Age" autoComplete="off" id="register-age" ></input>
                    <input type="email" placeholder="Email" autoComplete="off" id="register-email" ></input>
                    <div className="register-btn-container">
                        <button onClick={this.props.handleGoBackToLogin} id="register-screen-back2login-btn"></button>
                        <button onClick={this.props.handleRegisterSuccess}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterScreen