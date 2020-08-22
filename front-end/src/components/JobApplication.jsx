import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/JobDetailsPage.css'

const initialState = {
    starRating: "",
}

class JobApplication extends Component {
    state = initialState
    componentDidMount() {
        (() => {
            const freelancerRatings = this.props.jobApplication.clientReview.ratings
            const starPercentage = (freelancerRatings / 5) * 100;

            // Round to nearest 10
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

            // Set width of stars-inner to percentage
            this.setState({ starRating: starPercentageRounded })
        })()
    }
    handleClickViewProfile = (event) => {
        this.props.history.push(`/FreelancerProfileViewPage/${event.target.value}`)
    }
    render() {

        return (
            <div className="job-application border-bottom mb-3">
                <div className="job-application-title">
                    <h5 className="mr-auto">{this.props.index + 1}. Name : {this.props.jobApplication.userId.userName}</h5>
                    <button className="btn btn-success mx-3">Hire</button>
                    <button onClick={this.handleClickViewProfile} className="btn btn-success" value={this.props.jobApplication.userId._id}>View profile</button>
                    <button className="btn btn-success mx-3" value={this.props.jobApplication.userId._id}>Message</button>
                </div>
                <div className="stars-outer ml-3">
                    <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                </div>
                <span className="number-rating px-3"> {this.props.jobApplication.clientReview.ratings} of {this.props.jobApplication.userId.workHistory.length} reviews</span>
                <div className="cover-letter my-3 mx-3">
                    <h6>Cover Letter : </h6>
                    <p className="mx-3">{this.props.jobApplication.coverLetter}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(JobApplication)