import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mapToPropsUser } from "../redux/mapStateToProps"
import { userLogout } from '../redux/actions/userAction'
import { headerAuthorization } from '../axios'
import person_icon from '../img/person_icon.png'
import '../styles/ClientProfilePage.css'
class ClientProfilePage extends Component {
    componentDidMount() {
        headerAuthorization()
    }
    handleLogout = async () => {
        try {
            const response = await this.props.handleLogout()
            Swal.fire({
                icon: 'success',
                title: `${response}`
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="row profile-view-container mt-5">
                            <div className="col-5">
                                <div className="profile-main-container">
                                    <div className="profile-img-container">
                                        <img src="" alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} className="profile-img" width="100" height="100" />
                                    </div>
                                    <div className="profile-description">
                                        <h2>Souvik Maity <Link to="/">
                                            <i className="fa fa-check-square-o" style={{ color: "#28A745" }} aria-hidden="true"></i>
                                        </Link></h2>
                                        <h4>Company : mTube</h4>
                                        <h6>Website : <a href="https://souvik-mtube.netlify.app">https://souvik-mtube.netlify.app</a></h6>
                                        <h6>Tagline : Make your dream true.</h6>
                                        <p>I am very good at handling clients. I complete my work on time. My clients will be satisfied and my work is very accurate as given in offer.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="profile-main-button-container">
                                    <button className="btn btn-success">
                                        Edit Profile
                                    </button>
                                    <button className="btn btn-success mx-5">
                                        Freelancer Profile
                                    </button>
                                    <button onClick={this.handleLogout} className="btn btn-danger">
                                        Logout
                                    </button>
                                </div>
                                <div className="money-balance-container">
                                    <h6>Balance : </h6>
                                    <p className="px-3 mr-auto">Your balance due is <b>$0.00</b></p>
                                    <button className="btn btn-success">Pay Now</button>
                                </div>
                                <div className="work-details-container">
                                    <div className="text-center">
                                        <h6>$300+</h6>
                                        <p>Total Spendings</p>
                                    </div>
                                    <div className="text-center px-5">
                                        <h6>13</h6>
                                        <p>Total Jobs</p>
                                    </div>
                                    <div className="text-center">
                                        <h6>5</h6>
                                        <p>Total Hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col-5">
                                <div className="project-details">
                                    <h6>PAN No : </h6>
                                    <p className="px-3">123456789</p>
                                </div>
                                <div className="project-details">
                                    <h6>Adhar No : </h6>
                                    <p className="px-3">123456789</p>
                                </div>
                                <div className="project-details">
                                    <h6>GSTIN : </h6>
                                    <p className="px-3">123456789</p>
                                </div>
                                <div className="project-details">
                                    <h6>VAT ID : </h6>
                                    <p className="px-3">123456789</p>
                                </div>
                            </div>
                            <div className="col-7">
                                <h4>Company contact : </h4>
                                <div className="language">
                                    <h6>Owner : </h6>
                                    <p className="px-3">Souvik Maity</p>
                                </div>
                                <div className="language">
                                    <h6>Addresses : </h6>
                                    <p className="px-3">Paikbarh, sabang,
                                Kharagpur, West Bengal, 721144, India</p>
                                </div>
                                <div className="language">
                                    <h6>Ph no : </h6>
                                    <p className="px-3">123456789</p>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col password-security">
                                <h4>Password & security : </h4>
                                <div className="change-password-container my-3">
                                    <h6>Change Password : </h6>
                                    <p className="px-3 mr-auto">Choose a strong, unique password that’s at least 6 characters long.</p>
                                    <button className="btn btn-success btn-sm">Change</button>
                                </div>
                                <div className="change-password-container">
                                    <h6>Two-step authentication : </h6>
                                    <p className="px-3 mr-auto">Receive a six digit code by text message to enter along with your password.</p>
                                    <button className="btn btn-success btn-sm">Enable</button>
                                </div>
                                <div className="profile-security">
                                    <button className="btn btn-success btn-lg mr-5">Create a freelancer account</button>
                                    <button className="btn btn-danger btn-lg">Close account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapToPropsUser, { userLogout })(ClientProfilePage)





