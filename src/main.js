import { createSSRApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/state/pinia";
import "@/assets/index.css";

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
    const app = createSSRApp(App);
    app.use(router);
    app.use(pinia);
    return { app };
}
