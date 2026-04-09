"use client";

import { TestimonialSection } from "@/Components/ui/testimonials";

// Testimonials data from the existing component
const testimonials = [
  {
    id: 1,
    quote:
      "My skin has never felt this confident. From the very first use, I could see and feel the difference—smoother texture, a healthy glow, and a finish that looks effortlessly natural all day long.",
    author: "Sarah Chen",
    image: "/images/Testimonials/model2.jpg",
  },
  {
    id: 2,
    quote:
      "Every product feels intentional, luxurious, and incredibly gentle on the skin. It has completely elevated my daily routine into something that feels calm, refined, and truly indulgent.",
    author: "Martha Grey",
    image: "/images/Testimonials/after.jpg",
  },
  {
    id: 3,
    quote:
      "The finish is flawless yet natural, enhancing my features without ever feeling heavy or overdone. It's the kind of makeup that makes you feel confident without announcing itself.",
    author: "Elena Voss",
    image: "/images/Testimonials/3.png",
  },
  {
    id: 4,
    quote:
      "I love how lightweight the makeup feels while still being incredibly long-lasting. It stays fresh and comfortable throughout the day, even during long hours and busy moments.",
    author: "Ava Laurent",
    image: "/images/Testimonials/2.png",
  },
  {
    id: 5,
    quote:
      "This brand truly understands modern beauty—clean formulations, elegant finishes, and a sense of confidence that feels authentic. It's beauty that enhances, not overwhelms.",
    author: "Sabrina Vox",
    image: "/images/Testimonials/2.png",
  },
];

const TestimonialsSection = () => {
  return (
    <TestimonialSection
      title="Confidence in their own words"
      subtitle=""
      testimonials={testimonials}
    />
  );
};

export default TestimonialsSection;
