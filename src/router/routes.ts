import { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        meta: { title: "Home", authRequired: false },
        component: () => import("@/pages/Home.vue"),
    },
    {
        path: "/product-detail/:id",
        name: "Detail Product",
        meta: { title: "Detail Product", authRequired: false },
        component: () => import("@/pages/Product-Detail.vue"),
    },
    {
        path: "/profile/account",
        name: "Account",
        meta: { title: "Account", authRequired: true },
        component: () => import("@/pages/account/index.vue"),
    },
    {
        path: "/profile/address",
        name: "Address",
        meta: { title: "Address", authRequired: true },
        component: () => import("@/pages/address/index.vue"),
    },
    {
        path: "/profile/orders",
        name: "Orders",
        meta: { title: "Orders", authRequired: true },
        component: () => import("@/pages/orders/index.vue"),
    },
    {
        path: "/carts",
        name: "Carts",
        meta: { title: "Carts", authRequired: true },
        component: () => import("@/pages/cart/index.vue"),
    },
];

export default routes;
