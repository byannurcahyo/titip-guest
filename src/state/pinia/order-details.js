import { defineStore } from "pinia";
import axios from "axios";

export const useOrderDetailsStore = defineStore("orderDetails", {
    state: () => ({
        apiUrl: import.meta.env.VITE_APP_APIURL,
        orderDetails: [],
        orderDetail: null,
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
        openForm(newAction, orderDetail) {
            this.modalAction.action = newAction;
            this.orderDetail = orderDetail;
        },
        async getOrderDetails() {
            try {
                const url = `${this.apiUrl}/v1/order-items?page=${this.current}&perPage=${this.perpage}&name=${this.searchQuery}`;
                const res = await axios.get(url);
                const orderDetailDataList = res.data.data;
                this.orderDetails = orderDetailDataList;
                this.totalData = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getOrderDetail(id) {
            try {
                const res = await axios.get(
                    `${this.apiUrl}/v1/order-items/${id}`
                );
                this.orderDetail = res.data.data;
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
        async addOrderItem(item) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/order-items`,
                    item
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
        async updateOrderDetail(id, item) {
            try {
                const res = await axios.put(
                    `${this.apiUrl}/v1/order-items/${id}`,
                    item
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
                this.getOrderDetails();
            }
        },
        async deleteOrderDetail(id) {
            try {
                const res = await axios.delete(
                    `${this.apiUrl}/v1/order-items/${id}`
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
                this.getOrderDetails();
            }
        },
        resetState() {
            this.orderDetails = [];
            this.orderDetail = null;
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
