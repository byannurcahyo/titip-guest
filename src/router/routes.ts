import { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        meta: { title: "Home", authRequired: false },
        component: () => import("@/pages/Home.vue"),
    },
];

export default routes;
