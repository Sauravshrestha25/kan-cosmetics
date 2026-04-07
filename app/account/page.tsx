"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomerShell from "@/Components/account/CustomerShell";
import { Button } from "@/Components/ui/button";
import { getSessionUser, logoutUser, type AuthUser } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser());

  useEffect(() => {
    const sessionUser = getSessionUser();

    if (!sessionUser) {
      router.replace("/login");
      return;
    }

    setUser(sessionUser);
  }, [router]);

  if (!user) return null;

  return (
    <CustomerShell>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="border border-[#e8e2d8] bg-[#fffdf9] p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-[#ece5db] bg-white p-4">
              <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                Name
              </p>
              <p className="mt-2 font-matter text-base font-semibold text-[#141c35]">
                {user.fullName}
              </p>
            </div>

            <div className="border border-[#ece5db] bg-white p-4">
              <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                Email
              </p>
              <p className="mt-2 break-all font-matter text-sm text-[#141c35]">
                {user.email}
              </p>
            </div>

            <div className="border border-[#ece5db] bg-white p-4">
              <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                Member Since
              </p>
              <p className="mt-2 font-matter text-sm text-[#141c35]">
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="border border-[#ece5db] bg-white p-4">
              <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                Access
              </p>
              <p className="mt-2 font-matter text-sm text-[#141c35]">
                Active session
              </p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-3">
          <Button asChild variant="kanPrimary" size="kan" className="h-11 rounded-none text-sm">
            <Link href="/orders">My Orders</Link>
          </Button>
          <Button asChild variant="kanSecondary" size="kan" className="h-11 rounded-none text-sm">
            <Link href="/settings">Settings</Link>
          </Button>
          <button
            type="button"
            onClick={() => {
              logoutUser();
              router.push("/login");
            }}
            className="inline-flex h-11 items-center justify-center gap-2 border border-[#ead9d4] bg-[#fff7f5] font-matter text-sm font-semibold text-[#a83d4f] transition-colors hover:bg-[#fff0ec]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>
      </div>
    </CustomerShell>
  );
}
