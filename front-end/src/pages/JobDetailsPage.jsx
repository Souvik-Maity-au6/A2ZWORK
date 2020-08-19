import React, { Component } from 'react'
import JobApplyForm from '../components/JobApplyForm'
import '../styles/JobDetailsPage.css'

const initialState = {
    starRating: "",
    jobApply: "none"
}

class JobDetailsPage extends Component {
    state = initialState
    componentDidMount() {
        (() => {
            const starPercentage = (3.5 / 5) * 100;

            // Round to nearest 10
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

            // Set width of stars-inner to percentage
            this.setState({ starRating: starPercentageRounded })
        })()
    }
    handleClickSubmitProposal = () => {
        this.setState({ jobApply: "block" })
    }
    cancelJobApply = () => {
        this.setState({ jobApply: "none" })
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="job-details-container">
                    <div className="row">
                        <div className="col-9 border-right">
                            <h4>Part-time Senior Developer needed</h4>
                            <h6>Category : Full Stack Development</h6>
                            <p>Our company has just grown and we have 2 in-house programmers that are working on developing our website and our internal business management system. Website is built on Wordpress, but has lots of custom functionality made. For BMS, we are using Open-Source program called ERP Next.
                            Are we are looking for consultant that would:

                            -help our ideas transform into technical tasks for programmers
                            -be responsible for planning and building architecture of complex projects
                            -check the quality of programmers coding
                            -help improve our systems and identify various bugs
                            -manage tasks through programmers
                            -help them solve various difficult problems


                            So, what we are looking is not a person who will have to do the programming but someone that would lead our IT team and be an expert on our systems.
                            </p>
                            <h6>Project type : Ongoing project</h6>
                            <h6>Project duration : More than 6 months</h6>
                            <h6>Budget : Fixed price, $2000.00</h6>
                            <h6>Expert required : Intermediate Level</h6>
                            <h6>No of freelabcer required : 1</h6>
                            <h6>Project files : <span className="project-file">File 1</span> <span className="project-file">File 2</span> <span className="project-file">File 3</span></h6>
                            <h6>Skills required : </h6>
                            <span className="skill-text">API</span>
                            <span className="skill-text">Database Architecture</span>
                            <span className="skill-text">API Integration</span>
                            <span className="skill-text">CRM eCommerce Website</span>
                            <span className="skill-text">Website Optimization</span>
                            <span className="skill-text">WordPress Plugin</span>
                        </div>
                        <div className="col-3">
                            <div className="job-client-details-container">
                                <div className="project-button-container border-bottom pb-3">
                                    <button onClick={this.handleClickSubmitProposal} className="btn btn-success">Submit a Proposal</button>
                                    <button className="btn btn-warning"><i className="fa fa-heart px-3" aria-hidden="true"></i>Save Job</button>
                                    <button className="btn btn-success">Post a Job like this</button>
                                </div>
                                <div className="client-details mt-3">
                                    <h5>About the client</h5>
                                    <h6>Company : mTube</h6>
                                    <h6 className="mt-3"><i style={{ color: "#DDD110" }} className="fas fa-check-circle r-3"></i> Payment verified</h6>
                                    <div className="stars-outer">
                                        <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                                    </div>
                                    <span className="number-rating px-3">3.5 of 10 reviews</span>
                                    <h6 className="mt-3">Location : India, Punjab</h6>
                                    <h6 className="mt-3">5 Job posted</h6>
                                    <h6 className="mt-3">Total $300+ spent</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="job-details-container mt-4" style={{ display: this.state.jobApply }}>
                    <JobApplyForm jobApply={this.cancelJobApply} />
                </div>
                <div className="job-details-container mt-4">
                    <h4>Client's Job history(5)</h4>
                </div>
            </div>
        )
    }
}

export default JobDetailsPage

