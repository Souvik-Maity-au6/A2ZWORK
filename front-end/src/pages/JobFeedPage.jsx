import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../redux/actions/userAction'
import { headerAuthorization } from '../axios'
import '../styles/JobFeedPage.css'


class JobFeedPage extends Component {
    componentDidMount() {
        headerAuthorization()
    }
    handleLogout = async () => {
        try {
            const response = await this.props.userLogout()
            window.alert(`${response}`)

        } catch (err) {
            window.alert(`${err}`)
        }
    }
    render() {
        return (
            <div className="container text-center">
                <h1>This is Job Feed</h1>
                <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default connect(null, { userLogout })(JobFeedPage)