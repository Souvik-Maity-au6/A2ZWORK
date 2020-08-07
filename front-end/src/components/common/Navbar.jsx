import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item ml-sm-3">
                            <Link to="/register" className="nav-link">Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
