"use client";

import Link from "next/link";
import { ChevronLeft, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updatePassword } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = updatePassword(email, password);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-[760px] px-4 sm:px-6 lg:px-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Login
        </Link>

        <section className="pt-10">
          <h1 className="font-matter text-[clamp(2.7rem,5vw,4.3rem)] font-semibold tracking-[-0.06em] text-[#10172b]">
            Reset Password
          </h1>
          <p className="mt-4 font-matter text-[clamp(1rem,1.8vw,1.45rem)] text-[#6b7385]">
            Enter your email and set a new password
          </p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-9">
            <div>
              <label className="block font-matter text-[1.5rem] font-semibold text-[#33415d]">
                Email Address
              </label>
              <div className="mt-4 flex h-16 items-center gap-3 border border-[#dce1ea] px-4">
                <Mail className="h-6 w-6 text-[#a8afbd]" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john@example.com"
                  className="h-full flex-1 bg-transparent font-matter text-[1.2rem] text-[#10172b] outline-none placeholder:text-[#a8afbd]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-matter text-[1.5rem] font-semibold text-[#33415d]">
                New Password
              </label>
              <div className="mt-4 flex h-16 items-center gap-3 border border-[#dce1ea] px-4">
                <Lock className="h-6 w-6 text-[#a8afbd]" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="h-full flex-1 bg-transparent font-matter text-[1.2rem] text-[#10172b] outline-none placeholder:text-[#a8afbd]"
                  required
                />
              </div>
            </div>

            {message ? (
              <p className="font-matter text-base text-[#b42318]">{message}</p>
            ) : null}

            <button
              type="submit"
              className="flex h-16 w-full items-center justify-center bg-[#10172b] font-matter text-[1.5rem] font-semibold text-white transition-colors hover:bg-[#1d2c63]"
            >
              Save New Password
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
