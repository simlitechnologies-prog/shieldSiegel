"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2 } from "lucide-react";
import { AuthCard } from "@/components/layout/auth-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";

const schema = z.object({ email: z.string().email("Please enter a valid email address") });
type Values = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    console.log("password reset requested", values);
    setSent(true);
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a reset link."
      footer={
        <Link href="/login" className="font-semibold text-[var(--color-gold)] hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-9 w-9 text-[var(--color-gold)]" />
          <p className="text-sm text-[var(--color-slate)]">
            If an account exists for that email, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} error={!!errors.email} />
            <FieldError message={errors.email?.message} />
          </div>
          <Button type="submit" variant="gold" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Reset Link"} <Mail className="h-4 w-4" />
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
