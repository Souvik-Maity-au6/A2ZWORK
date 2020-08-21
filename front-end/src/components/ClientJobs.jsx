import React from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/JobFeedPage.css'

const jobDescription = (description, letterCount) => {
    if (description.length <= letterCount) {
        return description
    } else {
        return description.slice(0, letterCount) + `...`
    }
}

const JobFeed = ({ job, history, index }) => {
    const handleClickJobDetails = (event) => {
        history.push(`/clientJobDetailsPage/${event.target.value}`)
    }
    return (
        <div className="client-job-data border-bottom py-3" >
            <div className="job-title">
                <h5 className="mr-auto">{index + 1}. {job.jobTitle}</h5>
                <button onClick={handleClickJobDetails} className="btn btn-success mx-3" value={job._id}>View details</button>
                {job.jobStatus === "open" &&
                    <>
                        <button className="btn btn-warning mx-3"><i className="fas fa-pencil-alt"></i></button>
                        <button className="btn btn-warning"><i className="fas fa-trash-alt"></i></button>
                    </>}
                {job.jobStatus === "ongoing" && <button className="btn btn-warning">Completed</button>}
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

export default withRouter(JobFeed)
