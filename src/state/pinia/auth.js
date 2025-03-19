import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        apiUrl: import.meta.env.VITE_APP_APIURL,
        userLogin: {},
        csrfToken: "",
        bearerToken: "",
        response: {
            status: null,
            message: null,
            error: [],
        },
    }),
    actions: {
        async login(credential) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/auth/login`,
                    credential
                );
                this.response = {
                    status: res.status,
                    message: res.data.message,
                };
                const { access_token, user } = res.data.data;
                this.saveToken(access_token);
                this.saveUser(user);
                this.userLogin = user;
                return user;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                    error: error.response.data.errors,
                };
            }
        },
        async logout() {
            try {
                const token = this.getToken();
                await axios.post(
                    `${this.apiUrl}/v1/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error("Logout failed", error);
                this.response = {
                    status: error.response?.status || 500,
                    message:
                        error.response?.data?.message ||
                        "Could not logout token.",
                    error: error.response?.data?.errors || [],
                };
            } finally {
                this.userLogin = {};
                this.removeToken();
                this.removeUser();
            }
        },
        async saveUserLogin() {
            try {
                const response = await axios.get("/v1/auth/profile");
                this.userLogin = response.data.data;
                console.log("User profile", this.userLogin);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        },
        async saveToken(token) {
            localStorage.setItem("token", token);
        },
        async removeToken() {
            localStorage.removeItem("token");
        },
        getToken() {
            return localStorage.getItem("token") || "";
        },
        async saveUser(user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.userLogin = user;
        },
        async removeUser() {
            localStorage.removeItem("user");
        },
        getUser() {
            return JSON.parse(localStorage.getItem("user") || "");
        },
        async fetchUserProfile() {
            try {
                if (this.userLogin.id) {
                    this.saveUser(this.userLogin);
                    return;
                }
                const response = await axios.get(
                    `${this.apiUrl}/v1/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getToken()}`,
                        },
                    }
                );
                this.userLogin = response.data.data;
                this.saveUser(this.userLogin);

                window.localStorage.setItem("user_logged_in", "true");
            } catch (error) {
                console.error("Failed to fetch user profile", error);
                this.removeToken();
            }
        },
    },
});
