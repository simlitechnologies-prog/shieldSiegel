"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus } from "lucide-react";
import { AuthCard } from "@/components/layout/auth-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";

const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterValues) {
    setError(null);
    console.log("register attempt", values);
    setError("Authentication is not yet connected. Add your Firebase config to lib/firebase.ts.");
  }

  return (
    <AuthCard
      title="Create your account"
      description="Set up access to your JusticeHub client portal."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--color-gold)] hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} error={!!errors.name} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} error={!!errors.email} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} error={!!errors.password} />
          <FieldError message={errors.password?.message} />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} error={!!errors.confirmPassword} />
          <FieldError message={errors.confirmPassword?.message} />
        </div>
        {error && <p className="text-xs text-amber-600">{error}</p>}
        <Button type="submit" variant="gold" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account..." : "Create Account"} <UserPlus className="h-4 w-4" />
        </Button>
      </form>
    </AuthCard>
  );
}
