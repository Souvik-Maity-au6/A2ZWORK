import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// Load components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RouteProtection from "./components/common/RouteProtection";

// Load pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import changePasswordPage from "./pages/changePasswordPage";
import JobFeedPage from "./pages/JobFeedPage";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/about" component={AboutPage} />
				<Route exact path="/register" component={RegistrationPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/forgotPassword" component={ForgotPasswordPage} />
				<RouteProtection path="/jobFeed" component={JobFeedPage} />
				<Route
					exact
					path="/changePassword/:forgotPasswordToken"
					component={changePasswordPage}
				/>
				<Route path="/" component={HomePage} />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
