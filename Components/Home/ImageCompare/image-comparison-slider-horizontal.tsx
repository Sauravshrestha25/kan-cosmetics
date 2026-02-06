"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

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

    // useGSAP(() => {
    //   if (!containerRef.current) return;

    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: containerRef.current,
    //       start: "top top",
    //       end: "center 60%",
    //       scrub: true,
    //       pin: true,
    //       invalidateOnRefresh: true,
    //     },
    //   });

    //   tl.fromTo(
    //     "#product-div",
    //     {
    //       width: "100vw",
    //       height: "100vh",
    //       backdropFilter: "blur(20px)",
    //     },
    //     {
    //       width: "100px",
    //       height: "200px",
    //       backdropFilter: "blur(0px)",
    //       ease: "none",
    //     },
    //     0
    //   ).fromTo(
    //     "#image",
    //     {
    //       scale: 2,
    //     },
    //     {
    //       scale: 1,
    //       ease: "none",
    //     },
    //     0
    //   );
    // }, []);

// 1. Update the GSAP Logic
// useGSAP(() => {
//   if (!containerRef.current) return;

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: containerRef.current,
//       start: "top top",
//       end: "+=100%", 
//       scrub: 1.5,   
//       pin: true,
//       invalidateOnRefresh: true,
//     },
//   });

//   tl.fromTo(
//     "#product-div",
//     {
//       width: "100vw",
//       height: "100vh",
//       backdropFilter: "blur(20px)",
//     },
//     {
//       width: "100px",
//       height: "200px",
//       backdropFilter: "blur(0px)",
//       ease: "power2.inOut", 
//     },
//     0
//   ).fromTo(
//     "#image",
//     { scale: 2 },
//     { scale: 1, ease: "power2.inOut" },
//     0
//   );
// }, { scope: containerRef }); 



    return (
      <section ref={containerRef} className="h-auto"> 
      <div
        className={cn(
          "relative w-full h-[120vh] overflow-hidden select-none group",
          className
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        {...props}
      >
        {/* Right Image */}
        <img
          src={rightImage}
          alt={altRight}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Left Image */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={leftImage}
            alt={altLeft}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 h-full w-1"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute inset-y-0 w-1 bg-background/50 backdrop-blur-sm" />

          {/* Handle */}
          <div
            id="product-div"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "w-16 h-40 md:w-50 md:h-100",
              "flex items-center justify-center rounded-xl z-10",
              "transition-transform duration-300 ease-in-out",
              "group-hover:scale-105",
              isDragging && "scale-105"
            )}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
          >
            <div
              id="image"
              className="flex items-center pointer-events-none"
            >
              <Image
                src="/images/foundation_1.svg"
                alt="Product"
                width={200}
                height={200}
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
