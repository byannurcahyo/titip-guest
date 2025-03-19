<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useAuthStore } from "@/state/pinia/auth";
import { onMounted } from "vue";
const authStore = useAuthStore();

onMounted(() => {
    window.addEventListener("message", (event) => {
        if (event.origin !== "https://admin.titip.biz.id") return;
        if (event.data.loggedIn) {
            localStorage.setItem("user_logged_in", "true");
            console.log("User status updated from admin.titip.biz.id");

            authStore.fetchUserProfile();
        }
    });
});
</script>

<template>
    <div id="app">
        <RouterView />
    </div>
</template>
