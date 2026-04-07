"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CustomerShell from "@/Components/account/CustomerShell";
import { Button } from "@/Components/ui/button";
import {
  getSessionUser,
  updateUserProfile,
  type AuthUser,
} from "@/lib/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser());
  const [fullName, setFullName] = useState(() => getSessionUser()?.fullName ?? "");
  const [email, setEmail] = useState(() => getSessionUser()?.email ?? "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sessionUser = getSessionUser();

    if (!sessionUser) {
      router.replace("/login");
      return;
    }

    setUser(sessionUser);
    setFullName(sessionUser.fullName);
    setEmail(sessionUser.email);
  }, [router]);

  const canSubmit = useMemo(
    () => fullName.trim().length > 0 && emailPattern.test(email.trim()),
    [email, fullName],
  );

  if (!user) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!canSubmit) {
      setMessage("Enter a valid name and email.");
      return;
    }

    const result = updateUserProfile(user.email, { fullName, email });

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setUser(result.user);
    setMessage("Saved.");
  };

  return (
    <CustomerShell>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <form
          id="settings-form"
          onSubmit={handleSubmit}
          className="border border-[#e8e2d8] bg-[#fffdf9] p-4 sm:p-5"
        >
          <div className="grid gap-4">
            <div>
              <label className="block font-matter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#33415d]">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2.5 h-12 w-full border border-[#d9d2c7] bg-white px-3.5 font-matter text-sm text-[#10172b] outline-none transition-colors focus:border-[#1d2c63] focus:ring-2 focus:ring-[#1d2c63]/10"
              />
            </div>

            <div>
              <label className="block font-matter text-[12px] font-semibold uppercase tracking-[0.1em] text-[#33415d]">
                Email Address
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2.5 h-12 w-full border border-[#d9d2c7] bg-white px-3.5 font-matter text-sm text-[#10172b] outline-none transition-colors focus:border-[#1d2c63] focus:ring-2 focus:ring-[#1d2c63]/10"
              />
            </div>

            {message ? (
              <p
                className={[
                  "font-matter text-sm",
                  message === "Saved." ? "text-[#1d2c63]" : "text-[#b42318]",
                ].join(" ")}
              >
                {message}
              </p>
            ) : null}
          </div>
        </form>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            variant="kanPrimary"
            size="kan"
            disabled={!canSubmit}
            form="settings-form"
            className="h-11 rounded-none text-sm"
          >
            Save
          </Button>
          <Button asChild variant="kanSecondary" size="kan" className="h-11 rounded-none text-sm">
            <Link href="/forgot-password">Password</Link>
          </Button>
        </div>
      </div>
    </CustomerShell>
  );
}
