"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import {
  AUTH_EVENT,
  getSessionUser,
  logoutUser,
  type AuthUser,
} from "@/lib/auth";
import { CART_EVENT, getCartCount } from "@/lib/cart";
import { Button } from "@/Components/ui/button";
import { PageContainer } from "@/Components/ui/design-system";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collection" },
  { label: "Lipstick try-on", href: "/try-on", accent: true },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

const actionLinks = [
  { label: "Search", href: "/search", icon: Search },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

const accountLinks = [
  { label: "My Account", href: "/account", icon: User },
  { label: "My Orders", href: "/orders", icon: ShoppingBag },
  { label: "Settings", href: "/settings", icon: Settings },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sessionUser, setSessionUser] = useState<AuthUser | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const isTransparentHome = isHomePage && !isScrolled && !mobileOpen;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const syncSession = () => {
      setSessionUser(getSessionUser());
    };

    syncSession();
    window.addEventListener(AUTH_EVENT, syncSession);

    return () => {
      window.removeEventListener(AUTH_EVENT, syncSession);
    };
  }, []);

  useEffect(() => {
    const syncCart = () => {
      setCartCount(getCartCount());
    };

    syncCart();
    window.addEventListener(CART_EVENT, syncCart);

    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 12);

      if (currentScrollY <= 12) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out",
          isTransparentHome
            ? "border-b border-transparent bg-transparent"
            : "border-b border-slate-200/80 bg-white/95 backdrop-blur",
          isVisible || mobileOpen ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <PageContainer className="relative flex h-19 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="shrink-0"
              aria-label="KAN Korea & Nepal home"
            >
              <Image
                src={
                  isTransparentHome
                    ? "/images/Logo/Logo_Light.svg"
                    : "/images/Logo/Logo_Latest.svg"
                }
                alt="KAN Korea & Nepal"
                width={180}
                height={64}
                className="h-6 w-auto md:h-8"
                priority
              />
            </Link>
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
            <div className="flex items-center gap-8 xl:gap-10">
              {navLinks.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      "font-matter text-[17px] tracking-[-0.02em] transition-colors",
                      isTransparentHome
                        ? active
                          ? "font-semibold text-white"
                          : "text-white hover:text-white/75"
                        : active
                          ? "font-semibold text-kan-brand"
                          : "text-[#1f2e5d] hover:text-kan-brand-accent",
                      item.accent && !active && !isTransparentHome
                        ? "bg-[linear-gradient(90deg,#111111_15%,#111111_15%,var(--kan-brand-accent)_100%)] bg-clip-text text-transparent"
                        : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            {actionLinks.map((item) => {
              const Icon = item.icon;
              const isCart = item.label === "Cart";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "relative flex items-center font-matter text-[17px] transition-colors",
                    isTransparentHome
                      ? "text-white hover:text-white/75"
                      : "text-[#6d6aa8] hover:text-kan-brand",
                  ].join(" ")}
                >
                  <Icon className="h-4.5 w-4.5 stroke-[1.9]" />
                  {isCart && cartCount > 0 ? (
                    <span className="absolute -right-2.5 -top-2 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-kan-brand px-1 font-matter text-[10px] font-semibold leading-none text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}

            <div className="relative" ref={accountMenuRef}>
              {sessionUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className={[
                      "inline-flex h-10 cursor-pointer items-center gap-2 px-3 font-matter text-[15px] font-semibold transition-colors",
                      isTransparentHome
                        ? "border border-white/60 bg-white/10 text-white hover:bg-white/20"
                        : "border border-kan-brand bg-kan-brand text-white hover:bg-kan-brand-strong",
                    ].join(" ")}
                    aria-label="Open account menu"
                    aria-expanded={accountOpen}
                    aria-haspopup="menu"
                  >
                    <User className="h-4.5 w-4.5 stroke-2" />
                    <ChevronDown
                      className={[
                        "h-4 w-4 transition-transform duration-200",
                        accountOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  <div
                    className={[
                      "absolute right-0 top-[calc(100%+12px)] w-62 border border-[#dbe2ee] bg-white shadow-[0_22px_60px_rgba(16,23,43,0.12)] transition-all duration-200",

                      accountOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                    ].join(" ")}
                    role="menu"
                  >
                    <div className="border-b border-[#ecf0f6] px-5 py-4">
                      <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                        Signed in as
                      </p>
                      <p className="mt-2 truncate font-matter text-sm font-semibold text-kan-heading">
                        {sessionUser.fullName}
                      </p>
                      <p className="mt-1 truncate font-matter text-sm text-kan-copy">
                        {sessionUser.email}
                      </p>
                    </div>

                    <div className="py-2">
                      {accountLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 font-matter text-sm font-medium text-[#20304f] transition-colors hover:bg-kan-surface-tint hover:text-kan-brand"
                            role="menuitem"
                          >
                            <Icon className="h-4.5 w-4.5" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="border-t border-[#ecf0f6] p-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAccountOpen(false);
                          logoutUser();
                        }}
                        className="flex w-full  items-center gap-3 px-3 py-3 text-left font-matter text-sm font-semibold text-[#a83d4f] transition-colors hover:bg-[#fff6f7]"
                        role="menuitem"
                      >
                        <LogOut className="h-4.5 w-4.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  asChild
                  variant="kanSecondary"
                  size="kan"
                  className={[
                    "h-10 w-10 rounded-none border-transparent bg-transparent px-0 shadow-none",
                    isTransparentHome
                      ? "text-white hover:bg-transparent hover:text-white/75"
                      : "text-kan-brand hover:bg-transparent hover:text-kan-brand-strong",
                  ].join(" ")}
                >
                  <Link href="/login" aria-label="Login">
                    <User className="h-4.5 w-4.5 stroke-2 cursor-pointer" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {actionLinks.map((item) => {
              const Icon = item.icon;
              const isCart = item.label === "Cart";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "relative inline-flex items-center justify-center p-2",
                    isTransparentHome ? "text-white" : "text-kan-brand",
                  ].join(" ")}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5 stroke-[1.8]" />
                  {isCart && cartCount > 0 ? (
                    <span className="absolute right-0.5 top-0.5 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-kan-brand px-1 font-matter text-[10px] font-semibold leading-none text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-3 text-[#1d2c63]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </PageContainer>
      </nav>

      <div
        className={[
          "fixed inset-x-0 top-19 z-40 border-b border-slate-200 bg-white px-4 pb-6 pt-4 shadow-sm transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          {navLinks.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "rounded-xl px-3 py-3 font-matter text-base transition-colors",
                  active
                    ? "bg-slate-100 font-semibold text-kan-brand"
                    : "text-[#1f2e5d]",
                  item.accent && !active
                    ? "bg-[linear-gradient(90deg,#111111_0%,#111111_45%,var(--kan-brand-accent)_100%)] bg-clip-text text-transparent"
                    : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-3 grid grid-cols-2 gap-3">
            {actionLinks.map((item) => {
              const Icon = item.icon;
              const isCart = item.label === "Cart";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="relative flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-matter text-sm text-kan-brand"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {isCart && cartCount > 0 ? (
                    <span className="absolute right-3 top-2 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-kan-brand px-1 font-matter text-[10px] font-semibold leading-none text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>

          {sessionUser ? (
            <>
              <div className="mt-3 border border-kan-line-strong bg-kan-brand px-4 py-4 text-white">
                <p className="font-matter text-xs uppercase tracking-[0.18em] text-white/70">
                  Signed in
                </p>
                <p className="mt-2 truncate font-matter text-base font-semibold">
                  {sessionUser.fullName}
                </p>
                <p className="mt-1 truncate font-matter text-sm text-white/80">
                  {sessionUser.email}
                </p>
              </div>

              {accountLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-3 border border-slate-200 px-4 py-3 font-matter text-base font-medium text-kan-brand"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  logoutUser();
                  setMobileOpen(false);
                }}
                className="inline-flex items-center justify-center border border-[#f1d5d2] bg-[#fff7f7] px-4 py-3 font-matter text-base font-semibold text-[#a83d4f]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex cursor-pointer items-center justify-center gap-2 border border-[#d7dfeb] bg-white px-4 py-3 font-matter text-base font-semibold text-kan-brand"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
