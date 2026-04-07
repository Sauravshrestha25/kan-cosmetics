"use client";

import { useState } from "react";
import PremiumButton from "@/Components/ui/ArrowBtn";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="border border-[#ded8ce] bg-white p-6 sm:p-8">
      <div className="text-center">
        <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl">
          Send a message
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-matter text-sm leading-7 text-[#6c6c74] sm:text-base">
          Tell us what you need and we will direct your message to the right team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block font-matter text-xs uppercase tracking-[0.16em] text-[#8f857d]"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full border border-[#ded8ce] px-4 py-3 font-matter text-[#141c35] outline-none transition-colors placeholder:text-[#9b948d] focus:border-[#1d2c63]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block font-matter text-xs uppercase tracking-[0.16em] text-[#8f857d]"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full border border-[#ded8ce] px-4 py-3 font-matter text-[#141c35] outline-none transition-colors placeholder:text-[#9b948d] focus:border-[#1d2c63]"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-matter text-xs uppercase tracking-[0.16em] text-[#8f857d]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full border border-[#ded8ce] px-4 py-3 font-matter text-[#141c35] outline-none transition-colors placeholder:text-[#9b948d] focus:border-[#1d2c63]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block font-matter text-xs uppercase tracking-[0.16em] text-[#8f857d]"
          >
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full border border-[#ded8ce] px-4 py-3 font-matter text-[#141c35] outline-none transition-colors placeholder:text-[#9b948d] focus:border-[#1d2c63]"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block font-matter text-xs uppercase tracking-[0.16em] text-[#8f857d]"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-[#ded8ce] bg-white px-4 py-3 font-matter text-[#141c35] outline-none transition-colors focus:border-[#1d2c63]"
          >
            <option>General Inquiry</option>
            <option>Product Question</option>
            <option>Order Support</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block font-matter text-xs uppercase tracking-[0.16em] text-[#8f857d]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows={6}
            className="w-full resize-none border border-[#ded8ce] px-4 py-3 font-matter text-[#141c35] outline-none transition-colors placeholder:text-[#9b948d] focus:border-[#1d2c63]"
            required
          />
        </div>

        <div className="flex justify-center pt-2">
          <PremiumButton
            text="Send Message"
            type="submit"
            showDots={false}
            className="min-w-56 px-6 py-3 text-xs tracking-[0.18em]! [--btn-bg:#1d2c63] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#1d2c63]"
          />
        </div>
      </form>
    </div>
  );
}
