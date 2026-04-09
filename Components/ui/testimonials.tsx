"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// TypeScript interface for a single testimonial object
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  image: string;
}

// TypeScript interface for the component's props
interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

/**
 * A responsive section component to display customer testimonials with a slider.
 * It features a title, subtitle, and a carousel of animated testimonial cards.
 */
export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth < 768 ? 1 : 3);
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + cardsToShow >= testimonials.length ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - cardsToShow) : prev - 1,
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsToShow,
  );

  // If we don't have enough cards to fill, wrap around
  if (visibleTestimonials.length < cardsToShow) {
    const remaining = cardsToShow - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 font-matter text-[0.7rem] uppercase tracking-[0.2em] text-[#7a6f68]">
            {subtitle}
          </p>
          <h2 className="font-theseasons text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[0.95] text-[#141c35]">
            {title}
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center border border-[#d9d7d1] bg-white text-[#141c35] shadow-lg transition-colors hover:border-[#2b3962] hover:bg-[#2b3962] hover:text-white sm:flex sm:h-12 sm:w-12 sm:-translate-x-4"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-2 -translate-y-1/2 items-center justify-center border border-[#d9d7d1] bg-white text-[#141c35] shadow-lg transition-colors hover:border-[#2b3962] hover:bg-[#2b3962] hover:text-white sm:flex sm:h-12 sm:w-12 sm:translate-x-4"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Cards Container */}
          <div className="relative min-h-[clamp(24rem,70vw,34rem)]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: -100,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="relative overflow-hidden border border-[#d9d7d1] bg-white shadow-[0_12px_30px_rgba(20,28,53,0.04)] hover:shadow-[0_20px_40px_rgba(20,28,53,0.08)] transition-shadow duration-300"
                  >
                    <div className="relative h-[clamp(18rem,70vw,32rem)] sm:h-[clamp(20rem,48vw,32rem)]">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-transparent" />
                    </div>

                    {/* Content within the card */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white sm:p-6">
                      <Quote
                        className="mb-4 h-7 w-7 text-white/40 sm:h-8 sm:w-8"
                        aria-hidden="true"
                      />
                      <blockquote className="font-matter text-[clamp(0.92rem,1.2vw,1.05rem)] font-medium leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                      <figcaption className="mt-4">
                        <p className="font-matter text-sm font-semibold text-white">
                          &mdash; {testimonial.author}
                        </p>
                      </figcaption>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center border border-[#d9d7d1] bg-white text-[#141c35] shadow-lg transition-colors hover:border-[#2b3962] hover:bg-[#2b3962] hover:text-white"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center border border-[#d9d7d1] bg-white text-[#141c35] shadow-lg transition-colors hover:border-[#2b3962] hover:bg-[#2b3962] hover:text-white"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="mt-6 flex justify-center gap-2 sm:mt-8">
            {Array.from({
              length: Math.ceil(testimonials.length / cardsToShow),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * cardsToShow)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / cardsToShow) === index
                    ? "w-8 bg-[#2b3962]"
                    : "w-2 bg-[#d9d7d1] hover:bg-[#7a6f68]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
