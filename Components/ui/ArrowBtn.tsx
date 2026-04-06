"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface PremiumButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function PremiumButton({
  text,
  onClick,
  href,
  className,
}: PremiumButtonProps) {
  const content = (
    <motion.span
      whileHover="hover"
      className={`${className} cursor-pointer group relative inline-flex items-center justify-center gap-4 border border-gold-500 bg-[#2b3962] px-8 py-3 text-sm tracking-widest uppercase text-white transition-colors hover:bg-white hover:text-[#2b3962]`}
    >
      <span className="h-1 w-1 rounded-full bg-current transition-transform group-hover:scale-150" />

      <span className="font-matter font-medium">{text}</span>

      <span className="h-1 w-1 rounded-full bg-current transition-transform group-hover:scale-150" />
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
    <motion.button type="button" whileHover="hover" onClick={onClick}>
      {content}
    </motion.button>
  );
}
