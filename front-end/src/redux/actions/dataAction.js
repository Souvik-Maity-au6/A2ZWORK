import axios from "../../axios";

export const editFreelancerProfile = mainProfileData => async () => {
	console.log(mainProfileData);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditUserProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			resolve(response.data);
		} catch (err) {
			console.error(err.response.data);
			reject(err);
		}
	});
};
