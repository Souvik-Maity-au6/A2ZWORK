import React, { Component } from 'react'
import '../styles/LoginPage.css'

class ForgotPasswordPage extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-form-container my-5 " style={{ padding: "46px" }}>
                    <h4 className="mb-4">Reset your password</h4>
                    <form>
                        <div className="login-input-container mb-4">
                            <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                            <input className="email-input-field" type="email" name="email" placeholder="Email" />
                        </div>
                        <input className="login-button btn-warning btn-lg mt-2" type="submit" value="Send reset email" />
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordPage