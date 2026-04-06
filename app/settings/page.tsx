"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { PageContainer, SectionHeading } from "@/Components/ui/design-system";
import { getSessionUser, type AuthUser } from "@/lib/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [user] = useState<AuthUser | null>(() => getSessionUser());
  const [fullName, setFullName] = useState(() => getSessionUser()?.fullName ?? "");
  const [email, setEmail] = useState(() => getSessionUser()?.email ?? "");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <PageContainer>
        <Link
          href="/account"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to account
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="border border-[#dbe2ee] bg-white p-6 lg:p-8">
            <SectionHeading
              eyebrow="Settings"
              title="Manage your account details"
              description="This keeps the account area feeling complete for now, even while the auth flow stays browser-local."
              titleClassName="font-matter text-[clamp(2rem,4vw,3.3rem)]"
              descriptionClassName="max-w-2xl text-base"
            />

            <form className="mt-10 grid gap-6">
              <div>
                <label className="block font-matter text-sm font-semibold text-[#33415d]">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-3 h-13 w-full border border-[#dbe2ee] bg-[#fbfcfe] px-4 font-matter text-base text-[#10172b] outline-none transition-colors focus:border-[#1d2c63] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-matter text-sm font-semibold text-[#33415d]">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-3 h-13 w-full border border-[#dbe2ee] bg-[#fbfcfe] px-4 font-matter text-base text-[#10172b] outline-none transition-colors focus:border-[#1d2c63] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="button" variant="kanPrimary" size="kan" className="rounded-none">
                  Save Changes
                </Button>
                <Button asChild type="button" variant="kanSecondary" size="kan" className="rounded-none">
                  <Link href="/forgot-password">Change Password</Link>
                </Button>
              </div>
            </form>
          </div>

          <div className="grid gap-5">
            <article className="border border-[#dbe2ee] bg-[#f8fafe] p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center bg-[#1d2c63] text-white">
                <UserRoundCog className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-matter text-xl font-semibold text-[#141c35]">
                Account Preferences
              </h2>
              <p className="mt-3 font-matter text-sm leading-7 text-[#66758f]">
                This page is ready for profile details, saved addresses, and notification
                preferences as the account flow grows.
              </p>
            </article>

            <article className="border border-[#dbe2ee] bg-white p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center bg-[#1d2c63] text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-matter text-xl font-semibold text-[#141c35]">
                Security
              </h2>
              <p className="mt-3 font-matter text-sm leading-7 text-[#66758f]">
                Your current demo authentication is stored in the browser, but the settings
                structure is now in place for a fuller account experience later on.
              </p>
            </article>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
