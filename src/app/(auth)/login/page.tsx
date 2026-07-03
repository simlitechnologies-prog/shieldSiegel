"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn } from "lucide-react";
import { AuthCard } from "@/components/layout/auth-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginValues) {
    setError(null);
    try {
      // await signIn(values); // wire up once Firebase is configured
      console.log("login attempt", values);
      setError("Authentication is not yet connected. Add your Firebase config to lib/firebase.ts.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to access your client portal."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-[var(--color-gold)] hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} error={!!errors.email} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-[var(--color-gold)] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password")} error={!!errors.password} />
          <FieldError message={errors.password?.message} />
        </div>
        {error && <p className="text-xs text-amber-600">{error}</p>}
        <Button type="submit" variant="gold" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Signing in..." : "Sign In"} <LogIn className="h-4 w-4" />
        </Button>
      </form>
    </AuthCard>
  );
}
