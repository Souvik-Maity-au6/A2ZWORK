import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import pre_loader from '../img/pre_loader.svg';
import '../styles/JobDetailsPage.css'

const initialState = {
    rating: 0,
    feedback: "",
    pre_loader: "none",
    submit_button: "inline-block"
}

class FeedbackForm extends Component {
    state = initialState

    handleChangeRating = (newRating, name) => {
        this.setState({
            rating: newRating,
        });
    }
    handleChangeFeedback = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitFeedback = (event) => {
        event.preventDefault();
    }
    handleClickCancel = () => {
        this.props.cancelFeedbackForm()
    }
    componentWillUnmount() {
        this.setState(initialState)
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmitFeedback}>
                    <div className="row">
                        <div className="col">
                            <div className="row mt-4">
                                <label style={{ color: "black", marginRight: "110px" }}>Rating : </label>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="yellow"
                                    starHoverColor="yellow"
                                    changeRating={this.handleChangeRating}
                                    isAggregateRating={true}
                                    name='rating'
                                />

                            </div>
                            <div className="row">
                                <label htmlFor="feedback" style={{ color: "black" }}>Feedback : </label>
                                <textarea onChange={this.handleChangeFeedback} id="feedback" className="input-feedback" name="feedback" placeholder="Write your experience about this project and with the client..." value={this.state.feedback} required></textarea>
                            </div>
                            <div className="submit-feedback float-right">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                                <input type="submit" className="btn btn-success" style={{ display: this.state.submit_button }} value="submit" />
                                <button onClick={this.handleClickCancel} className="btn btn-warning mx-3">cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}


export default FeedbackForm