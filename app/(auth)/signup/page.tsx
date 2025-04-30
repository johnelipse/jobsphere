import SignUpForm from "@/components/sign-up-form";
import { siteConfig } from "@/constants/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a company account to manage your employees",
};

export default function SignUpPage() {
  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-screen flex-col p-10 text-white lg:flex dark:border-r">
        <img
          src="/signup.png"
          alt="Authentication background"
          className="absolute inset-0 object-cover w-full h-full brightness-50"
        />
        <Link href="/" className="flex items-center">
          <Image
            width={324}
            height={124}
            src="/app-logo.png"
            className="w-auto h-[2.7rem]"
            alt="logo"
          />
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform is a smart job-connecting platform designed to
              seamlessly link employers with qualified job seekers, offering
              tools for job posting, applicant tracking, hiring, and activity
              logging—all within a modern, efficient, and user-friendly system."
            </p>
            <footer className="text-sm">
              John Banyweire, Web Developder at Desishub
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Your First account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
