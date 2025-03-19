import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
    state: () => ({
        apiUrl: import.meta.env.VITE_APP_APIURL,
        orders: [],
        order: null,
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
        openForm(newAction, order) {
            this.modalAction.action = newAction;
            this.order = order;
        },
        async getOrders() {
            try {
                const url = `${this.apiUrl}/v1/orders?page=${this.current}&perPage=${this.perpage}&name=${this.searchQuery}`;
                const res = await axios.get(url);
                const orderDataList = res.data.data;
                this.orders = orderDataList;
                this.totalData = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getOrdersBySeller(sellerId) {
            try {
                const url = `${this.apiUrl}/v1/orders/?page=${this.current}&seller_id=${sellerId}&name=${this.searchQuery}`;
                const res = await axios.get(url);
                const orderDataList = res.data.data;
                this.orders = orderDataList;
                this.totalData = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getOrder(id) {
            try {
                const res = await axios.get(`${this.apiUrl}/v1/orders/${id}`);
                this.order = res.data.data;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async changePage(newPage) {
            this.current = newPage;
            await this.getOrders();
        },
        async searchOrder(query) {
            this.searchQuery = query;
            this.current = 1;
            await this.getOrders();
        },
        async addOrder(order) {
            try {
                const res = await axios.post(`${this.apiUrl}/v1/orders`, order);
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
        async updateOrder(id, order) {
            try {
                const res = await axios.put(
                    `${this.apiUrl}/v1/orders/${id}`,
                    order
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
                this.getOrders();
            }
        },
        async deleteOrder(id) {
            try {
                const res = await axios.delete(
                    `${this.apiUrl}/v1/orders/${id}`
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
                this.getOrders();
            }
        },
        resetState() {
            this.orders = [];
            this.order = null;
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
