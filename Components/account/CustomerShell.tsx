"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContainer } from "@/Components/ui/design-system";

const navigation = [
  { href: "/account", label: "Account" },
  { href: "/orders", label: "Orders" },
  { href: "/settings", label: "Settings" },
];

interface CustomerShellProps {
  children: React.ReactNode;
}

export default function CustomerShell({ children }: CustomerShellProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#fcfaf7] pt-24 pb-10">
      <PageContainer className="max-w-6xl">
        <div className="border border-[#e7e1d8] bg-white shadow-[0_20px_60px_rgba(16,23,43,0.06)]">
          <div className="flex justify-end border-b border-[#e8e2d8] px-4 py-4 sm:px-5 lg:px-6">
            <nav className="grid grid-cols-3 gap-5 sm:gap-6">
              {navigation.map((item) => {
                const active = pathname === item.href;

                return active ? (
                  <div
                    key={item.href}
                    className="border-b-2 border-[#1a2340] pb-2 text-center font-matter text-sm font-semibold text-[#1a2340]"
                  >
                    {item.label}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="pb-2 text-center font-matter text-sm font-medium text-[#7a6f68] transition-colors hover:text-[#1a2340]"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 sm:p-5 lg:p-6">{children}</div>
        </div>
      </PageContainer>
    </main>
  );
}
