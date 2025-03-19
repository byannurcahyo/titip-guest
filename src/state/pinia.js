import { useAuthStore } from "./pinia/auth";
import { useUserStore } from "./pinia/user";
import { useSellerRequestStore } from "./pinia/seller-request";
import { useSellerStore } from "./pinia/seller";
import { useOrderStore } from "./pinia/order";
import { useOrderDetailsStore } from "./pinia/order-details";
import { useProductStore } from "./pinia/product";
import { createPinia } from "pinia";

const pinia = createPinia();
export default pinia;

export {
    useAuthStore,
    useUserStore,
    useSellerRequestStore,
    useSellerStore,
    useOrderStore,
    useOrderDetailsStore,
    useProductStore,
};
