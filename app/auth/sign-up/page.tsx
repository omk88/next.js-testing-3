"use client";

import { signUpSchema } from "@/app/schemas/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import z from "zod";

export default function SignUpPage() {

    const form = useForm({ 
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password
        });
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field}/>
                                    { fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    ) }
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="john@doe.com" type="email" {...field}/>
                                    { fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    ) }
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="*****" type="password" {...field}/>
                                    { fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    ) }
                                </Field>
                            )}
                        />
                        <Button>Sign up</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}