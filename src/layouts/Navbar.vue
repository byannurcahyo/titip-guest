<script setup>
import darkLogo from "@/assets/dark-logo.svg";
import lightLogo from "@/assets/light-logo.svg";
import {
    Moon,
    Sun,
    CircleUser,
    ShoppingCart,
    SearchIcon,
} from "lucide-vue-next";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/ui/button";
const mode = useColorMode();
import { ref } from "vue";
const toggleTheme = () => {
    mode.value = mode.value === "dark" ? "light" : "dark";
};
const open = ref(false);
function handleOpenSearch() {
    open.value = !open.value;
}
const components = [
    {
        title: "New Release",
        href: "/",
        description:
            "A new product that has been released to the public for purchase.",
    },
    {
        title: "Hot Deals",
        href: "/",
        description:
            "A special offer or discount that is available for a limited time.",
    },
    {
        title: "Best Seller",
        href: "/",
        description:
            "A product that is the most popular among customers in a given category.",
    },
    {
        title: "Top Rated",
        href: "/",
        description:
            "A product that has received the highest rating from customers.",
    },
];
</script>
<template>
    <div class="flex flex-col">
        <header
            class="flex h-14 items-center gap-4 border-b bg-muted/40 px-12 lg:h-[60px] lg:px-24 justify-between"
        >
            <div class="flex flex-grow items-center gap-20">
                <router-link to="/">
                    <img
                        :src="mode === 'dark' ? lightLogo : darkLogo"
                        alt=""
                        class="h-10"
                    />
                </router-link>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/"
                            :class="navigationMenuTriggerStyle()"
                            >Home</NavigationMenuLink
                        >
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul
                                class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                            >
                                <li
                                    v-for="component in components"
                                    :key="component.title"
                                >
                                    <NavigationMenuLink as-child>
                                        <a
                                            :href="component.href"
                                            class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        >
                                            <div
                                                class="text-sm font-medium leading-none"
                                            >
                                                {{ component.title }}
                                            </div>
                                            <p
                                                class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                                            >
                                                {{ component.description }}
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            href="/product-detail/:id"
                            :class="navigationMenuTriggerStyle()"
                            >About</NavigationMenuLink
                        >
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div class="flex flex-grow items-center gap-8 justify-end">
                <div class="flex flex-row gap-2">
                    <Button variant="ghost" size="icon" class="rounded-full">
                        <SearchIcon class="h-5 w-5" @click="handleOpenSearch" />
                    </Button>
                    <router-link to="/carts">
                        <Button
                            variant="ghost"
                            size="icon"
                            class="rounded-full"
                        >
                            <ShoppingCart class="h-5 w-5" />
                        </Button>
                    </router-link>
                    <router-link to="/profile/account">
                        <Button
                            variant="ghost"
                            size="icon"
                            class="rounded-full"
                        >
                            <CircleUser class="h-5 w-5" />
                        </Button>
                    </router-link>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="relative rounded-full"
                        @click="toggleTheme"
                    >
                        <Moon
                            class="h-[1.2rem] w-[1.2rem] transition-all transform dark:-rotate-90 dark:scale-0"
                        />
                        <Sun
                            class="h-[1.2rem] w-[1.2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        />
                        <span class="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    </div>
</template>
