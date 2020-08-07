import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import LinkedIn from 'react-linkedin-login-oauth2';
import google_icon from '../img/google_icon.svg'
import linkedin_icon from '../img/linkedin_icon.svg';

import '../styles/LoginPage.css'

class RegistrationPage extends Component {
    state = {
        client: false,
        freelancer: false,
    }

    handleAcountTypeClient = () => {
        this.setState({ client: true, freelancer: false })
    }
    handleAcountTypeFreelancer = () => {
        this.setState({ client: false, freelancer: true })
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
                    <form>
                        <div className="login-input-container">
                            <i className="fa fa-user user-icon" aria-hidden="true"></i>
                            <input className="user-input-field" type="text" name="name" placeholder="Name" required />
                        </div>
                        <div className="login-input-container">
                            <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                            <input className="email-input-field" type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="login-input-container">
                            <i className="fa fa-key password-icon" aria-hidden="true"></i>
                            <input className="password-input-field" type="password" name="password" placeholder="Password" required />
                        </div>
                        <input className="login-button btn-warning" type="submit" value="Create My Acount" />
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
                        <button className="login-signup-button btn-warning">Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationPage