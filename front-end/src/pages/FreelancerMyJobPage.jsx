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
                    <h2>Name : {this.props.userObj.user.userName}</h2>
                    {this.props.userObj.user.isClient && <button className="btn btn-success">Client profile jobs</button>}
                </div>
                <div className="Posted-job-Container">
                    <h4>Saved jobs : </h4>
                    <div className="job-content-container">
                        <h6>No job saved yet</h6>
                    </div>
                </div>
                <div className="Posted-job-Container">
                    <h4>Current applied jobs : </h4>
                    <div className="job-content-container">
                        <h6>No job applied yet</h6>
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