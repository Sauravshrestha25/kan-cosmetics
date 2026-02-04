"use client";

import { motion } from "framer-motion";
import React from 'react'

interface PremiumButtonProps {
  text: string;
  onClick?: () => void;
  href?:string;
  className?:string;
}

export default function PremiumButton({ text, onClick,href, className }: PremiumButtonProps) {
  const jiggleVariants = {
    hover: {
      x: [0, -2, 2, -2, 2, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.button
      whileHover="hover"
      onClick={onClick}
      className={` ${className} group relative flex items-center justify-center gap-4 border border-gold-500 px-8 py-3 bg-transparent text-sm tracking-widest uppercase transition-colors hover:bg-neutral-900 hover:text-white`}
    >
   
      <span className="h-1 w-1 rounded-full bg-current transition-transform group-hover:scale-150" />
      
      <span className="font-medium">{text}</span>
      
      <span className="h-1 w-1 rounded-full bg-current transition-transform group-hover:scale-150" />
    
      
    </motion.button>
  );
}