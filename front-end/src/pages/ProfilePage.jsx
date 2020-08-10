import React, { Component } from 'react'
import '../styles/ProfilePage.css'

class ProfilePage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5">
                        <h1>Profile</h1>
                    </div>
                    <div className="col-7">
                        <h1>Edit Profile</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage