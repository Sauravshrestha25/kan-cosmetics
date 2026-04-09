"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageComparisonSliderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  leftImage: string;
  rightImage: string;
  altLeft?: string;
  altRight?: string;
  initialPosition?: number;
}

export const ImageComparisonSlider = React.forwardRef<
  HTMLDivElement,
  ImageComparisonSliderProps
>(
  (
    {
      className,
      leftImage,
      rightImage,
      altLeft = "Left image",
      altRight = "Right image",
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    const [sliderPosition, setSliderPosition] =
      React.useState(initialPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;

      let newPosition = (x / rect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging && !isHovering) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleInteractionStart = () => {
      setIsDragging(true);
    };

    const handleInteractionEnd = () => {
      setIsDragging(false);
    };

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("mouseup", handleInteractionEnd);
        document.addEventListener("touchend", handleInteractionEnd);
        document.body.style.cursor = "ew-resize";
      } else {
        document.body.style.cursor = "";
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("mouseup", handleInteractionEnd);
        document.removeEventListener("touchend", handleInteractionEnd);
        document.body.style.cursor = "";
      };
    }, [isDragging, isHovering]);

    return (
      <section ref={containerRef} className="h-auto">
        <div
          className={cn(
            "group relative h-[clamp(22rem,100svh,56rem)] w-full select-none overflow-hidden",
            className,
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
          {...props}
        >
          <img
            src={rightImage}
            alt={altRight}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <div
            className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <img
              src={leftImage}
              alt={altLeft}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>

          <div
            className="absolute top-0 h-full w-0.5 sm:w-1"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute inset-y-0 w-0.5 bg-background/50 backdrop-blur-sm sm:w-1" />

            <div
              id="product-div"
              className={cn(
                "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl z-10",
                "h-32 w-12 sm:h-36 sm:w-14 lg:h-40 lg:w-16",
                "transition-transform duration-300 ease-in-out",
                "group-hover:scale-105",
                isDragging && "scale-105",
              )}
              role="slider"
              aria-label="Drag to compare before and after images"
              aria-valuenow={sliderPosition}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-orientation="horizontal"
            >
              <div id="image" className="pointer-events-none flex items-center">
                <Image
                  src="/images/foundation_1.svg"
                  alt="Product"
                  width={160}
                  height={160}
                  className="h-16 w-auto sm:h-20 lg:h-24"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ImageComparisonSlider.displayName = "ImageComparisonSlider";
