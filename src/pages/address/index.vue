<script setup>
import MainUser from "@/layouts/MainUser.vue";
</script>
<template>
    <MainUser>
        <div>
            <h2 class="text-xl font-semibold mb-6">Address</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-zinc-900 p-6 rounded-lg">
                    <h3 class="text-lg font-semibold mb-2">Rumah</h3>
                    <p class="text-sm">
                        Jl. Kebon Jeruk No. 5, Kebon Jeruk, Jakarta Barat, 11530
                    </p>
                    <button class="text-red-500 text-sm mt-2">
                        Change Address
                    </button>
                </div>
                <div class="bg-zinc-900 p-4 rounded-lg">
                    <h3 class="text-lg font-semibold mb-2">Kantor</h3>
                    <p class="text-sm">
                        Jl. Kebon Jeruk No. 5, Kebon Jeruk, Jakarta Barat, 11530
                    </p>
                    <button class="text-red-500 text-sm mt-2">
                        Change Address
                    </button>
                </div>
                <div class="bg-zinc-900 p-4 rounded-lg">
                    <h3 class="text-lg font-semibold mb-2">Kos</h3>
                    <p class="text-sm">
                        Jl. Kebon Jeruk No. 5, Kebon Jeruk, Jakarta Barat, 11530
                    </p>
                    <button class="text-red-500 text-sm mt-2">
                        Change Address
                    </button>
                </div>
            </div>
        </div>
    </MainUser>
</template>
