import axios from "axios";
import keys from "../../config";
import {
	SET_USER,
	TOGGLE_AUTHENTICATING,
	LOGOUT_USER,
	EXPIRE_USER_TOKEN,
	UPDATE_USER_TOKEN,
} from "../actionTypes";

export const userRegistration = newUser => async dispatch => {
	try {
		dispatch({ type: TOGGLE_AUTHENTICATING });
		const response = await axios.post(
			`${keys.BASE_URL_LOCAL}/userRegister`,
			newUser,
		);
		console.log(response.data);
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_AUTHENTICATING });
	}
};

export const userLogin = currentUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log(currentUser);
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(`${keys.BASE_URL_LOCAL}/userLogin`, {
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

export const userLogout = () => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	try {
		const authentication = await checkAuthentication();
		if (authentication.hasOwnProperty("refreshToken")) {
			dispatch({ type: UPDATE_USER_TOKEN, payload: authentication });
			const response = await axios.delete(`${keys.BASE_URL_LOCAL}/userLogout`, {
				headers: {
					Authorization: `${authentication.accessToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
			dispatch({ type: LOGOUT_USER });
		} else if (authentication.msg === "Your token is not expired") {
			const response = await axios.delete(`${keys.BASE_URL_LOCAL}/userLogout`, {
				headers: {
					Authorization: `${accessToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
			dispatch({ type: LOGOUT_USER });
		} else {
			dispatch({ type: EXPIRE_USER_TOKEN });
		}
	} catch (err) {
		console.error(err.response);
	}
};

export const routeProtection = () => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	const refreshToken = getState().userState.user.refreshToken;
	try {
		const response = await axios.get(
			`${keys.BASE_URL_LOCAL}/checkAuthentication`,
			{
				headers: {
					Authorization: `${accessToken},${refreshToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		);
		console.log(response.data);
		if (response.data.hasOwnProperty("refreshToken")) {
			dispatch({ type: UPDATE_USER_TOKEN, payload: response.data });
		} else if (
			response.data.msg ===
			"Authentication failed...Your session has been expired...pls login again"
		) {
			dispatch({ type: EXPIRE_USER_TOKEN });
		}
	} catch (err) {
		console.error(err.response.data);
		dispatch({ type: EXPIRE_USER_TOKEN });
	}
};

export const checkAuthentication = async () => {
	const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
	const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;
	try {
		const response = await axios.get(
			`${keys.BASE_URL_LOCAL}/checkAuthentication`,
			{
				headers: {
					Authorization: `${accessToken},${refreshToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		);
		// console.log("xx", response.data);
		return response.data;
	} catch (err) {
		console.error(err.response.data);
		return err.response.data;
	}
};
