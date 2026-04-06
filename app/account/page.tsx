"use client";

import Link from "next/link";
import { ChevronLeft, LogOut, Settings, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageContainer, SectionHeading } from "@/Components/ui/design-system";
import { Button } from "@/Components/ui/button";
import { getSessionUser, logoutUser, type AuthUser } from "@/lib/auth";

const quickLinks = [
  {
    title: "My Orders",
    description: "Track purchases, review shipment status, and revisit your recent items.",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Settings",
    description: "Update your profile details and keep your account preferences in one place.",
    href: "/settings",
    icon: Settings,
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [user] = useState<AuthUser | null>(() => getSessionUser());

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
          href="/"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        <section className="mt-8 grid gap-8 border border-[#e4e9f1] bg-white p-6 shadow-[0_20px_50px_rgba(16,23,43,0.05)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div>
            <SectionHeading
              eyebrow="Account"
              title={`Welcome back, ${user.fullName}`}
              description="Your KAN account keeps your profile, order journey, and account preferences together in one place."
              titleClassName="font-matter text-[clamp(2.2rem,4vw,3.75rem)]"
              descriptionClassName="max-w-2xl text-base"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group border border-[#dbe2ee] bg-[#fafbfd] p-5 transition-colors hover:border-[#1d2c63] hover:bg-white"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center bg-[#1d2c63] text-white">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h2 className="mt-4 font-matter text-xl font-semibold text-[#141c35]">
                      {item.title}
                    </h2>
                    <p className="mt-3 font-matter text-sm leading-7 text-[#66758f]">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex font-matter text-sm font-semibold text-[#1d2c63] transition-transform group-hover:translate-x-1">
                      Open
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="border border-[#dbe2ee] bg-[#f8fafe] p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center bg-[#1d2c63] text-white">
              <User className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-matter text-2xl font-semibold text-[#141c35]">
              Profile Snapshot
            </h2>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                  Full Name
                </dt>
                <dd className="mt-2 font-matter text-base font-semibold text-[#141c35]">
                  {user.fullName}
                </dd>
              </div>

              <div>
                <dt className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                  Email
                </dt>
                <dd className="mt-2 font-matter text-base text-[#42526d]">
                  {user.email}
                </dd>
              </div>

              <div>
                <dt className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                  Member Since
                </dt>
                <dd className="mt-2 font-matter text-base text-[#42526d]">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="kanPrimary" size="kan" className="rounded-none">
                <Link href="/collection">Continue Shopping</Link>
              </Button>
              <Button asChild variant="kanSecondary" size="kan" className="rounded-none">
                <Link href="/settings">Edit Settings</Link>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => {
                logoutUser();
                router.push("/login");
              }}
              className="mt-4 inline-flex items-center gap-2 font-matter text-sm font-semibold text-[#a83d4f] transition-colors hover:text-[#7d2432]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </aside>
        </section>
      </PageContainer>
    </main>
  );
}
