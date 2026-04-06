"use client";
import React from "react";
import { Check } from "lucide-react";
import {
  DividerLabel,
  PageContainer,
  Section,
  SectionHeading,
} from "@/Components/ui/design-system";

const TextReveal = () => {
  return (
    <Section className="flex min-h-screen items-center">
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-[#f7f9fc] via-white to-transparent" />
      <div className="pointer-events-none absolute left-[8%] top-24 h-32 w-32 rounded-full bg-[#edf2fb] blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[10%] h-40 w-40 rounded-full bg-[#f7ece8] blur-3xl" />
      <div className="pointer-events-none absolute right-[14%] top-28 h-px w-24 bg-[#d8deeb]" /> */}

      <PageContainer className="relative">
        <div className="grid w-full gap-10 border-y border-[#e7e9ef] py-14 text-[#2b3962] lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <SectionHeading
            align="center"
            className="mx-auto max-w-160"
            eyebrow="Why choose us"
            title="Why KAN?"
            titleClassName="text-[clamp(3.5rem,9vw,7.5rem)] leading-none"
            descriptionClassName="max-w-lg text-[clamp(1rem,1.6vw,1.25rem)]"
            description="Beauty made with Korean precision, adapted for Nepali lifestyles, and designed to feel modern, breathable, and dependable every day."
          />

          <div className="grid gap-4 self-end">
            {[
              "Korean Technology",
              "Made for Nepali Climate",
              "Natural Ingredients",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-[#e7e9ef] pb-4 last:border-b-0 last:pb-0"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#d9dfea] bg-[#f8fafc]">
                  <Check size={20} strokeWidth={2} />
                </span>
                <span className="font-matter text-[clamp(1rem,1.8vw,1.45rem)] font-medium tracking-[-0.03em] text-[#2b3962]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="mt-4 border-t border-[#eef1f6] pt-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <p className="max-w-2xl font-matter text-sm leading-7 text-[#7e88a8]">
                  Every formula is shaped to feel elevated in texture, practical
                  in daily wear, and easy to trust over time.
                </p>
                <DividerLabel label="calm, credible, considered" />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default TextReveal;
