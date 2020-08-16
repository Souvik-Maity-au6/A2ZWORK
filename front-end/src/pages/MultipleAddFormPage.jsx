import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { headerAuthorization } from '../axios'
// import { editFreelancerProfile } from '../redux/actions/dataAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/MultipleAddFormPage.css'


const initialState = {
    pre_loader: "none",
    submit_button: "block",
    profileImage: "",
    resume: "",
    title: "",
    freelancerDescription: "",
    availability: "",
    hourlyRate: "",
    projectPreference: "",
    experienceLevel: "",
    languages: "",
    languageProficiency: "",
    category: "",
    skills: "",
    college: "",
    collegeDegree: "",
    startingYear: "",
    passoutYear: "",
    specializationTitle: "",
    specializationSkills: "",
    cityName: "",
    stateName: "",
    countryName: "",
    pinCode: "",
    phNo: "",
    panCardNo: "",
    adharCardNo: "",
    gstIn: "",
    acceptTermsCondition: false,

}

class MultipleAddFormPage extends Component {
    state = initialState
    componentDidMount() {
        headerAuthorization()
    }
    handleChangeProfileInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleChangeProfileImg = (event) => {
        this.setState({ profileImage: event.target.files[0] });
    }
    handleChangeCvFile = (event) => {
        this.setState({ resume: event.target.files[0] })
    }
    handleSubmitProfileData = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const formData = new FormData();
        try {
            formData.append("profileImage", this.state.profileImage);
            formData.append("resume", this.state.resume);
            formData.append("city", this.state.cityName);
            formData.append("state", this.state.stateName);
            formData.append("country", this.state.countryName);
            formData.append("pinNo", this.state.pinCode);
            formData.append("category", this.state.category);
            formData.append("collegeName", this.state.college);
            formData.append("degree", this.state.collegeDegree);
            formData.append("startingYear", this.state.startingYear);
            formData.append("passoutYear", this.state.passoutYear);
            formData.append("skills", this.state.skills);
            formData.append("medium", this.state.languages);
            formData.append("fluency", this.state.languageProficiency);
            formData.append("specializationTitle", this.state.specializationTitle)
            formData.append("specializationSkills", this.state.specializationSkills)
            formData.append("title", this.state.title)
            formData.append("availability", this.state.availability)
            formData.append("freelancerDescription", this.state.freelancerDescription)
            formData.append("phoneNo", this.state.phNo)
            formData.append("addharNo", this.state.adharCardNo)
            formData.append("panNo", this.state.panCardNo)
            formData.append("GSTIN", this.state.gstIn)
            formData.append("projectPreference", this.state.projectPreference)
            formData.append("experienceLevel", this.state.experienceLevel)
            formData.append("hourlyRate", this.state.hourlyRate)
            formData.append("acceptTermsCondition", this.state.acceptTermsCondition)
            const response = await this.props.editFreelancerProfile(formData)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.props.history.push("/freelancerProfile")

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }
    }
    componentWillUnmount() {
        this.setState(initialState)
    }
    render() {
        return (
            <div className="container">
                <div className="edit-profile-container">
                    <div className="form-info-header">
                        <h6>Please fill the fields below very carefully...all *fields are mandatory</h6>
                    </div>
                    <div className="form-category-container">
                        <h2 className="form-category-header">Portfolio</h2>
                        <form>
                            <div className="file-upload-container">
                                <div className="img-upload mb-3">
                                    <label htmlFor="img-file">Portfolio Image* : </label>
                                    <input onChange={this.handleChangePortfolioImg} type="file" id="img-file" name="portfolioImage" className="file-upload-input" required />
                                </div>
                            </div>
                            <div className="profile-title-container">
                                <label htmlFor="title">Portfolio Title* : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="title" name="companyName" className="input-title" placeholder="Enter your company name..." value={this.state.companyName} required />
                                <label htmlFor="website">Portfolio Link* : </label>
                                <input onChange={this.handleChangeProfileInput} type="url" id="website" name="portfolioLink" className="input-portfolio-link" placeholder="Enter your portfolio related link..." value={this.state.portfolioLink} required />
                                <div className="row mt-3">
                                    <label htmlFor="description" className="ml-3">Overview* : </label>
                                    <textarea onChange={this.handleChangeProfileInput} id="description" name="portfolioDescription" className="input-portfolio-description" placeholder="Enter a short description about your portfolio..." value={this.state.portfolioDescription} required></textarea>
                                </div>
                            </div>
                            <div className="pre-loader">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                            </div>
                            <div className="submit-profile-info" style={{ display: this.state.submit_button }}>
                                <input type="submit" className="profile-info-submit-btn" value="Add Portfolio" />
                            </div>
                        </form>
                    </div>
                    <div className="form-category-container">
                        <h2 className="form-category-header">Employment History</h2>
                        <form>
                            <div className="profile-title-container">
                                <label htmlFor="title">Company Name* : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="title" name="companyName" className="input-title" placeholder="Enter your company name..." value={this.state.companyName} required />
                                <label htmlFor="owner">Job Title* : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="owner" name="companyOwner" className="input-job-title" placeholder="Enter your job position..." value={this.state.companyOwner} required />
                                <label htmlFor="website">Website* : </label>
                                <input onChange={this.handleChangeProfileInput} type="url" id="website" name="companyWebsite" className="input-website" placeholder="Enter your company website link..." value={this.state.companyWebsite} required />
                                <div className="row mt-3">
                                    <label htmlFor="description" className="ml-3">Overview* : </label>
                                    <textarea onChange={this.handleChangeProfileInput} id="description" name="companyDescription" className="input-description mb-3" placeholder="Enter a short description about your job..." value={this.state.companyDescription} required></textarea>
                                </div>
                                <label htmlFor="date-attended">Employment Date* : </label>
                                <input onChange={this.handleChangeProfileInput} type="date" id="date-attended" className="date-input-from" name="startingYear" max="2019-12-31" value={this.state.startingYear} />
                                <label style={{ fontSize: "18px" }} htmlFor="date-ended">to</label>
                                <input onChange={this.handleChangeProfileInput} type="date" id="date-ended"
                                    className="date-input-to" name="passoutYear" max="2024-12-31" value={this.state.passoutYear} />
                            </div>
                            <div className="pre-loader">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                            </div>
                            <div className="submit-profile-info" style={{ display: this.state.submit_button }}>
                                <input type="submit" className="profile-info-submit-btn" value="Add Employment History" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default MultipleAddFormPage