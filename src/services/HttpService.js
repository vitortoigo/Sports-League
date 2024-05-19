import axios from "axios";
import AuthorizationService from "./AuthorizationService";

const http = axios.create({
	baseURL: process.env.VUE_APP_API_BASE_URL,
	// withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export function setAuthorizationHeader() {
	const token = AuthorizationService.getToken();
	http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default http;
