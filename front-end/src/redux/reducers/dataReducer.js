import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	FETCH_ALL_OPEN_JOBS,
	FETCH_JOB_DETAILS,
} from "../actionTypes";

const initialState = {
	userProfile: null,
	isFetching: false,
	allOpenJobs: null,
	jobDetails: null,
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
		default:
			return state;
	}
};

export default dataReducer;
