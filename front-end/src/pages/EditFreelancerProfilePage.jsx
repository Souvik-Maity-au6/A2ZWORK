import React, { Component } from 'react'
import '../styles/EditFreelancerProfilePage.css'

class EditFreelancerProfilePage extends Component {
    render() {
        return (
            <div className="container">
                <div className="edit-profile-container">
                    <form>
                        <div className="file-upload-container">
                            <div className="img-upload mb-3">
                                <label htmlFor="img-file">Your profile photo : </label>
                                <input type="file" id="img-file" name="profileImg" className="file-upload-input" />
                            </div>
                            <div className="cv-upload mb-3">
                                <label htmlFor="img-file">Your cv/resume : </label>
                                <input type="file" id="img-file" name="profileCv" className="file-upload-input" />
                            </div>
                        </div>
                        <div className="profile-title-container">
                            <label htmlFor="title">Your Title : </label>
                            <input type="text" id="title" name="title" className="input-title" placeholder="Enter a single sentence description of your professional skills/experience(e.g Web Designer)" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditFreelancerProfilePage