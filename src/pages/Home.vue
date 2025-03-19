<script setup>
import Navbar from "@/layouts/Navbar.vue";
import Footer from "@/layouts/Footer.vue";
import { onMounted, ref } from "vue";
import { useProductStore } from "@/state/pinia";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useColorMode } from "@vueuse/core";
import { Badge } from "@/components/ui/badge";

const productStore = useProductStore();
const rows = ref([]);

const getProducts = async () => {
    await productStore.getProductsInLandingPage();
    console.log("Product", productStore.products);
    if (productStore.products) {
        rows.value = productStore.products;
    } else {
        rows.value = [];
    }
};

const mode = useColorMode();
const plugin = Autoplay({
    delay: 1500,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
});
onMounted(async () => {
    await getProducts();
});
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <Navbar class="sticky top-0 z-50 bg-zinc-50 dark:bg-zinc-950" />
        <div class="flex-1 flex justify-center w-full px-24">
            <Carousel
                v-slot="{ canScrollNext, canScrollPrev }"
                class="relative w-full h-full justify-center items-center"
                :opts="{
                    align: 'center',
                    loop: true,
                }"
                :plugins="[plugin]"
                @mouseenter="plugin.stop"
                @mouseleave="plugin.play"
            >
                <CarouselPrevious v-if="canScrollPrev" />
                <CarouselContent class="w-full h-full">
                    <CarouselItem class="w-full h-full">
                        <img
                            src="../assets/Page1.svg"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem class="w-full h-full">
                        <img
                            src="../assets/Page2.svg"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem class="w-full h-full">
                        <img
                            src="../assets/Page3.svg"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem class="w-full h-full">
                        <img
                            src="../assets/Page4.svg"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselNext v-if="canScrollNext" />
            </Carousel>
        </div>
        <div class="flex flex-row justify-between items-center px-24 my-12">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <h1 class="text-7xl font-semibold">Simply Trusted</h1>
                    <p class="text-7xl font-bold text-zinc-500">,</p>
                </div>
                <h1 class="text-7xl font-semibold">Simply Easy</h1>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex flex-row items-center justify-end">
                    <p class="text-4xl font-caveat font-bold">Titipin</p>
                    <p class="text-xl mx-2 text-zinc-500 font-bold">-</p>
                    <p class="text-2xl font-medium">
                        Your Trusted Jastip Marketplace.
                    </p>
                </div>
                <p class="text-2xl font-medium">
                    Connecting Buyers and Sellers Seamlessly Since 2025
                </p>
            </div>
        </div>
        <h1 class="text-4xl font-semibold px-24 mb-4">New Arrivals</h1>
        <div class="grid grid-cols-4 gap-6 px-24 mb-8">
            <Card
                v-for="product in rows"
                :key="product.id"
                class="group relative space-y-4 overflow-hidden"
            >
                <figure class="group-hover:opacity-90">
                    <Badge variant="default" class="absolute top-3 end-3">
                        <span class="text-sm font-semibold">New</span>
                    </Badge>
                    <img
                        class="aspect-square w-full object-cover"
                        :src="`https://api.titip.biz.id${product.photo_url}`"
                        :alt="product.name"
                    />
                </figure>
                <CardContent class="px-4 py-0">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="text-lg">
                                <router-link
                                    :to="`/product-detail/${product.id}`"
                                    class="text-lg font-semibold"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="absolute inset-0"
                                    />
                                    {{ product.name }}
                                </router-link>
                            </h3>
                            <p
                                class="text-sm text-muted-foreground font-semibold"
                            >
                                {{ product.store_name }}
                            </p>
                        </div>
                        <p class="text-lg font-semibold pl-2">
                            Rp {{ product.price }}
                        </p>
                    </div>
                </CardContent>
                <CardFooter class="p-0"></CardFooter>
            </Card>
        </div>
        <h1 class="text-4xl font-semibold px-24 mb-4">Best Seller</h1>
        <div class="grid grid-cols-4 gap-6 px-24 mb-12">
            <Card class="group relative space-y-4 overflow-hidden">
                <figure class="group-hover:opacity-90">
                    <Badge variant="default" class="absolute top-3 end-3">
                        <span class="text-sm font-semibold">Hot</span>
                    </Badge>
                    <img
                        class="aspect-square w-full object-cover"
                        src="../assets/RMCFMZ0195-01-1.jpg"
                        alt=""
                    />
                </figure>
                <CardContent class="px-4 py-0">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="text-lg">
                                <router-link
                                    to="/product"
                                    class="text-lg font-semibold"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="absolute inset-0"
                                    />
                                    Mens Home Shirt 24/25 White
                                </router-link>
                            </h3>
                            <p
                                class="text-sm text-muted-foreground font-semibold"
                            >
                                Rama Store
                            </p>
                        </div>
                        <p class="text-lg font-semibold pl-2">$125.00</p>
                    </div>
                </CardContent>
                <CardFooter class="p-0 border-t"></CardFooter>
            </Card>
            <Card class="group relative space-y-4 overflow-hidden">
                <figure class="group-hover:opacity-90">
                    <Badge variant="default" class="absolute top-3 end-3">
                        <span class="text-sm font-semibold">Hot</span>
                    </Badge>
                    <img
                        class="aspect-square w-full object-cover"
                        src="../assets/RMCFMZ0200-1.jpg"
                        alt=""
                    />
                </figure>
                <CardContent class="px-4 py-0">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="text-lg">
                                <router-link
                                    to="/product"
                                    class="text-lg font-semibold"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="absolute inset-0"
                                    />
                                    Mens Away Shirt 24/25 Orange
                                </router-link>
                            </h3>
                            <p
                                class="text-sm text-muted-foreground font-semibold"
                            >
                                Rama Store
                            </p>
                        </div>
                        <p class="text-lg font-semibold pl-2">$125.00</p>
                    </div>
                </CardContent>
                <CardFooter class="p-0 border-t"></CardFooter>
            </Card>
            <Card class="group relative space-y-4 overflow-hidden">
                <figure class="group-hover:opacity-90">
                    <Badge variant="default" class="absolute top-3 end-3">
                        <span class="text-sm font-semibold">Hot</span>
                    </Badge>
                    <img
                        class="aspect-square w-full object-cover"
                        src="../assets/RMCFMZ0205-01.jpg"
                        alt=""
                    />
                </figure>
                <CardContent class="px-4 py-0">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="text-lg">
                                <router-link
                                    to="/product"
                                    class="text-lg font-semibold"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="absolute inset-0"
                                    />
                                    Mens Third Shirt 24/25 Charcoal
                                </router-link>
                            </h3>
                            <p
                                class="text-sm text-muted-foreground font-semibold"
                            >
                                Rama Store
                            </p>
                        </div>
                        <p class="text-lg font-semibold pl-2">$125.00</p>
                    </div>
                </CardContent>
                <CardFooter class="p-0 border-t"></CardFooter>
            </Card>
            <Card class="group relative space-y-4 overflow-hidden">
                <figure class="group-hover:opacity-90">
                    <Badge variant="default" class="absolute top-3 end-3">
                        <span class="text-sm font-semibold">Hot</span>
                    </Badge>
                    <img
                        class="aspect-square w-full object-cover"
                        src="../assets/RMCFMZ0206-01-1.jpg"
                        alt=""
                    />
                </figure>
                <CardContent class="px-4 py-0">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="text-lg">
                                <router-link
                                    to="/product"
                                    class="text-lg font-semibold"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="absolute inset-0"
                                    />
                                    Mens Goalkeeper Shirt 24/25 Green
                                </router-link>
                            </h3>
                            <p
                                class="text-sm text-muted-foreground font-semibold"
                            >
                                Rama Store
                            </p>
                        </div>
                        <p class="text-lg font-semibold pl-2">$125.00</p>
                    </div>
                </CardContent>
                <CardFooter class="p-0 border-t"></CardFooter>
            </Card>
        </div>
        <Footer />
    </div>
</template>
