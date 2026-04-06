"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex min-h-14 items-center gap-3 border border-kan-line-strong bg-white px-4 py-3 font-matter text-kan-brand shadow-[0_22px_40px_rgba(29,44,99,0.12)]",
          title: "text-sm font-semibold tracking-[0.01em] text-kan-brand",
          description: "mt-1 text-sm text-kan-copy",
          actionButton:
            "inline-flex h-9 items-center justify-center border border-kan-line-strong bg-kan-surface-tint px-3 text-sm font-semibold text-kan-brand transition-colors hover:border-kan-brand",
          cancelButton:
            "inline-flex h-9 items-center justify-center border border-kan-line-strong bg-white px-3 text-sm font-semibold text-kan-copy transition-colors hover:border-kan-brand hover:text-kan-brand",
          success: "border-kan-line-strong bg-white text-kan-brand",
          icon: "text-kan-brand",
        },
      }}
    />
  );
}
