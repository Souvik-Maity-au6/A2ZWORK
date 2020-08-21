import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	FETCH_ALL_OPEN_JOBS,
	FETCH_JOB_DETAILS,
	FETCH_CLIENT_ALL_JOBS,
} from "../actionTypes";

const initialState = {
	userProfile: null,
	isFetching: false,
	allOpenJobs: null,
	jobDetails: null,
	allClientJobs: null,
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
		default:
			return state;
	}
};

export default dataReducer;
