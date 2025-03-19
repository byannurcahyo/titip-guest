<script setup>
import Navbar from "@/layouts/Navbar.vue";
import Footer from "@/layouts/Footer.vue";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
    Stepper,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper";
import { Check, Circle, Dot } from "lucide-vue-next";
import { ref } from "vue";

const stepIndex = ref(1);
const steps = [
    {
        header: "Cart",
        step: 1,
        title: "Shopping Cart",
    },
    {
        header: "Checkout",
        step: 2,
        title: "Checkout Details",
    },
    {
        header: "Complete!",
        step: 3,
        title: "Order Complete",
    },
];
function onSubmit(values) {}
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <Navbar />
        <div
            class="flex flex-1 flex-col justify-start items-center mt-16 px-24 gap-8"
        >
            <Form v-slot="{ meta, values, validate }" as="" keep-values>
                <h1 class="text-5xl font-semibold">
                    {{ steps[stepIndex - 1].header }}
                </h1>
                <Stepper
                    v-slot="{
                        isNextDisabled,
                        isPrevDisabled,
                        nextStep,
                        prevStep,
                    }"
                    v-model="stepIndex"
                    class="block w-full"
                >
                    <form
                        @submit="
                            (e) => {
                                e.preventDefault();
                                validate();

                                if (stepIndex === steps.length && meta.valid) {
                                    onSubmit(values);
                                }
                            }
                        "
                    >
                        <div class="flex w-full flex-start gap-2">
                            <StepperItem
                                v-for="step in steps"
                                :key="step.step"
                                v-slot="{ state }"
                                class="relative flex w-full flex-col items-center justify-center"
                                :step="step.step"
                            >
                                <StepperSeparator
                                    v-if="
                                        step.step !==
                                        steps[steps.length - 1].step
                                    "
                                    class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                />

                                <StepperTrigger as-child>
                                    <Button
                                        :variant="
                                            state === 'completed' ||
                                            state === 'active'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        size="icon"
                                        class="z-10 rounded-full shrink-0"
                                        :class="[
                                            state === 'active' &&
                                                'ring-2 ring-ring ring-offset-2 ring-offset-background',
                                        ]"
                                        :disabled="
                                            state !== 'completed' && !meta.valid
                                        "
                                    >
                                        <Check
                                            v-if="state === 'completed'"
                                            class="size-5"
                                        />
                                        <Circle v-if="state === 'active'" />
                                        <Dot v-if="state === 'inactive'" />
                                    </Button>
                                </StepperTrigger>

                                <div
                                    class="mt-2 flex flex-col items-center text-center"
                                >
                                    <StepperTitle
                                        :class="[
                                            state === 'active' &&
                                                'text-primary',
                                        ]"
                                        class="text-sm font-semibold transition lg:text-base"
                                    >
                                        {{ step.title }}
                                    </StepperTitle>
                                </div>
                            </StepperItem>
                        </div>

                        <div
                            class="flex flex-col gap-4 my-8 justify-center items-center"
                        >
                            <template
                                v-if="stepIndex === 1"
                                class="flex flex-col gap-4"
                            >
                                <div>Step 1</div>
                            </template>

                            <template
                                v-if="stepIndex === 2"
                                class="flex flex-col gap-4"
                            >
                                <div>Step 2</div>
                            </template>

                            <template
                                v-if="stepIndex === 3"
                                class="flex flex-col gap-4"
                            >
                                <div
                                    class="flex flex-row justify-center items-center gap-2"
                                >
                                    <h1 class="text-2xl font-semibold">
                                        Thank you!
                                    </h1>
                                    <img
                                        src="@/assets/party.png"
                                        alt=""
                                        class="h-7 w-7"
                                    />
                                </div>
                                <h1 class="text-4xl font-semibold">
                                    Your order has been received
                                </h1>
                                <div
                                    class="flex flex-col gap-2 justify-center items-center"
                                >
                                    <p>
                                        You will receive an email confirmation
                                        shortly.
                                    </p>
                                    <p>
                                        Your order number is #123456. You will
                                        be receiving an email confirmation
                                        shortly.
                                    </p>
                                </div>
                            </template>
                        </div>
                        <div
                            :class="[
                                'flex items-center gap-4 mt-4',
                                stepIndex !== 3
                                    ? 'justify-end'
                                    : 'justify-center',
                            ]"
                        >
                            <Button
                                v-if="stepIndex !== 3"
                                :disabled="isPrevDisabled"
                                variant="outline"
                                size="sm"
                                class="px-8"
                                @click="prevStep()"
                            >
                                Back
                            </Button>
                            <div class="flex items-center gap-3">
                                <Button
                                    v-if="stepIndex !== 3"
                                    :type="meta.valid ? 'button' : 'submit'"
                                    :disabled="isNextDisabled"
                                    size="sm"
                                    class="px-8"
                                    @click="meta.valid && nextStep()"
                                >
                                    Next
                                </Button>
                                <Button
                                    v-if="stepIndex === 3"
                                    variant="secondary"
                                    class="px-6 rounded-full py-2"
                                    type="submit"
                                    @click="
                                        $router.push({
                                            name: 'home',
                                        })
                                    "
                                >
                                    Purchase History
                                </Button>
                            </div>
                        </div>
                    </form>
                </Stepper>
            </Form>
            <!-- <h1 class="text-5xl font-semibold">Cart</h1>
            <div class="flex flex-row">
                <div
                    class="flex flex-row justify-center items-center gap-4 border-b-2 pb-4"
                >
                    <div
                        class="px-6 py-4 bg-blue-300 rounded-full w-12 h-12 flex items-center justify-center"
                    >
                        1
                    </div>
                    <h1 class="text-2xl font-bold">Shopping Cart</h1>
                </div>
            </div> -->
        </div>
        <Footer />
    </div>
</template>
