"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { loginSchema, LoginCredentials } from "@/lib/schema";
import Logo from "./Logo";
import { useLogin } from "@/lib/api/hooks/useAuth";
import { TenantConfig } from "@/lib/tenant";
import { useTenant } from "@/components/providers/TenantProvider";

export default function LoginForm({ tenantConfig }: { tenantConfig?: TenantConfig } = {}) {
  const { tenant } = useTenant();
  const cfg = tenantConfig ?? tenant?.data ?? undefined;
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
console.log(cfg, "config")
  // Use the custom login hook
  const {
    mutate: login,
    isPending,
    // error,
  } = useLogin({
    onSuccess: () => {
      // On successful login, redirect the user
      toast.success("Login successful!");
      window.location.href = redirectUrl;
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
      // toast.error("heello", { description: error.message });
      console.log("Login error:", error);
    },
  });
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginCredentials) {
    login(values);
  }

  return (
    <div className="flex h-screen p-4 gap-10 bg-[var(--tenant-bg)]">
      {/* Left section (Illustration) */}
      <div className="hidden md:flex flex-col rounded-2xl h-full w-1/2 text-white relative bg-[var(--primary)]">
        <div className="flex justify-center h-full items-center">
          {cfg?.logo ? (
            <Image
              src={cfg.logo}
              alt={cfg.name || "Tenant logo"}
              width={400}
              height={200}
              priority
            />
          ) : (
            <Image
              src="/Onboarding.png"
              alt="XPortal illustration"
              width={500}
              height={300}
              priority
            />
          )}
        </div>
        <p className="absolute bottom-4 text-base mt-10 w-[70%] transform left-3">
          © 2025 Hunslow Accounting. All rights reserved.
        </p>
      </div>

      {/* Right section (Form) */}
      <div className="h-full  w-full md:w-1/2 max-w-md mx-auto p-4">
        <div className="mb-2">
          {cfg?.logo ? (
            <Image src={cfg.logo} alt={cfg.name || "logo"} width={120} height={40} />
          ) : (
            <Logo />
          )}
        </div>
        <h2 className="text-lg md:text-xl font-bold text-[#4A4A4A] mt-2 mb-2">
          Sign in to your account
        </h2>
        <p className=" mb-4 text-[#4A4A4A]">
          Enter your credentials to access your dashboard
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white shadow-md rounded-3xl p-6"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Email address/Username
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com/user123"
                        {...field}
                        className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </FormControl>
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </FormControl>
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-end w-full">
              {/* <FormField
                control={form.control}
                name='remember_me'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='border-primary data-[state=checked]:bg-primary'
                      />
                    </FormControl>
                    <FormLabel className='text-sm text-gray-700'>
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              /> */}
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#5D7DD4] hover:bg-primary"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Please wait</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
