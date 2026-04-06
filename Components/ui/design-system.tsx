import * as React from "react";

import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type SectionProps = React.HTMLAttributes<HTMLElement>;

export const kanColorVars = {
  brand: "var(--kan-brand)",
  brandStrong: "var(--kan-brand-strong)",
  brandDeep: "var(--kan-brand-deep)",
  accent: "var(--kan-brand-accent)",
  heading: "var(--kan-heading)",
  copy: "var(--kan-copy)",
  copyMuted: "var(--kan-copy-muted)",
  line: "var(--kan-line)",
  lineStrong: "var(--kan-line-strong)",
  surface: "var(--kan-surface)",
  surfaceSoft: "var(--kan-surface-soft)",
  surfaceTint: "var(--kan-surface-tint)",
  surfaceElevated: "var(--kan-surface-elevated)",
} as const;

export function PageContainer({ className, ...props }: DivProps) {
  return <div className={cn("kan-page", className)} {...props} />;
}

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("kan-section", className)} {...props} />;
}

interface SectionHeadingProps extends Omit<DivProps, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrowClassName?: string;
  afterTitle?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
  eyebrowClassName,
  afterTitle,
  ...props
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "relative",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className={cn("kan-eyebrow", eyebrowClassName)}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("kan-heading", eyebrow ? "mt-4" : "", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "kan-copy",
            eyebrow ? "mt-5" : "mt-4",
            centered ? "mx-auto" : "",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
      {afterTitle ? <div className="mt-8">{afterTitle}</div> : null}
    </div>
  );
}

interface DividerLabelProps extends DivProps {
  label: React.ReactNode;
}

export function DividerLabel({
  label,
  className,
  ...props
}: DividerLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-(--kan-line-strong)",
        className,
      )}
      {...props}
    >
      <span className="h-px w-14 bg-current" />
      <span className="kan-divider-label">{label}</span>
      <span className="h-px w-14 bg-current" />
    </div>
  );
}
