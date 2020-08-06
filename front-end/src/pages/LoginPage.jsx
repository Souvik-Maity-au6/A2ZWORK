import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import LinkedIn from 'react-linkedin-login-oauth2';
import google_icon from '../img/google_icon.svg'
import linkedin_icon from '../img/linkedin_icon.svg';

import '../styles/LoginPage.css'

class LoginPage extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-form-container">
                    <h4 className="my-4">Log in and get to work</h4>
                    <form>
                        <div className="login-input-container">
                            <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                            <input className="email-input-field" type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="login-input-container-psw">
                            <i className="fa fa-key password-icon" aria-hidden="true"></i>
                            <input className="password-input-field" type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="error-message">
                            <Link to="/forgotPassword"><p>Forgot password?</p></Link>
                        </div>
                        <input className="login-button btn-warning" type="submit" value="Log in" />
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
                            cssClass="facebook-login-button"
                            textButton="Sign in with Facebook"
                            icon="fa-facebook px-3"
                        />
                        <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            render={renderProps => (
                                <button className="google-login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={google_icon} alt="Google" width="20" height="20" style={{ marginRight: "10px" }} />Sign in with Google</button>
                            )}
                            onSuccess="{responseGoogle}"
                            onFailure="{responseGoogle}"
                            cookiePolicy={'single_host_origin'}
                        />
                        <GitHubLogin clientId="ac56fad434a3a3c1561e"
                            onSuccess="{onSuccess}"
                            onFailure="{onFailure}"
                            className="github-login-button"
                            buttonText="Sign in with GitHub"
                        />


                        <LinkedIn
                            clientId="81lx5we2omq9xh"
                            onFailure="{this.handleFailure}"
                            onSuccess="{this.handleSuccess}"
                            redirectUri="http://localhost:3000/linkedin"
                            renderElement={({ onClick, disabled }) => (
                                <button className="linkedin-login-button" onClick={onClick} disabled={disabled}><img src={linkedin_icon} alt="Linkedin" width="24" height="24" style={{ marginRight: "10px" }} />Sign in with LinkedIn</button>
                            )}
                        />
                    </div>
                    <div className="login-border">
                        <div className="login-border-line-2"></div>
                        <p className="mx-2 login-border-text">New to A2ZWORK?</p>
                        <div className="login-border-line-2"></div>
                    </div>
                    <div className="signup-section">
                        <button className="login-signup-button btn-warning">Sign Up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage