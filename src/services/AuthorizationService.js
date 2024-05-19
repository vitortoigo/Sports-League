import http from "./HttpService";
import Cookies from "vue-cookies";

const TOKEN_COOKIE_NAME = "token";

class AuthorizationService {
	getToken() {
		if (!this.hasToken()) this.setToken();
		return Cookies.get(TOKEN_COOKIE_NAME);
	}

	async setToken() {
		try {
			const { data } = await http.get(`${process.env.VUE_APP_VERSION}/getAccessToken`);
			if (data.success) Cookies.set(TOKEN_COOKIE_NAME, data.access_token, "3d", "/");
		} catch (error) {
			console.error("Failed to get token:", error);
		}
	}

	hasToken() {
		return Cookies.isKey(TOKEN_COOKIE_NAME);
	}
}

export default new AuthorizationService();
