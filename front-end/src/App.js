import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// Load components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RouteProtection from "./components/common/RouteProtection";
import RouteUnprotection from "./components/common/RouteUnprotection";

// Load pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import changePasswordPage from "./pages/changePasswordPage";
import JobFeedPage from "./pages/JobFeedPage";
import FreelancerProfilePage from "./pages/FreelancerProfilePage";
import EditFreelancerProfilePage from "./pages/EditFreelancerProfilePage";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/freelancerProfile" component={FreelancerProfilePage} />
				<Route
					path="/editFreelancerProfile"
					component={EditFreelancerProfilePage}
				/>
				<RouteUnprotection exact path="/about" component={AboutPage} />
				<RouteUnprotection
					exact
					path="/register"
					component={RegistrationPage}
				/>
				<RouteUnprotection exact path="/login" component={LoginPage} />
				<RouteUnprotection
					exact
					path="/forgotPassword"
					component={ForgotPasswordPage}
				/>
				<RouteProtection path="/jobFeed" component={JobFeedPage} />
				<Route
					exact
					path="/changePassword/:forgotPasswordToken"
					component={changePasswordPage}
				/>

				<RouteUnprotection path="/" component={HomePage} />
				{localStorage.getItem("user") ? (
					<Redirect to="/jobFeed" />
				) : (
					<Redirect to="/" />
				)}
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
