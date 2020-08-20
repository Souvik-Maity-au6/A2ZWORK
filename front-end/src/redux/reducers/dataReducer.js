import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	FETCH_ALL_OPEN_JOBS,
} from "../actionTypes";

const initialState = {
	userProfile: null,
	isFetching: false,
	allOpenJobs: null,
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
		default:
			return state;
	}
};

export default dataReducer;
