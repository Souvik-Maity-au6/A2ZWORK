export const mapToPropsUser = reduxStore => {
	return {
		userObj: { ...reduxStore.userState },
	};
};
