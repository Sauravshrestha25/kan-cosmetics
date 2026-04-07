"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { getSessionUser, loginUser, socialLogin } from "@/lib/auth";
import { Button } from "@/Components/ui/button";
import { DividerLabel, PageContainer } from "@/Components/ui/design-system";

const REMEMBER_EMAIL_KEY = "kan-auth-remembered-email";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (getSessionUser()) {
      router.replace("/account");
      return;
    }

    const rememberedEmail = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
    const remembered = window.localStorage.getItem("kan-auth-remember-me");
    if (remembered === "true") {
      setRememberMe(true);
    }

    if (rememberedEmail) {
      setEmail(rememberedEmail);
    }
  }, [router]);

  const emailIsValid = useMemo(() => {
    if (!email) return true;
    return emailPattern.test(email.trim());
  }, [email]);

  const redirectAfterLogin = () => {
    const shouldRedirectToCheckout =
      sessionStorage.getItem("checkout-redirect") === "true";

    if (shouldRedirectToCheckout) {
      sessionStorage.removeItem("checkout-redirect");
      startTransition(() => router.push("/checkout"));
      return;
    }

    startTransition(() => router.push("/account"));
  };

  const persistRememberedEmail = (nextEmail: string) => {
    if (rememberMe) {
      window.localStorage.setItem("kan-auth-remember-me", "true");
      window.localStorage.setItem(REMEMBER_EMAIL_KEY, nextEmail.trim());
      return;
    }

    window.localStorage.removeItem("kan-auth-remember-me");
    window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setMessage("Enter a valid email address to continue.");
      return;
    }

    if (!password) {
      setMessage("Enter your password to continue.");
      return;
    }

    const result = loginUser(normalizedEmail, password);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    persistRememberedEmail(normalizedEmail);
    redirectAfterLogin();
  };

  const handleGoogleLogin = () => {
    setMessage("");
    socialLogin("Google");
    persistRememberedEmail("google@kan-demo.com");
    redirectAfterLogin();
  };

  return (
    <main className="relative h-screen overflow-hidden bg-[#fcfaf7] pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(29,44,99,0.06),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(216,178,153,0.12),_transparent_34%)]" />
      <div className="pointer-events-none absolute left-[8%] top-28 h-32 w-32 rounded-full bg-[#edf2fb] blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-20 h-28 w-28 rounded-full bg-[#f7ece8] blur-3xl" />

      <PageContainer className="flex h-full max-w-6xl items-center">
        <div className="grid h-full max-h-[calc(100vh-8rem)] w-full overflow-hidden border border-[#e7e1d8] bg-white shadow-[0_20px_60px_rgba(16,23,43,0.07)] lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="relative hidden h-full overflow-hidden bg-[#eef2f8] lg:block">
            <Image
              src="/images/model.jpg"
              alt="KAN beauty campaign"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#0f1832]/88 via-[#18254a]/42 to-[#10172b]/10" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_20%)]" />
          </aside>

          <section className="relative flex h-full flex-col overflow-hidden bg-[linear-gradient(180deg,#fffefc_0%,#fff9f5_100%)] p-4 sm:p-5 lg:p-6 xl:p-7">
            <div className="mx-auto flex h-full w-full max-w-120 flex-col overflow-hidden">
              <div className="flex justify-end border-b border-[#e8e2d8] pb-4">
                <div className="ml-auto grid grid-cols-2 gap-5 sm:gap-6">
                  <div className="border-b-2 border-[#1a2340] pb-2.5 text-center font-matter text-base font-semibold text-[#1a2340]">
                    Login
                  </div>
                  <Link
                    href="/signup"
                    className="pb-2.5 text-center font-matter text-base font-medium text-[#7a6f68] transition-colors hover:text-[#1a2340]"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center overflow-y-auto py-4 lg:py-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-3.5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-matter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#33415d]"
                      >
                        Email Address
                      </label>
                      <div className="mt-2.5 flex h-12 items-center gap-3 border border-[#d9d2c7] bg-white px-3.5 transition-colors focus-within:border-[#1d2c63] focus-within:ring-2 focus-within:ring-[#1d2c63]/10">
                        <Mail className="h-4.5 w-4.5 text-[#a08f81]" />
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="john@example.com"
                          aria-invalid={!emailIsValid}
                          className="h-full flex-1 bg-transparent font-matter text-sm text-[#10172b] outline-none placeholder:text-[#b1a69b]"
                          required
                        />
                      </div>
                      {!emailIsValid ? (
                        <p className="mt-1.5 font-matter text-xs text-[#b42318]">
                          Enter a valid email format.
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <label
                          htmlFor="password"
                          className="block font-matter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#33415d]"
                        >
                          Password
                        </label>

                        <Link
                          href="/forgot-password"
                          className="font-matter text-xs font-semibold text-[#1d2c63] transition-colors hover:text-[#10172b]"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="mt-2.5 flex h-12 items-center gap-3 border border-[#d9d2c7] bg-white px-3.5 transition-colors focus-within:border-[#1d2c63] focus-within:ring-2 focus-within:ring-[#1d2c63]/10">
                        <Lock className="h-4.5 w-4.5 text-[#a08f81]" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Enter your password"
                          className="h-full flex-1 bg-transparent font-matter text-sm text-[#10172b] outline-none placeholder:text-[#b1a69b]"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="inline-flex h-8 w-8 items-center justify-center text-[#7a6f68] transition-colors hover:text-[#10172b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d2c63]"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4.5 w-4.5" />
                          ) : (
                            <Eye className="h-4.5 w-4.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label className="inline-flex items-center gap-3 font-matter text-sm text-[#33415d]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) =>
                          setRememberMe(event.target.checked)
                        }
                        className="h-3.5 w-3.5 rounded-none border-[#c8beb2] text-[#10172b] focus:ring-[#1d2c63]"
                      />
                      <span className="text-xs sm:text-sm">
                        Remember this email
                      </span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="font-matter text-xs font-semibold text-[#1d2c63] transition-colors hover:text-[#10172b]"
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
                    disabled={isPending}
                    className="h-12 w-full rounded-none text-sm"
                  >
                    {isPending ? "Signing you in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-5 pt-1">
                  <DividerLabel
                    label="Or continue with"
                    className="justify-center text-[#b3a79a]"
                  />
                </div>

                <div className="mt-3">
                  <Button
                    type="button"
                    variant="kanSecondary"
                    size="kan"
                    disabled={isPending}
                    onClick={handleGoogleLogin}
                    className="h-12 w-full rounded-none border-[#d9d2c7] bg-white text-sm"
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
