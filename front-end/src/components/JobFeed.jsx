import React from 'react'
import '../styles/JobFeedPage.css'

const jobDescription = (description, letterCount) => {
    if (description.length <= letterCount) {
        return description
    } else {
        return description.slice(0, letterCount) + `...`
    }
}

const JobFeed = ({ job }) => {
    return (
        <div className="job-feed-container">
            <div className="job-title">
                <h4 className="mr-auto">{job.jobTitle}</h4>
                <button className="btn btn-success mx-3" value={job._id}>View details</button>
                <button className="btn btn-warning"><i className="fas fa-heart"></i></button>
            </div>
            <div className="job-budget-container mx-3 my-3">
                <span><b>Est-Budget : </b></span>
                <span className="mx-3">{job.budgetType}</span>
                <span>${job.budgetAmount}.00</span>
            </div>
            <p className="ml-3">{jobDescription(job.jobDescription, 200)}</p>
        </div>
    )
}

export default JobFeed
