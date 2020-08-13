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
                                <input type="file" id="img-file" name="profileImg" className="file-upload-input" required />
                            </div>
                            <div className="cv-upload mb-3">
                                <label htmlFor="img-file">Your cv/resume : </label>
                                <input type="file" id="img-file" name="profileCv" className="file-upload-input" />
                            </div>
                        </div>
                        <div className="profile-title-container">
                            <label htmlFor="title">Your Title : </label>
                            <input type="text" id="title" name="title" className="input-title" placeholder="Enter a single sentence description of your professional skills/experience(e.g Web Designer)" required />
                            <div className="row mt-3">
                                <label htmlFor="description" className="ml-3">Overview : </label>
                                <textarea id="description" name="description" className="input-description" placeholder="Use this space to show clients you have the skills and experience they're looking for.Keep it short and make sure it's error-free." required></textarea>
                            </div>
                        </div>
                        <div className="input-select-container mt-3">
                            <div className="availablity-container">
                                <label htmlFor="availability">Availability : </label>
                                <select className="select-availability" id="availability" name="availability" required>
                                    <option value="" disabled selected>Choose...one</option>
                                    <option value="More than 30 hrs/week">More than 30 hrs/week</option>
                                    <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
                                    <option value="As needed - open to offers">As needed - open to offers</option>
                                </select>
                            </div>
                            <div className="hourly-rate-container">
                                <label htmlFor="hourlyRate">Hourly Rate : </label>
                                <i className="fa fa-usd dolar-icon" aria-hidden="true"></i>
                                <input type="text" id="hourlyRate" name="hourlyRate" placeholder="Your profile rate" className="hourly-rate-input" required />
                            </div>
                            <div className="project-preference-container mt-3">
                                <label htmlFor="projectPreference">Project preferences : </label>
                                <select className="select-project-preference" id="projectPreference" name="projectPreference" required>
                                    <option value="" disabled selected>Choose...one</option>
                                    <option value="Both Short term & long term projects">Both Short term & long term projects</option>
                                    <option value="Long term projects(3+ months)">Long term projects(3+ months)</option>
                                    <option value="Short term projects(less than 3 months)">Short term projects(less than 3 months)</option>
                                </select>
                            </div>
                            <div className="experience-level-container mt-3">
                                <label htmlFor="experienceLevel">Experience Level : </label>
                                <select className="select-experience-level" id="experienceLevel" name="experienceLevel" required>
                                    <option value="" disabled selected>Choose...one</option>
                                    <option value="Entry level">Entry level</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                            <div className="language-container mt-3">
                                <label htmlFor="language">Language : </label>
                                <input type="text" id="language" name="language" className="language-input"
                                    aria-describedby="language-help" placeholder="Enter one language..." />
                                <label htmlFor="proficiency">Proficiency : </label>
                                <select id="proficiency" className="select-language-proficiency" name="languageProficiency">
                                    <option value="" selected disabled>Please select...</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Conversational">Conversational</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Nativ or Bilingual">Nativ or Bilingual</option>
                                </select>
                                <h6 id="language-help" className="form-text text-info">Language you know for professional communication.</h6>
                            </div>
                            <div className="row category-container mt-3">
                                <div className="col-2">
                                    <p className="category-header">Categories : </p>
                                </div>
                                <div className="col-10">
                                    <div className="category-checkbox-container">
                                        <label style={{ fontSize: "20px" }} className="category-label">Web, Mobile & Software Dev
                                    <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Data Science & Analytics
                                    <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Sales & Marketing
                                    <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">IT & Networking
                                    <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Design & Creative
                                    <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row skill-container mt-3">
                                <label htmlFor="skill" className="ml-3">Skills : </label>
                                <textarea id="skill" name="skills" className="input-skill" placeholder="Enter all the skills you have according to your selected category seperated by comma','(e.g Javascript, SEO - Search Engine Optimization...etc.)" required></textarea>
                            </div>
                        </div>
                        <div className="row education-details-container mt-3">
                            <div className="col-2">
                                <p className="category-header">Education : </p>
                            </div>
                            <div className="col-10">
                                <div className="education-container">
                                    <label style={{ fontSize: "20px" }} htmlFor="college">College/University : </label>
                                    <input type="text" className="input-college mb-3" id="college" name="college" placeholder="Enter your school/college/university name...(e.g Oxford university)" />
                                    <label style={{ fontSize: "20px" }} htmlFor="degree">Degree : </label>
                                    <input type="text" name="degree" id="degree" className="input-colege-degree mb-3" placeholder="Enter your degree...(e.g Bachelor of computer application(B.C.A))" />
                                    <label style={{ fontSize: "20px" }} htmlFor="date-attended">Dates attended : </label>
                                    <input type="date" id="date-attended" className="date-input-from" name="dateStart" max="2019-12-31" />
                                    <label style={{ fontSize: "18px" }} htmlFor="date-ended">to</label>
                                    <input type="date" id="date-ended"
                                        className="date-input-to" name="dateEnd" max="2024-12-31" />
                                </div>
                            </div>
                        </div>
                        <div className="row specialization-container mt-3">
                            <div className="col-3">
                                <p className="category-header">Specialization : </p>
                            </div>
                            <div className="col-9">
                                <div className="row specialized-title-container">
                                    <label style={{ fontSize: "20px" }} htmlFor="specialzed-title">Title : </label>
                                    <input type="text" name="specialzedTitle" id="specialzed-title" className="specialized-title-input" placeholder="Enter in which you are specialzed...(e.g Back-End-Development)" />
                                </div>
                                <div className="row mt-3">
                                    <label style={{ fontSize: "20px" }} htmlFor="specialzed-skill">Skills : </label>
                                    <textarea id="specialzed-skill" name="specialzedSkills" className="specialzed-skill-input" placeholder="Enter all the skills you have according to your specializtion seperated by comma','(e.g Node.js, Mongodb...etc.)"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row personal-info-container mt-3">
                            <div className="col-3">
                                <p className="category-header">Personal Info : </p>
                            </div>
                            <div className="col-9">
                                <label style={{ fontSize: "20px" }} htmlFor="cityName">City : </label>
                                <input type="text" id="cityName" name="cityName" className="city-name-input mr-5" placeholder="Enter your city name.." required />
                                <label style={{ fontSize: "20px" }} htmlFor="stateName">State : </label>
                                <input type="text" id="stateName" name="stateName" className="city-name-input" placeholder="Enter your state name.." required />
                                <label style={{ fontSize: "20px" }} htmlFor="countryName">Country : </label>
                                <input type="text" id="countryName" name="countryName" className="city-name-input mr-3" placeholder="Enter your country name.." required />
                                <label style={{ fontSize: "20px" }} htmlFor="pinCode">PIN : </label>
                                <input type="text" id="pinCode" name="pinCode" className="city-name-input" placeholder="Enter your postal code.." required />
                                <label style={{ fontSize: "20px" }} htmlFor="phNo">Ph No : </label>
                                <input type="text" id="phNo" name="phNo" className="ph-no-input" placeholder="Enter your mobile no with country code.." required />
                                <label style={{ fontSize: "20px" }} htmlFor="panNo">Pancard No : </label>
                                <input type="text" id="panNo" name="panNo" className="ph-no-input" placeholder="Enter your pan card no.." required />
                                <label style={{ fontSize: "20px" }} htmlFor="adharNo">Adhar Card No : </label>
                                <input type="text" id="adharNo" name="adharNo" className="ph-no-input" placeholder="Enter your adhar card no...(only for Indian)" required />
                                <label style={{ fontSize: "20px" }} htmlFor="gstIn">GST No : </label>
                                <input type="text" id="gstIn" name="gstIn" className="ph-no-input" placeholder="Enter your GST no.." required />
                            </div>
                        </div>
                        <div className="terms-conditions-container">
                            <label style={{ color: '#fff200' }} class="terms-conditions-lable">I accept the all the terms and conditions.
                                 <input type="checkbox" name="termsConditionsCheckbox" required />
                                <span class="terms-conditions-checkmark"></span>
                            </label>
                        </div>
                        <div className="submit-profile-info">
                            <input type="submit" className="profile-info-submit-btn" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditFreelancerProfilePage