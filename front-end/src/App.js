import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// Load components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Load pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/about" component={AboutPage} />
				<Route path="/register" component={RegistrationPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/forgotPassword" component={ForgotPasswordPage} />
				<Route path="/" component={HomePage} />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
