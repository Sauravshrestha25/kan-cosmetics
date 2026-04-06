import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
}

export default function RatingStars({
  rating,
  reviews,
  size = "md",
  className,
}: RatingStarsProps) {
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";
  const textSize = size === "sm" ? "text-[0.72rem]" : "text-sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1.5 border border-[#e6eaf2] bg-linear-to-r from-[#fbf8f4] to-white px-2.5 py-1.5 shadow-[0_8px_18px_rgba(17,19,26,0.04)]">
        {[...Array(5)].map((_, index) => {
          const filled = index < Math.round(rating);

          return (
            <Star
              key={index}
              className={cn(
                iconSize,
                filled
                  ? "fill-[#d7ab63] text-[#d7ab63]"
                  : "fill-[#f4f6fa] text-[#d8deea]",
              )}
              strokeWidth={1.6}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-2 font-matter">
        <span
          className={cn(
            textSize,
            "font-semibold tracking-[0.01em] text-[#141c35]",
          )}
        >
          {rating.toFixed(1)}
        </span>
        {typeof reviews === "number" ? (
          <span className={cn(textSize, "text-[#7a6f68]")}>
            ({reviews} reviews)
          </span>
        ) : null}
      </div>
    </div>
  );
}
