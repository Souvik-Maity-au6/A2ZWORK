import axios from "../../axios";
import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	SET_USER,
} from "../actionTypes";
export const editFreelancerProfile = mainProfileData => async (
	dispatch,
	getState,
) => {
	const user = getState().userState.user;
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditUserProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const addFreelancerPortfolioData = portfolioData => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/portfolioUpdate
`,
				portfolioData,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const addFreelancerEmploymentHistory = employmentHistory => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEmpHistory

`,
				employmentHistory,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const editClientProfile = mainProfileData => async (
	dispatch,
	getState,
) => {
	const user = getState().userState.user;
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditClientProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getUserProfileData = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: null,
			});
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getUserProfile
`);
			console.log(response.data.userProfile);
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: response.data.userProfile,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const downloadResume = async url => {
	const response = await fetch(url);
	const responseBlob = await response.blob();
	let newUrl = window.URL.createObjectURL(responseBlob);
	let a = document.createElement("a");
	a.href = newUrl;
	a.download = "freelancer_resume.pdf";
	a.click();
};
