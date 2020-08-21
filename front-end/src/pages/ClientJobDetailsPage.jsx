import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { getJobDetails, downloadResume, getAllJobApplications } from '../redux/actions/dataAction'
import { mergeStateToProps } from '../redux/mapStateToProps'
import { headerAuthorization } from '../axios'
import Spinner from '../components/common/Spinner'
import '../styles/JobDetailsPage.css'

const initialState = {
    starRating: "",
    jobApply: "none",
    jobDetails: "",
    jobApplications: "",
}

class JobDetailsPage extends Component {
    state = initialState
    async componentDidMount() {
        headerAuthorization()

        try {
            const response = await this.props.getJobDetails(this.props.match.params.jobId)
            const applicationResponse = await this.props.getAllJobApplications(this.props.match.params.jobId)
            this.setState({ jobApplications: applicationResponse })
            this.setState({ jobDetails: response })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.jobDetails !== this.state.jobDetails) {
            (() => {
                const clientRatings = this.props.dataObj.jobDetails.user.avarageClientRatings || 0
                const starPercentage = (clientRatings / 5) * 100;

                // Round to nearest 10
                const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

                // Set width of stars-inner to percentage
                this.setState({ starRating: starPercentageRounded })
            })()
        }
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
                {this.state.jobDetails ?
                    <>
                        <div className="job-details-container">
                            <div className="row">
                                <div className="col">
                                    <h4>{this.props.dataObj.jobDetails.jobTitle}</h4>
                                    <h6>Category : {this.props.dataObj.jobDetails.category}</h6>
                                    <p>{this.props.dataObj.jobDetails.jobDescription}</p>
                                    <h6>Project type : {this.props.dataObj.jobDetails.projectType}</h6>
                                    <h6>Project duration : {this.props.dataObj.jobDetails.projectDuration}</h6>
                                    <h6>Budget : {this.props.dataObj.jobDetails.budgetType}, ${this.props.dataObj.jobDetails.budgetAmount}.00</h6>
                                    <h6>Expert required : {this.props.dataObj.jobDetails.expertiseLevel}</h6>
                                    <h6>No of freelabcer required : {this.props.dataObj.jobDetails.freelancerNo}</h6>
                                    <h6>Project files : {this.props.dataObj.jobDetails.projectFile.map((file, index) =>
                                        <span key={index + 1} onClick={(event) => { downloadResume(file) }} className="project-file">File {index + 1}</span>
                                    )}
                                    </h6>
                                    <h6>Skills required : </h6>
                                    {this.props.dataObj.jobDetails.skills.map((skill, index) => <span key={index + 1} className="skill-text">{skill}</span>)}
                                </div>
                            </div>
                        </div>

                        <div className="job-details-container mt-4">
                            <h4>Job Applications(0)</h4>
                            {/* <JobApplication /> */}
                            <div className="job-application-container">
                                <h6>No Application available</h6>
                            </div>
                        </div>
                    </>
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mergeStateToProps, { getJobDetails, downloadResume, getAllJobApplications })(JobDetailsPage)

