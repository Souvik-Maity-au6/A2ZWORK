import React, { Component } from 'react'
import '../styles/JobDetailsPage.css'

const initialState = {
    coverLetter: '',
}

class JobApplyForm extends Component {
    state = initialState
    handleChangeJobApply = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitJobApply = (event) => {
        event.preventDefault()

    }
    handleClickCancelJobApply = () => {
        this.props.jobApply()
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmitJobApply}>
                    <div className="row">
                        <div className="col-12">
                            <h4>Cover Letter : </h4>
                            <textarea onChange={this.handleChangeJobApply} id="coverLetter" name="coverLetter" className="input-cover-letter" placeholder="Use this space to show client you have the skills and experience for this job.Keep it short and make sure it's error-free...." value={this.state.coverLetter} required></textarea>
                            <div className="submit-button">
                                <input type="submit" className="btn btn-success mr-3" value="Submit" />
                                <button onClick={this.handleClickCancelJobApply} className="btn btn-warning">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default JobApplyForm