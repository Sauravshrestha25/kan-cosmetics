"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessionUser, loginUser, socialLogin } from "@/lib/auth";
import { Button } from "@/Components/ui/button";
import {
  DividerLabel,
  PageContainer,
  SectionHeading,
} from "@/Components/ui/design-system";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (getSessionUser()) {
      router.replace("/account");
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginUser(email, password);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    if (rememberMe) {
      window.localStorage.setItem("kan-auth-remember-me", "true");
    } else {
      window.localStorage.removeItem("kan-auth-remember-me");
    }

    // Check if user was trying to checkout
    const shouldRedirectToCheckout =
      sessionStorage.getItem("checkout-redirect");
    if (shouldRedirectToCheckout) {
      sessionStorage.removeItem("checkout-redirect");
      router.push("/checkout");
    } else {
      router.push("/account");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white pt-24 pb-16">
      <div className="pointer-events-none absolute left-[8%] top-28 h-36 w-36 rounded-full bg-[#edf2fb] blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-20 h-32 w-32 rounded-full bg-[#f7ece8] blur-3xl" />

      <PageContainer className="max-w-[1100px]">
        <div className="grid min-h-168 overflow-hidden border border-[#e6eaf2] bg-white shadow-[0_30px_80px_rgba(16,23,43,0.06)] lg:grid-cols-[0.82fr_1fr]">
          <aside className="relative hidden min-h-168 bg-[#f7f9fc] lg:block">
            <Image
              src="/images/model.jpg"
              alt="KAN beauty campaign"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#10172b]/70 via-[#10172b]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10">
              <p className="font-matter text-xs uppercase tracking-[0.24em] text-white/75">
                KAN Member Access
              </p>
              <h2 className="mt-4 max-w-sm font-theseasons text-[clamp(2rem,3vw,3rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
                Return to your beauty ritual.
              </h2>
              <p className="mt-4 max-w-sm font-matter text-base leading-7 text-white/80">
                Sign in to continue browsing collections, trying shades, and
                moving through your account flow.
              </p>
            </div>
          </aside>

          <section className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
            <div className="mx-auto flex h-full w-full max-w-124 flex-col">
              <div className="grid grid-cols-2 items-end gap-8 border-b border-[#e5e7ef]">
                <div className="border-b-2 border-[#1a2340] pb-4 text-center font-matter text-[clamp(1.2rem,1.8vw,1.55rem)] font-semibold text-[#1a2340]">
                  Login
                </div>
                <Link
                  href="/signup"
                  className="pb-4 text-center font-matter text-[clamp(1.2rem,1.8vw,1.55rem)] font-medium text-[#6b7385] transition-colors hover:text-[#1a2340]"
                >
                  Sign Up
                </Link>
              </div>

              <div className="flex flex-1 flex-col pt-8">
                <SectionHeading
                  title="Welcome Back"
                  description="Enter your credentials to access your account."
                  titleClassName="font-matter text-[clamp(2.25rem,4vw,3.25rem)]"
                  descriptionClassName="text-base"
                />

                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  <div>
                    <label className="block font-matter text-base font-semibold text-[#33415d]">
                      Email Address
                    </label>
                    <div className="mt-3 flex h-14 items-center gap-3 border border-[#dce1ea] bg-[#fbfcfe] px-4 transition-colors focus-within:border-[#1d2c63] focus-within:bg-white">
                      <Mail className="h-5 w-5 text-[#a8afbd]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="john@example.com"
                        className="h-full flex-1 bg-transparent font-matter text-base text-[#10172b] outline-none placeholder:text-[#a8afbd]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-matter text-base font-semibold text-[#33415d]">
                      Password
                    </label>
                    <div className="mt-3 flex h-14 items-center gap-3 border border-[#dce1ea] bg-[#fbfcfe] px-4 transition-colors focus-within:border-[#1d2c63] focus-within:bg-white">
                      <Lock className="h-5 w-5 text-[#a8afbd]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="••••••••"
                        className="h-full flex-1 bg-transparent font-matter text-base text-[#10172b] outline-none placeholder:text-[#a8afbd]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="cursor-pointer text-[#a8afbd] transition-colors hover:text-[#10172b]"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 font-matter text-sm text-[#33415d] sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) =>
                          setRememberMe(event.target.checked)
                        }
                        className="h-4 w-4 accent-[#10172b]"
                      />
                      <span>Remember me</span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="font-semibold transition-colors hover:text-[#1d2c63]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {message ? (
                    <p className="border border-[#f1d5d2] bg-[#fef3f2] px-4 py-3 font-matter text-sm text-[#b42318]">
                      {message}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    variant="kanPrimary"
                    size="kan"
                    className="h-14 w-full rounded-none text-base"
                  >
                    Login
                  </Button>
                </form>

                <div className="mt-8 pt-2">
                  <DividerLabel
                    label="Or continue with"
                    className="justify-center"
                  />
                </div>

                <div className="mt-6">
                  <Button
                    type="button"
                    variant="kanSecondary"
                    size="kan"
                    onClick={() => {
                      socialLogin("Google");
                      // Check if user was trying to checkout
                      const shouldRedirectToCheckout =
                        sessionStorage.getItem("checkout-redirect");
                      if (shouldRedirectToCheckout) {
                        sessionStorage.removeItem("checkout-redirect");
                        router.push("/checkout");
                      } else {
                        router.push("/account");
                      }
                    }}
                    className="h-14 w-full rounded-none text-base"
                  >
                    <span className="mr-3 inline-flex h-5 w-5 items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          d="M21.805 12.041c0-.819-.067-1.417-.211-2.037H12.2v3.708h5.513c-.111.922-.711 2.31-2.044 3.243l-.019.124 3.024 2.297.21.02c1.932-1.741 3.041-4.305 3.041-7.355Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.2 21.75c2.7 0 4.966-.87 6.621-2.354l-3.215-2.44c-.856.583-2.01.991-3.406.991-2.644 0-4.888-1.74-5.69-4.147l-.12.01-3.145 2.386-.041.113c1.644 3.204 5.038 5.441 8.996 5.441Z"
                          fill="#34A853"
                        />
                        <path
                          d="M6.51 13.8a5.886 5.886 0 0 1-.334-1.945c0-.679.122-1.338.322-1.945l-.006-.13-3.184-2.424-.104.048A9.63 9.63 0 0 0 2.1 11.855c0 1.55.377 3.017 1.104 4.45l3.306-2.505Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.2 5.763c1.755 0 2.944.747 3.622 1.375l2.645-2.525C17.155 3.405 14.9 2.25 12.2 2.25 8.242 2.25 4.848 4.487 3.204 7.691L6.51 10.196c.812-2.406 3.056-4.433 5.69-4.433Z"
                          fill="#EB4335"
                        />
                      </svg>
                    </span>
                    Continue with Google
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
