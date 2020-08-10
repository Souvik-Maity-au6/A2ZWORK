import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../img/logo.png'
import { mapToPropsUser } from "../../redux/mapStateToProps"
import { userLogout } from '../../redux/actions/userAction'
import person_icon from '../../img/person_icon.png'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="50" height="50" alt="" loading="lazy" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-sm-5">
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">How it works</Link>
                        </li>
                    </ul>
                    <form className="form-inline mr-auto nav-search-form">
                        <input className="mr-sm-2 nav-search-input" type="search" placeholder="Search for jobs or freelancers..." required />
                        <input className="btn btn-success nav-search-button" type="submit" value="Search" />
                    </form>
                    <>
                        {props.userObj.user ?
                            <>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/myJobs" className="nav-link">My Jobs</Link>
                                    </li>
                                    <li className="nav-item ml-sm-3">
                                        <Link to="/messages" className="nav-link"><i className="fa fa-envelope pr-2" aria-hidden="true"></i>Messages</Link>
                                    </li>
                                </ul>
                                <Link to="/profile">
                                    <div className="nav-bar-profile mx-sm-3">
                                        <img src="" alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} width="50"
                                            height="50" />
                                    </div>
                                </Link>
                            </>
                            : <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item ml-sm-3">
                                    <Link to="/register" className="nav-link">Signup</Link>
                                </li>
                            </ul>}
                    </>
                </div>
            </div>
        </nav>
    )
}

export default connect(mapToPropsUser, { userLogout })(Navbar)
