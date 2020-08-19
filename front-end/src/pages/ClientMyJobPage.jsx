import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mergeStateToProps } from '../redux/mapStateToProps'
import '../styles/MyJobPage.css'

class ClientMyJobPage extends Component {

    handleClickPostJobPage = () => {
        this.props.history.push("/jobPost")
    }

    render() {
        return (
            <div className="container">
                <div className="my-job-header">
                    <h2>Company : {this.props.userObj.user.companyName}</h2>
                    <button onClick={this.handleClickPostJobPage} className="btn btn-success">Post a Job</button>
                    {this.props.userObj.user.isFreelancer && <button className="btn btn-success">Freelancer profile jobs</button>}
                </div>
                <div className="Posted-job-Container">
                    <h4>Current posted jobs : </h4>
                    <div className="job-content-container">
                        <h6>No job posted yet</h6>
                    </div>
                </div>
                <div className="ongoing-project-container">
                    <h4>Ongoing Projects : </h4>
                    <div className="job-content-container">
                        <h6>No content available</h6>
                    </div>

                </div>
                <div className="job-history-container">
                    <h4>Job history : </h4>
                    <div className="job-content-container">
                        <h6>No content available</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mergeStateToProps)(ClientMyJobPage)