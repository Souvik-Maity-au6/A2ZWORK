import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import JobFeed from '../components/JobFeed'
import { getAllOpenJobs } from '../redux/actions/dataAction'
import { mapToPropsData } from '../redux/mapStateToProps'
import Spinner from '../components/common/Spinner'
import '../styles/JobFeedPage.css'

const initialState = {
    allOpenJobs: "",
}

class JobFeedPage extends Component {
    state = initialState
    async componentDidMount() {
        try {
            const response = await this.props.getAllOpenJobs()
            this.setState({ allOpenJobs: response })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    render() {
        return (
            <div className="container mt-5">
                {/* <div className="job-search-box">
                    <form className="form-inline">
                        <input type="text" className="job-search-input" placeholder="Search jobs by category..." required />
                        <button className="btn btn-success mx-3"><i className='fas fa-search'></i></button>
                        <button className="btn btn-warning"><i className="fas fa-filter"></i></button>
                    </form>
                </div> */}
                {this.state.allOpenJobs ?
                    this.props.dataObj.allOpenJobs.map(job => <JobFeed key={job._id} job={job} />)
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mapToPropsData, { getAllOpenJobs })(JobFeedPage)