import axios from "axios";
import {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
} from "../utils";
;

export const API_URL = 'https://example.com';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        Authorization: (function () {
            const token = getAccessToken();
            return `Bearer ${token}`;
        })()
    }
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error && error.response && error.response.status === 401) {

            if (getRefreshToken) {
                const refresh_token = localStorage.getItem("myapp_refreshToken");
                const access_token = localStorage.getItem("myapp_accessToken");
                axios({
                    url: `${API_URL}/auth/token/refresh`,
                    method: "post",
                    data: {
                        refresh_token: `${refresh_token}`
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`
                    }
                }).then(response => {
                    const access_token = response.data.access_token;
                    setAccessToken(access_token, refresh_token);
                    window.location.reload();
                });
            } else {
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
