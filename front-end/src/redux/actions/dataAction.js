import axios from "../../axios";
import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	SET_USER,
	FETCH_ALL_OPEN_JOBS,
	FETCH_JOB_DETAILS,
	FETCH_CLIENT_ALL_JOBS,
	FETCH_ALL_JOB_APPLICATIONS,
} from "../actionTypes";
export const editFreelancerProfile = mainProfileData => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditUserProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
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

export const editClientProfile = mainProfileData => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditClientProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
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
	a.download = "file";
	a.click();
};

export const getUserPortfolio = () => async (dispatch, getState) => {
	const userProfile = getState().dataState.userProfile;
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getUserPortfolio
`);
			console.log(response.data);
			userProfile.userPortfolio = response.data.userPortfolio;
			dispatch({ type: FETCH_USER_PROFILE_DATA, payload: userProfile });
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

export const getEmploymentHistory = () => async (dispatch, getState) => {
	const userProfile = getState().dataState.userProfile;
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getEmpHistory
`);
			console.log(response.data);
			userProfile.empHistory = response.data.empHistory;
			dispatch({ type: FETCH_USER_PROFILE_DATA, payload: userProfile });
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

export const clientJobPost = jobPostData => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/jobPost
`,
				jobPostData,
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

export const getFreelancerProfileData = freelancerId => dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: null,
			});
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getSpecificUserDetails/${freelancerId}
`);
			console.log(response.data);
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: response.data,
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

export const getAllOpenJobs = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_OPEN_JOBS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getOpenJobs`,
			);
			console.log(response.data);
			dispatch({ type: FETCH_ALL_OPEN_JOBS, payload: response.data.openJob });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getJobDetails = jobId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_JOB_DETAILS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getParticularJob/${jobId}`,
			);

			console.log(response.data);
			dispatch({ type: FETCH_JOB_DETAILS, payload: response.data.job });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getClientAllPostedJobs = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_CLIENT_ALL_JOBS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getUserJobPosted`,
			);
			console.log(response.data);
			dispatch({ type: FETCH_CLIENT_ALL_JOBS, payload: response.data });
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

export const applyJob = (jobId, coverLetter) => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/applyJob/${jobId}`,
				coverLetter,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getAllJobApplications = jobId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_JOB_APPLICATIONS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getUserAppliedJob/${jobId}`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_ALL_JOB_APPLICATIONS,
				payload: response.data.appliedJobs,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const hireFreelancer = (jobId, freelancerId, userId) => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env
					.REACT_APP_BASE_URL}/sendHireEmail/${jobId}/${freelancerId}/${userId}`,
			);

			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		}
	});
};

export const getFreelancerJobApplications = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_JOB_APPLICATIONS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/freelancerJobDetails`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_ALL_JOB_APPLICATIONS,
				payload: response.data,
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

export const getFreelancerJobApplication = jobId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_JOB_APPLICATIONS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env
					.REACT_APP_BASE_URL}/getFreelancerJobApplication/${jobId}`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_ALL_JOB_APPLICATIONS,
				payload: response.data.application,
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

export const addFreelancerReview = (jobId, review) => () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/addFreelancerReview/${jobId}`,
				review,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const addClientReview = (jobId, review) => () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/addClientReview/${jobId}`,
				review,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};
