<script setup>
import lightLogo from "@/assets/light-title.svg";
import { Instagram, Facebook, Youtube } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
</script>
<template>
    <div class="flex flex-col">
        <footer
            class="flex flex-col items-center gap-2 border-b bg-zinc-900 px-12 lg:h-[200px] lg:px-24 justify-center"
        >
            <div class="flex flex-row justify-between w-full">
                <div class="flex flex-row items-center gap-4 justify-start">
                    <img :src="lightLogo" alt="" class="h-10" />
                    <Separator class="bg-white h-6" orientation="vertical" />
                    <p class="text-md font-semibold text-white">
                        Your Trusted Jastip Marketplace.
                    </p>
                </div>
                <div
                    class="flex flex-row items-center gap-12 justify-end text-white text-sm font-semibold"
                >
                    <p>Home</p>
                    <p>Product</p>
                    <p>New Arrivals</p>
                    <p>About</p>
                    <p>Contact Us</p>
                </div>
            </div>
            <Separator class="bg-white mt-2" />
            <div class="flex flex-row justify-between w-full">
                <div
                    class="flex flex-row items-center gap-8 justify-start text-sm text-white"
                >
                    <div class="flex flex-row gap-2">
                        <p class="font-medium">© Byan Nur Cahyo</p>
                        <p class="font-mesium">All right reserved</p>
                    </div>
                    <p class="font-semibold">Privacy Policy</p>
                    <p class="font-semibold">Terms of Use</p>
                </div>
                <div
                    class="flex flex-row items-center gap-6 justify-end text-white text-md font-medium"
                >
                    <Instagram class="h-5 w-5" />
                    <Facebook class="h-5 w-5" />
                    <Youtube class="h-5 w-5" />
                </div>
            </div>
        </footer>
    </div>
</template>
