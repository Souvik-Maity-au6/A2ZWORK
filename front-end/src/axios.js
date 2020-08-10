import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

if (localStorage.getItem("user")) {
	axiosInstance.defaults.headers.common["Authorization"] = JSON.parse(
		localStorage.getItem("user"),
	).accessToken;
}
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.interceptors.request.use(
	async config => {
		console.log(config);
		return config;
	},
	error => {
		Promise.reject(error);
	},
);
axiosInstance.interceptors.response.use(
	response => {
		// console.log(response);
		return response;
	},
	async function(error) {
		const originalRequest = error.config;
		console.log(error);
		console.log(originalRequest);
		// if (error.response.status === 401 && !originalRequest._retry) {
		// 	originalRequest._retry = true;
		// 	const accessToken = await refreshAccessToken();
		// 	axios.defaults.headers.common["Authorization"] = accessToken;
		// 	return axiosApiInstance(originalRequest);
		// }
		return Promise.reject(error);
	},
);

export default axiosInstance;
