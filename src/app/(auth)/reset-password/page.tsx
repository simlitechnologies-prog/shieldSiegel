"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyRound, CheckCircle2 } from "lucide-react";
import { AuthCard } from "@/components/layout/auth-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { Button } from "@/components/ui/button";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type Values = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [done, setDone] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    console.log("password reset", values);
    setDone(true);
  }

  return (
    <AuthCard title="Set a new password" description="Choose a strong password for your account.">
      {done ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-9 w-9 text-[var(--color-gold)]" />
          <p className="text-sm text-[var(--color-slate)]">Your password has been updated.</p>
          <Link href="/login" className="text-sm font-semibold text-[var(--color-gold)] hover:underline">
            Continue to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" {...register("password")} error={!!errors.password} />
            <FieldError message={errors.password?.message} />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} error={!!errors.confirmPassword} />
            <FieldError message={errors.confirmPassword?.message} />
          </div>
          <Button type="submit" variant="gold" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Updating..." : "Update Password"} <KeyRound className="h-4 w-4" />
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
