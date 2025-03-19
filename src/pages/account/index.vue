<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import MainUser from "@/layouts/MainUser.vue";
</script>
<template>
    <MainUser>
        <section>
            <h2 class="text-xl font-semibold mb-2">Account Details</h2>
            <Form class="space-y-4">
                <FormField name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="John" />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>
                <FormField name="email">
                    <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="mail@landa.co.id"
                            />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>
                <FormField name="phone_number">
                    <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="081234567890" />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>
                <Button class="w-full md:w-auto">Save changes</Button>
            </Form>
        </section>
        <section>
            <h2 class="text-xl font-semibold mb-2">Password</h2>
            <Form class="space-y-4">
                <FormField name="new_password">
                    <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>
                <FormField name="confirm_password">
                    <FormItem>
                        <FormLabel>Verify new password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>
                <Button class="w-full md:w-auto">Save changes</Button>
            </Form>
        </section>
    </MainUser>
</template>
