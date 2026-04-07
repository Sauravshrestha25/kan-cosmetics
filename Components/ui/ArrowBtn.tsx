"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { type CSSProperties } from "react";

interface PremiumButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: CSSProperties;
  showDots?: boolean;
  endSlot?: React.ReactNode;
}

export default function PremiumButton({
  text,
  onClick,
  href,
  type = "button",
  className,
  style,
  showDots = true,
  endSlot,
}: PremiumButtonProps) {
  const buttonStyle = {
    "--btn-bg": "#2b3962",
    "--btn-fill": "#ffffff",
    "--btn-text": "#ffffff",
    "--btn-hover-text": "#2b3962",
    ...style,
  } as CSSProperties;

  const content = (
    <motion.span
      whileHover="hover"
      style={buttonStyle}
      className={`${className} cursor-pointer group/premium-btn relative inline-flex items-center justify-center gap-4 overflow-hidden border border-gold-500 bg-[var(--btn-bg)] px-8 py-3 text-sm tracking-widest uppercase text-[var(--btn-text)] transition-colors duration-300`}
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--btn-fill)] transition-transform duration-300 ease-out group-hover/premium-btn:scale-y-100" />

      {showDots ? (
        <span className="relative z-10 h-1 w-1 rounded-full bg-current transition-transform duration-300 group-hover/premium-btn:scale-150 group-hover/premium-btn:text-[var(--btn-hover-text)]" />
      ) : null}

      <span className="relative z-10 font-matter font-medium transition-colors duration-300 group-hover/premium-btn:text-[var(--btn-hover-text)]">
        {text}
      </span>

      {endSlot ? <span className="relative z-10">{endSlot}</span> : null}

      {showDots ? (
        <span className="relative z-10 h-1 w-1 rounded-full bg-current transition-transform duration-300 group-hover/premium-btn:scale-150 group-hover/premium-btn:text-[var(--btn-hover-text)]" />
      ) : null}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button type={type} whileHover="hover" onClick={onClick}>
      {content}
    </motion.button>
  );
}
