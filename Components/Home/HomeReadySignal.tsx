"use client";

import { useEffect } from "react";

const HOME_READY_EVENT = "kan-home-ready";
const MAX_HOME_READY_WAIT_MS = 2500;

declare global {
  interface Window {
    __kanHomeReady?: boolean;
  }
}

const waitForImages = async (images: HTMLImageElement[]) => {
  const pendingImages = images.filter(
    (image) => !image.complete && image.loading !== "lazy",
  );

  if (!pendingImages.length) return;

  await Promise.all(
    pendingImages.map(
      (image) =>
        new Promise<void>((resolve) => {
          const done = () => {
            image.removeEventListener("load", done);
            image.removeEventListener("error", done);
            resolve();
          };

          image.addEventListener("load", done, { once: true });
          image.addEventListener("error", done, { once: true });
        }),
    ),
  );
};

export default function HomeReadySignal() {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    const emitReady = () => {
      if (cancelled || window.__kanHomeReady) return;
      window.__kanHomeReady = true;
      window.dispatchEvent(new Event(HOME_READY_EVENT));
    };

    const markReady = async () => {
      const homeRoot = document.querySelector("[data-home-root]");
      const images = Array.from(homeRoot?.querySelectorAll("img") ?? []);

      await waitForImages(images);

      emitReady();
    };

    timeoutId = window.setTimeout(() => {
      emitReady();
    }, MAX_HOME_READY_WAIT_MS);

    void markReady();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
}
