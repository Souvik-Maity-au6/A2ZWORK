import axios from "../../axios";
import { SET_USER, TOGGLE_AUTHENTICATING, LOGOUT_USER } from "../actionTypes";

export const userRegistration = newUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post("/userRegistration", newUser);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userLogin = currentUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log(currentUser);
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post("/userLogin", {
				userEmail: currentUser.email,
				password: currentUser.password,
			});
			console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userLogout = () => async dispatch => {
	try {
		const response = await axios.delete("/userLogout");
		console.log(response.data);
		dispatch({ type: LOGOUT_USER });
	} catch (err) {
		console.error(err.response);
	}
};

export const sendForgotPasswordEmail = userEmail => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post("/sendForgotPasswordEmail", userEmail);
			console.log(response.data);

			localStorage.setItem(
				"forgotPasswordToken",
				response.data.forgotPasswordToken,
			);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		}
	});
};

export const resetPassword = (forgotPasswordToken, newPassword) => async () => {
	console.log(newPassword);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`/changePassword/${forgotPasswordToken}`,
				newPassword,
			);
			console.log(response.data);
			localStorage.removeItem("forgotPasswordToken");
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		}
	});
};

// export const checkAuthentication = async () => {
// 	const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
// 	const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;
// 	try {
// 		const response = await axios.get(
// 			`${keys.BASE_URL_LOCAL}/checkAuthentication`,
// 			{
// 				headers: {
// 					Authorization: `${accessToken},${refreshToken}`,
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 				},
// 			},
// 		);
// 		// console.log("xx", response.data);
// 		return response.data;
// 	} catch (err) {
// 		console.error(err.response.data);
// 		return err.response.data;
// 	}
// };
