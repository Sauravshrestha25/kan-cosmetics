"use client";

import { useEffect } from "react";

const HOME_READY_EVENT = "kan-home-ready";

declare global {
  interface Window {
    __kanHomeReady?: boolean;
  }
}

const waitForImages = async (images: HTMLImageElement[]) => {
  const pendingImages = images.filter((image) => !image.complete);

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

    const markReady = async () => {
      const homeRoot = document.querySelector("[data-home-root]");
      const images = Array.from(homeRoot?.querySelectorAll("img") ?? []);

      await waitForImages(images);

      if (cancelled) return;

      window.__kanHomeReady = true;
      window.dispatchEvent(new Event(HOME_READY_EVENT));
    };

    void markReady();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
