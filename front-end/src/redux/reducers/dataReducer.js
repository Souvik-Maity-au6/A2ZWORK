import { FETCH_USER_PROFILE_DATA, TOGGLE_FETCHING } from "../actionTypes";

const initialState = {
	userProfile: null,
	isFetching: false,
};

const dataReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_USER_PROFILE_DATA:
			return { ...state, userProfile: payload };
		case TOGGLE_FETCHING:
			return { ...state, isFetching: !state.isFetching };
		default:
			return state;
	}
};

export default dataReducer;
