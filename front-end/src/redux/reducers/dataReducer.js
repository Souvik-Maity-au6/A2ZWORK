import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	FETCH_ALL_OPEN_JOBS,
	FETCH_JOB_DETAILS,
	FETCH_CLIENT_ALL_JOBS,
	FETCH_ALL_JOB_APPLICATIONS,
} from "../actionTypes";

const initialState = {
	userProfile: null,
	isFetching: false,
	allOpenJobs: null,
	jobDetails: null,
	allClientJobs: null,
	allJobApplications: null,
};

const dataReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_USER_PROFILE_DATA:
			return { ...state, userProfile: payload };
		case TOGGLE_FETCHING:
			return { ...state, isFetching: !state.isFetching };
		case FETCH_ALL_OPEN_JOBS:
			return { ...state, allOpenJobs: payload };
		case FETCH_JOB_DETAILS:
			return { ...state, jobDetails: payload };
		case FETCH_CLIENT_ALL_JOBS:
			return { ...state, allClientJobs: payload };
		case FETCH_ALL_JOB_APPLICATIONS:
			return { ...state, allJobApplications: payload };
		default:
			return state;
	}
};

export default dataReducer;
