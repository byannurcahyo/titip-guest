<script setup>
import Navbar from "@/layouts/Navbar.vue";
import Footer from "@/layouts/Footer.vue";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, MapPin } from "lucide-vue-next";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import { Badge } from "@/components/ui/badge";
import { watchOnce } from "@vueuse/core";
import { ref, watch } from "vue";

const emblaMainApi = ref(null);
const emblaThumbnailApi = ref(null);
const selectedIndex = ref(0);

const imageFiles = [
    new URL("../assets/RMCFMZ0195-01-1.jpg", import.meta.url).href,
    new URL("../assets/RMCFMZ0200-1.jpg", import.meta.url).href,
    new URL("../assets/RMCFMZ0205-01.jpg", import.meta.url).href,
    new URL("../assets/RMCFMZ0206-01-1.jpg", import.meta.url).href,
];

const variants = [
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
];
const value = ref("");

function onSelect() {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
    emblaThumbnailApi.value.scrollTo(selectedIndex.value);
}

function onThumbClick(index) {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    emblaMainApi.value.scrollTo(index);
}

watch(selectedIndex, (newIndex) => {
    console.log("Updated main carousel index:", newIndex); // Debugging
    if (emblaMainApi.value) {
        emblaMainApi.value.scrollTo(newIndex);
    }
});
watchOnce(emblaMainApi, (api) => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
});
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Navbar class="sticky top-0 z-50 bg-zinc-50 dark:bg-zinc-950" />
        <div class="flex-1 flex-col justify-center w-full px-24">
            <div class="w-full py-4 justify-start">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/"
                                class="text-md font-semibold"
                            >
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbEllipsis class="h-4 w-4 font-semibold" />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href="/products"
                                class="text-md font-semibold"
                            >
                                Clothing
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage class="text-md font-semibold"
                                >Mens Home Shirt 24/25 White</BreadcrumbPage
                            >
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div class="flex flex-row gap-4 mb-4">
                <div class="flex flex-row w-full max-w-3xl gap-2">
                    <Carousel
                        class="relative w-1/6"
                        @init-api="(val) => (emblaThumbnailApi = val)"
                    >
                        <CarouselContent class="flex flex-col gap-2 ml-0">
                            <CarouselItem
                                v-for="(image, index) in imageFiles"
                                :key="index"
                                class="pl-0 basis-1/4 cursor-pointer"
                                @click="onThumbClick(index)"
                            >
                                <div
                                    class="p-1 border rounded-md"
                                    :class="{
                                        'border-transparent':
                                            index === selectedIndex,
                                        'opacity-80 border-transparent':
                                            index !== selectedIndex,
                                    }"
                                >
                                    <img
                                        :src="image"
                                        alt="Product thumbnail"
                                        class="w-full h-full object-cover aspect-square rounded-sm"
                                    />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                    <Carousel
                        class="relative flex-1"
                        @init-api="(val) => (emblaMainApi = val)"
                    >
                        <CarouselContent>
                            <CarouselItem
                                v-for="(image, index) in imageFiles"
                                :key="index"
                            >
                                <div class="p-1">
                                    <img
                                        :src="image"
                                        alt="Product"
                                        class="w-full h-full object-contain aspect-square rounded-md"
                                    />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
                <div class="flex flex-col gap-2 justify-start pt-4">
                    <Badge
                        class="text-sm font-semibold px-4 justify-center gap-1 w-fit"
                        variant="secondary"
                    >
                        <MapPin class="h-3 w-3" />
                        Kota Malang, Jawa Timur
                    </Badge>
                    <h1 class="text-3xl font-semibold">
                        Mens Home Shirt 24/25 White
                    </h1>
                    <p class="text-md text-muted-foreground max-w-lg mb-2">
                        Experience the ultimate comfort and style with our Men's
                        Home Shirt for the 24/25 season. Crafted from
                        high-quality materials, this shirt features a classic
                        white design that is perfect for any occasion. Whether
                        you're cheering from the stands or enjoying a casual day
                        out, this shirt ensures you look and feel your best.
                    </p>
                    <h2 class="text-2xl font-semibold">Rp 495.000,-</h2>
                    <div
                        class="flex flex-row justify-between my-4 max-w-sm gap-4"
                    >
                        <Combobox v-model="value" by="label">
                            <ComboboxAnchor as-child>
                                <ComboboxTrigger as-child>
                                    <Button
                                        variant="outline"
                                        class="justify-between"
                                    >
                                        {{ value?.label ?? "Select variant" }}
                                        <ChevronsUpDown
                                            class="ml-2 h-4 w-4 shrink-0 opacity-50"
                                        />
                                    </Button>
                                </ComboboxTrigger>
                            </ComboboxAnchor>
                            <ComboboxList>
                                <ComboboxEmpty>
                                    No variant found.
                                </ComboboxEmpty>
                                <ComboboxGroup>
                                    <ComboboxItem
                                        v-for="variant in variants"
                                        :key="variant.value"
                                        :value="variant"
                                    >
                                        {{ variant.label }}
                                        <ComboboxItemIndicator>
                                            <Check
                                                :class="cn('ml-auto h-4 w-4')"
                                            />
                                        </ComboboxItemIndicator>
                                    </ComboboxItem>
                                </ComboboxGroup>
                            </ComboboxList>
                        </Combobox>
                        <NumberField id="quantity" :default-value="0" :min="0">
                            <NumberFieldContent>
                                <NumberFieldDecrement />
                                <NumberFieldInput />
                                <NumberFieldIncrement />
                            </NumberFieldContent>
                        </NumberField>
                    </div>
                    <div class="flex flex-col justify-between max-w-sm gap-2">
                        <Button
                            variant="default"
                            class="w-full"
                            :disabled="!value || quantity <= 1"
                        >
                            Add to cart
                        </Button>
                        <Button
                            variant="secondary"
                            class="w-full"
                            :disabled="!value || quantity <= 1"
                        >
                            Buy now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
