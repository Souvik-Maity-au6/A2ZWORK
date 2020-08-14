import axios from "../../axios";

export const editFreelancerProfile = mainProfileData => async () => {
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
