import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import LinkedIn from 'react-linkedin-login-oauth2';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import google_icon from '../img/google_icon.svg'
import linkedin_icon from '../img/linkedin_icon.svg';
import { userRegistration } from '../redux/actions/userAction'
import pre_loader from '../img/pre_loader.svg';

import '../styles/LoginPage.css'

const initialState = {
    client: false,
    freelancer: false,
    name: "",
    email: "",
    password: "",
    pre_loader: "none",
    submit_button: "block"
}


class RegistrationPage extends Component {
    state = initialState
    handleChangeRegistration = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitRegistration = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const newUser = {
            userName: this.state.name,
            userEmail: this.state.email,
            password: this.state.password,
            isClient: this.state.client,
            isFreelancer: this.state.freelancer
        }
        try {
            const response = await this.props.userRegistration(newUser)
            Swal.fire({
                icon: 'success',
                title: `${response.title}`,
                text: `${response.text}`
            })

            this.props.history.push('/login')
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }

    }
    componentWillUnmount() {
        this.setState(initialState)
    }
    handleAcountTypeClient = () => {
        this.setState({ client: true, freelancer: false })
    }
    handleAcountTypeFreelancer = () => {
        this.setState({ client: false, freelancer: true })
    }
    handleClickLogin = () => {
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="login-container">
                <div className="login-form-container">
                    <h4 className="my-4">Get your free account</h4>
                    <div className="account-type">
                        <button onClick={this.handleAcountTypeClient} className={`account-type-button-1 ${this.state.client && 'active'}`} >Hire for a project</button>
                        <button onClick={this.handleAcountTypeFreelancer} className={`account-type-button-2 ${this.state.freelancer && 'active'}`}>Work as a freelancer</button>
                    </div>
                    <form onSubmit={this.handleSubmitRegistration}>
                        <div className="login-input-container">
                            <i className="fa fa-user user-icon" aria-hidden="true"></i>
                            <input onChange={this.handleChangeRegistration} className="user-input-field" type="text" name="name" placeholder="Name" value={this.state.name} required />
                        </div>
                        <div className="login-input-container">
                            <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                            <input onChange={this.handleChangeRegistration} className="email-input-field" type="email" name="email" placeholder="Email" value={this.state.email} required />
                        </div>
                        <div className="login-input-container">
                            <i className="fa fa-key password-icon" aria-hidden="true"></i>
                            <input onChange={this.handleChangeRegistration} className="password-input-field" type="password" name="password" placeholder="Password" value={this.state.password} required />
                        </div>
                        <div className="pre-loader">
                            <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                        </div>
                        <input className="login-button btn-warning" style={{ display: this.state.submit_button }} type="submit" value="Create My Acount" />
                    </form>
                    <div className="login-border">
                        <div className="login-border-line-1"></div>
                        <p className="mx-2 login-border-text"> or </p>
                        <div className="login-border-line-1"></div>
                    </div>
                    <div className="social-media-login">
                        <FacebookLogin
                            appId="1088597931155576"
                            fields="name,email,picture"
                            onClick="{componentClicked}"
                            callback="{responseFacebook}"
                            textButton="Continue with Facebook"
                            cssClass="facebook-login-button"
                            icon="fa-facebook px-3"
                        />
                        <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            render={renderProps => (
                                <button className="google-login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={google_icon} alt="Google" width="20" height="20" style={{ marginRight: "10px" }} />Continue with Google</button>
                            )}
                            onSuccess="{responseGoogle}"
                            onFailure="{responseGoogle}"
                            cookiePolicy={'single_host_origin'}
                        />
                        <GitHubLogin clientId="ac56fad434a3a3c1561e"
                            onSuccess="{onSuccess}"
                            onFailure="{onFailure}"
                            className="github-login-button"
                            buttonText="Continue with GitHub"
                        />
                        <LinkedIn
                            clientId="81lx5we2omq9xh"
                            onFailure="{this.handleFailure}"
                            onSuccess="{this.handleSuccess}"
                            redirectUri="http://localhost:3000/linkedin"
                            renderElement={({ onClick, disabled }) => (
                                <button className="linkedin-login-button" onClick={onClick} disabled={disabled}><img src={linkedin_icon} alt="Linkedin" width="24" height="24" style={{ marginRight: "10px" }} />Continue with LinkedIn</button>
                            )}
                        />
                    </div>
                    <div className="login-border">
                        <div className="signup-border-line-2"></div>
                        <p className="mx-2 login-border-text">Allready have an account?</p>
                        <div className="signup-border-line-2"></div>
                    </div>
                    <div className="signup-section">
                        <button onClick={this.handleClickLogin} className="login-signup-button btn-warning">Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { userRegistration })(RegistrationPage)