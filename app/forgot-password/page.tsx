"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { PageContainer } from "@/Components/ui/design-system";
import { updatePassword } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const result = updatePassword(email, password);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    router.push("/login");
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
                  <Link
                    href="/login"
                    className="pb-2 text-center font-matter text-sm font-medium text-[#7a6f68] transition-colors hover:text-[#1a2340]"
                  >
                    Login
                  </Link>
                  <div className="border-b-2 border-[#1a2340] pb-2 text-center font-matter text-sm font-semibold text-[#1a2340]">
                    Reset
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center overflow-y-auto py-4 lg:py-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-3.5">
                    <div>
                      <label className="block font-matter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#33415d]">
                        Email Address
                      </label>
                      <div className="mt-2.5 flex h-12 items-center gap-3 border border-[#d9d2c7] bg-white px-3.5 transition-colors focus-within:border-[#1d2c63] focus-within:ring-2 focus-within:ring-[#1d2c63]/10">
                        <Mail className="h-4.5 w-4.5 text-[#a08f81]" />
                        <input
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="john@example.com"
                          className="h-full flex-1 bg-transparent font-matter text-sm text-[#10172b] outline-none placeholder:text-[#b1a69b]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-matter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#33415d]">
                        New Password
                      </label>
                      <div className="mt-2.5 flex h-12 items-center gap-3 border border-[#d9d2c7] bg-white px-3.5 transition-colors focus-within:border-[#1d2c63] focus-within:ring-2 focus-within:ring-[#1d2c63]/10">
                        <Lock className="h-4.5 w-4.5 text-[#a08f81]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
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

                  {message ? (
                    <p className="font-matter text-sm text-[#b42318]">
                      {message}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    variant="kanPrimary"
                    size="kan"
                    className="h-12 w-full rounded-none text-sm"
                  >
                    Save Password
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
