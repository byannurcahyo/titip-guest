import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
    state: () => ({
        apiUrl: import.meta.env.VITE_APP_APIURL,
        products: [],
        productsSeller: [],
        product: null,
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
        totalProductsSeller: 0,
        current: 1,
        perpage: 10,
        searchQuery: "",
    }),
    actions: {
        openForm(newAction, product) {
            this.modalAction.action = newAction;
            this.product = product;
        },
        async getProducts() {
            try {
                const url = `${this.apiUrl}/v1/products?page=${this.current}&perPage=${this.perpage}&name=${this.searchQuery}`;
                const res = await axios.get(url);
                const productDataList = res.data.data;
                this.products = productDataList;
                this.totalData = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getProductsInLandingPage() {
            try {
                const url = `${this.apiUrl}/v1/products?name=${this.searchQuery}`;
                const res = await axios.get(url);
                const productDataList = res.data.data;
                this.products = productDataList;
                this.totalData = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getProductsBySeller(sellerId) {
            try {
                const url = `${this.apiUrl}/v1/products?page=${this.current}&seller_id=${sellerId}&name=${this.searchQuery}`;
                const res = await axios.get(url);
                const productDataList = res.data.data;
                this.productsSeller = productDataList;
                this.totalProductsSeller = res.data.meta.total;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async getProduct(id) {
            try {
                const res = await axios.get(`${this.apiUrl}/v1/products/${id}`);
                this.product = res.data.data;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                };
            }
        },
        async changePage(newPage) {
            this.current = newPage;
            await this.getProductsBySeller();
        },
        async searchProduct(query) {
            this.searchQuery = query;
            this.current = 1;
            await this.getProductsBySeller();
        },
        async addProduct(product) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/products`,
                    product,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
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
        async updateProduct(id, product) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/products/${id}`,
                    product,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
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
                this.getProducts();
            }
        },
        async deleteProduct(id) {
            try {
                const res = await axios.delete(
                    `${this.apiUrl}/v1/products/${id}`
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
                this.getProducts();
            }
        },
        resetState() {
            this.products = [];
            this.product = null;
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
