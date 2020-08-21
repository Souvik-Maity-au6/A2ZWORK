import React, { Component } from 'react'
import '../styles/JobDetailsPage.css'

const initialState = {
    starRating: "",
}

class JobApplication extends Component {
    state = initialState
    componentDidMount() {
        (() => {
            const freelancerRatings = this.props.application.jobDetails.user.avaragefreelancerRatings || 0
            const starPercentage = (freelancerRatings / 5) * 100;

            // Round to nearest 10
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

            // Set width of stars-inner to percentage
            this.setState({ starRating: starPercentageRounded })
        })()
    }

    render() {
        return (
            <div className="job-application border-bottom mb-3">
                <div className="job-application-title">
                    <h5 className="mr-auto">Name : Souvik Maity</h5>
                    <button className="btn btn-success mx-3">Hire</button>
                    <button className="btn btn-success">View profile</button>
                </div>
                <div className="stars-outer">
                    <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                </div>
                {this.props.application.jobDetails.user.avaragefreelancerRatings ? <span className="number-rating px-3">{this.props.dataObj.jobDetails.user.avaragefreelancerRatings} of {this.props.dataObj.jobDetails.user.workHistory.length} reviews</span> : <span className="number-rating px-3"> 0 of 0 reviews</span>}
                <div className="cover-letter my-3">
                    <h6>Cover Letter : </h6>
                    <p>I am seeking help to build a prototype of Rest API with Docker & Golang, based on the latest 3GPP Swagger specifications for 5G network components. Intro We are a team of 2 developers, building a prototype of HTTP2/Rest API based on current 5G specifications. We use docker & docker-compose for local development, with API application written in Go and OpenLDAP as a database (not required to have expertise). We are at the second stage of building the prototype, updating codebase with the latest 3GPP 5G standards. </p>
                </div>
            </div>
        )
    }
}

export default JobApplication