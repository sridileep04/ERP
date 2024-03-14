import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
// import UserSessionActions from '../actions/UserSessionActions'

import '../../static/css/login.css'

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            title: 'Data operations center',
            username: "",
            password: "",
            hint: "",
        }
    }
    static contextTypes = { router: React.PropTypes.object };
    handleChange = e => {
        var newState = {};
        newState[e.target.name] = e.target.value;
        console.log(newState);
        this.setState(newState);
    }
    isSubmit = () => {
        let postData = {
            username: this.state.username,
            password: this.state.password,
        }
        if (postData.username.length < 1) {
            this.setState({ hint: 'User name cannot be empty' });
            setTimeout(() => {
                this.setState({ hint: '' });
            }, 500);
            return
        }
        if (postData.password.length < 1) {
            this.setState({ hint: 'password can not be blank' });
            setTimeout(() => {
                this.setState({ hint: '' });
            }, 500);
            return
        }
        console.log('You can go to the login page');
        this.context.router.push('/home');
    }
    handleSignup(e) {
        e.preventDefault()
        // UserSessionActions.signup(this.state.email)
    }
    render() {
        return (
            <div className="loginContainer  -align-center">
                <div className="loginContent">
                    <div className="loginTitle">{this.state.title}</div>
                    <div className="loginText">board&nbsp;record</div>
                    <input value={this.state.username} onChange={this.handleChange} name="username" className="loginaccount" type="text"></input>
                    <input value={this.state.password} onChange={this.handleChange} name="password" className="loginPassword" type="text"></input>
                    <div className="loginBtn" onClick={this.isSubmit}>Log in</div>
                    <div className="testHint">{this.state.hint}</div>
                </div>
            </div>
        )
    }
}

module.exports = LoginForm
