import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import person_icon from '../img/person_icon.png'
import '../styles/FreelancerProfilePage.css'
class FreelancerProfileViewPage extends Component {
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
                                        <h2>Souvik Maity
                                            <i className="fa fa-check-square-o px-2" style={{ color: "#28A745" }} aria-hidden="true"></i>
                                        </h2>
                                        <h4>Web Devoloper</h4>
                                        <h6>Hourly Rate : $25.00</h6>
                                        <h6>
                                            Availability : More than 30 hrs/week
                                        </h6>
                                        <p>I am very good at handling clients. I complete my work on time. My clients will be satisfied and my work is very accurate as given in offer.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="profile-main-button-container">
                                    <Link to="/">
                                        <button className="btn btn-success">
                                            Download CV
                                    </button>
                                    </Link>
                                </div>
                                <div className="work-details-container">
                                    <div className="text-center">
                                        <h6>$300+</h6>
                                        <p>Total Earnings</p>
                                    </div>
                                    <div className="text-center px-5">
                                        <h6>13</h6>
                                        <p>Total Jobs</p>
                                    </div>
                                    <div className="text-center">
                                        <h6>5</h6>
                                        <p>Total Hours</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col specialization-container">
                                <div className="language-title">
                                    <h4>Specialization : </h4>
                                </div>
                                <h6>1. Back-End-Development</h6>
                                <div className="specialization-skill-container">
                                    <span className="ml-3"><b>Skills : </b></span>
                                    <span className="skill-text">API</span>
                                    <span className="skill-text">Database</span>
                                    <span className="skill-text">Database Architecture</span>
                                    <span className="skill-text">Database Design</span>
                                    <span className="skill-text">Database Maintenance</span>
                                    <span className="skill-text">Mongodb</span>
                                    <span className="skill-text">PostgreSQL</span>
                                    <span className="skill-text">Node Server</span>
                                </div>
                                <h6>2. Front-End-Development</h6>
                                <div className="specialization-skill-container">
                                    <span className="ml-3"><b>Skills : </b></span>
                                    <span className="skill-text">HTML</span>
                                    <span className="skill-text">CSS</span>
                                    <span className="skill-text">SASS</span>
                                    <span className="skill-text">React.js</span>
                                    <span className="skill-text">Vanila.js</span>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col-5">
                                <div className="language-title">
                                    <h4>Languages : </h4>
                                </div>
                                <div className="language-container-main">
                                    <div className="language">
                                        <h6>English : </h6>
                                        <p className="px-3">Fluent</p>
                                    </div>
                                    <div className="language">
                                        <h6>Hindi : </h6>
                                        <p className="px-3">Fluent</p>
                                    </div>
                                    <div className="language">
                                        <h6>Bengali : </h6>
                                        <p className="px-3">Native or Bilingual</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="language-title">
                                    <h4>Education : </h4>
                                </div>
                                <div className="education-main-container">
                                    <div className="education">
                                        <h6>1. College or University : </h6>
                                        <p className="px-3">Chhatrapati Shahu Ji Maharaj University</p>
                                    </div>
                                    <div className="education-details">
                                        <h6>Degree : </h6>
                                        <p className="px-3">Bachelor of Computer Applications, Computer science</p>
                                    </div>
                                    <div className="education-details">
                                        <h6>Course year : </h6>
                                        <p className="px-3">2016-2019</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col-5">
                                <div className="project-details">
                                    <h6>Project preferences : </h6>
                                    <p className="px-3">Both long term and short term projects</p>
                                </div>
                                <div className="project-details">
                                    <h6>Experience Level : </h6>
                                    <p className="pl-3">Intermediate</p>
                                </div>
                                <div className="project-details">
                                    <h6>Category : </h6>
                                    <p className="pl-3">Web, Mobile & Software Dev</p>
                                </div>
                            </div>
                            <div className="col-7">
                                <h4>Skills : </h4>
                                <div className="specialization-skill-container">
                                    <span className="skill-text">Back-End</span>
                                    <span className="skill-text">Front-End</span>
                                    <span className="skill-text">Database Design</span>
                                    <span className="skill-text">Rest API</span>
                                    <span className="skill-text">Story Writing</span>
                                    <span className="skill-text">Content Writing</span>
                                    <span className="skill-text">Javascript</span>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col">
                                <h4>Work history : </h4>
                                <div className="work-history-container">
                                    <h6>No Work History available</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col">
                                <h4>Portfolio : </h4>
                                <div className="portfolio-container">
                                    <h6>No content available</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col">
                                <div className="language-title">
                                    <h4>Employment history : </h4>
                                </div>
                                <div className="employment-history-container">
                                    <h6>No content available</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row profile-view-container mt-3">
                            <div className="col">
                                <div className="language-title">
                                    <h4>Other Experiences : </h4>
                                </div>
                                <div className="employment-history-container">
                                    <h6>No content available</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FreelancerProfileViewPage