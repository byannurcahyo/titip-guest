<script setup>
import Navbar from "@/layouts/Navbar.vue";
import Footer from "@/layouts/Footer.vue";
import { Button } from "@/components/ui/button";
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <Navbar />
        <div
            class="flex flex-col items-center gap-6 px-4 lg:px-36 py-16 w-full"
        >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-24 w-full">
                <aside
                    class="flex flex-col bg-zinc-100 dark:bg-zinc-900 py-16 px-8 gap-6 rounded-md items-center h-fit"
                >
                    <div class="flex flex-col items-center gap-2">
                        <img
                            src="@/assets/no-image.png"
                            alt="Profile"
                            class="rounded-full h-16 w-16"
                        />
                        <p class="text-xl font-semibold">Enami Asa</p>
                    </div>
                    <nav class="flex flex-col w-full mt-4 space-y-2">
                        <router-link to="/profile/account">
                            <Button
                                variant="ghost"
                                class="w-full justify-start text-md font-semibold"
                                >Account</Button
                            >
                        </router-link>
                        <router-link to="/profile/address">
                            <Button
                                variant="ghost"
                                class="w-full justify-start text-md font-semibold"
                                >Address</Button
                            >
                        </router-link>
                        <router-link to="/profile/orders">
                            <Button
                                variant="ghost"
                                class="w-full justify-start text-md font-semibold"
                                >Orders</Button
                            >
                        </router-link>
                        <Button
                            variant="ghost"
                            class="w-full justify-start text-red-500 text-md font-semibold"
                            >Log Out</Button
                        >
                    </nav>
                    <Button
                        variant="secondary"
                        class="w-full mt-4 text-md font-semibold"
                        >Request Seller</Button
                    >
                </aside>
                <div class="md:col-span-2 flex flex-col gap-8 px-6 rounded-md">
                    <slot />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
