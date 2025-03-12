import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
} from "vue-router";
import routes from "./routes";

const isSSR = typeof window === "undefined";

const router = createRouter({
    history: isSSR ? createMemoryHistory() : createWebHistory(),
    routes,
});

export default router;
