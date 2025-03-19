import { defineStore } from "pinia";
import axios from "axios";

export const useSellerStore = defineStore("seller", {
    state: () => ({
        apiUrl: import.meta.env.VITE_APP_APIURL,
        sellers: [],
        seller: null,
        response: {
            status: null,
            message: null,
            error: [],
        },
        modalAction: {
            action: "",
            modal_title: "",
            modal_button: "",
        },
        totalData: 0,
        current: 1,
        perpage: 10,
        searchQuery: "",
    }),
    actions: {
        openForm(newAction, seller) {
            this.modalAction.action = newAction;
            this.seller = seller;
        },
        async getSellers() {
            try {
                const url = `${this.apiUrl}/v1/sellers?page=${this.current}&perPage=${this.perpage}&name=${this.searchQuery}`;
                const res = await axios.get(url);
                const sellerDataList = res.data.data;
                this.sellers = sellerDataList;
                this.totalData = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getSeller(id) {
            try {
                const res = await axios.get(`${this.apiUrl}/v1/sellers/${id}`);
                this.seller = res.data.data;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async changePage(newPage) {
            this.current = newPage;
            await this.getSellers();
        },
        async searchSeller(query) {
            this.searchQuery = query;
            this.current = 1;
            await this.getSellers();
        },
        async addSeller(seller) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/sellers`,
                    seller
                );
                this.response = {
                    status: res.status,
                    message: res.data.message,
                };
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                    error: error.response.data.errors,
                };
            }
        },
        async updateSeller(id, seller) {
            try {
                const res = await axios.put(
                    `${this.apiUrl}/v1/sellers/${id}`,
                    seller
                );
                this.response = {
                    status: res.status,
                    message: res.data.message,
                };
            } catch (error) {
                this.response = {
                    status: error.status,
                    message: error.message,
                    error: error.response.data.errors,
                };
            } finally {
                this.getSellers();
            }
        },
        async deleteSeller(id) {
            try {
                const res = await axios.delete(
                    `${this.apiUrl}/v1/sellers/${id}`
                );
                this.response = {
                    status: res.status,
                    message: res.data.message,
                };
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                    error: error.response.data.errors,
                };
            } finally {
                this.getSellers();
            }
        },
        resetState() {
            this.sellers = [];
            this.seller = null;
            this.response = {
                status: null,
                message: null,
                error: [],
            };
            this.modalAction = {
                action: "",
                modal_title: "",
                modal_button: "",
            };
            this.totalData = 0;
            this.current = 1;
            this.searchQuery = "";
        },
    },
});
