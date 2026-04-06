"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "@/Components/ui/loader-15";

const MIN_PRELOAD_MS = 1200;
const MAX_PRELOAD_MS = 4000;
const HOME_READY_EVENT = "kan-home-ready";

declare global {
  interface Window {
    __kanHomeReady?: boolean;
  }
}

export default function AppPreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    const isHomePage = window.location.pathname === "/";
    let timeoutId: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const remaining = Math.max(MIN_PRELOAD_MS - (Date.now() - startedAt), 0);
      timeoutId = window.setTimeout(() => setReady(true), remaining);
    };

    const fallbackTimeoutId = window.setTimeout(() => {
      finish();
    }, MAX_PRELOAD_MS);

    if (isHomePage && window.__kanHomeReady) {
      finish();
    }

    if (!isHomePage && document.readyState === "complete") {
      finish();
    }

    const handleHomeReady = () => finish();
    const handleWindowLoad = () => {
      if (!isHomePage) {
        finish();
      }
    };

    if (isHomePage) {
      window.addEventListener(HOME_READY_EVENT, handleHomeReady, {
        once: true,
      });
    } else {
      window.addEventListener("load", handleWindowLoad, { once: true });
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (fallbackTimeoutId) {
        window.clearTimeout(fallbackTimeoutId);
      }
      window.removeEventListener(HOME_READY_EVENT, handleHomeReady);
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  return (
    <>
      <div
        className={[
          "fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-white via-[#f7f9fc] to-[#eef2fb] transition-opacity duration-500",
          ready ? "pointer-events-none opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden={ready}
      >
        <div className="relative flex flex-col items-center gap-6">
          <div className="pointer-events-none absolute -top-16 h-32 w-32 rounded-full bg-[#dfe7fb] blur-3xl" />

          <div className="relative flex flex-col items-center gap-5">
            <div className="overflow-hidden">
              <Image
                src="/images/Logo/Logo_Latest.svg"
                alt="KAN Korea & Nepal"
                width={280}
                height={92}
                priority
                className="h-auto w-55 opacity-0 sm:w-65"
                style={{
                  animation: "kanPreloaderFadeUp 900ms ease-out forwards",
                }}
              />
            </div>

            <div
              className="flex flex-col items-center gap-3 opacity-0"
              style={{
                animation: "kanPreloaderFade 900ms ease-out 180ms forwards",
              }}
            >
              <p className="font-matter text-[11px] uppercase tracking-[0.34em] text-[#1d2c63]/70">
                Korea & Nepal
              </p>
            </div>
          </div>

          <div
            className="opacity-0"
            style={{
              animation: "kanPreloaderFade 900ms ease-out 320ms forwards",
            }}
          >
            <Loader />
          </div>
        </div>
      </div>

      <div
        className={[
          "transition-opacity duration-300",
          ready ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {children}
      </div>

      <style>{`
        @keyframes kanPreloaderFadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes kanPreloaderFade {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
