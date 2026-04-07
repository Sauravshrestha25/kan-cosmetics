import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="h-fit border border-[#ded8ce] bg-white p-6 sm:p-8 lg:sticky lg:top-28">
      <div className="text-center">
        <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl">
          Contact information
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-matter text-sm leading-7 text-[#6c6c74] sm:text-base">
          Reach the team directly for support, product questions, and business inquiries.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
            <Mail className="h-5 w-5 text-[#1d2c63]" />
          </div>
          <div>
            <h3 className="mb-1 font-matter text-sm uppercase tracking-[0.16em] text-[#8f857d]">Email</h3>
            <p className="font-matter text-base text-[#141c35]">support@kancosmetics.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
            <Phone className="h-5 w-5 text-[#1d2c63]" />
          </div>
          <div>
            <h3 className="mb-1 font-matter text-sm uppercase tracking-[0.16em] text-[#8f857d]">Phone</h3>
            <p className="font-matter text-base text-[#141c35]">+977 01-410458</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
            <MapPin className="h-5 w-5 text-[#1d2c63]" />
          </div>
          <div>
            <h3 className="mb-1 font-matter text-sm uppercase tracking-[0.16em] text-[#8f857d]">Address</h3>
            <p className="font-matter text-base text-[#141c35]">
              Nepal,
              <br />
              Kathmandu-10
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
            <Clock className="h-5 w-5 text-[#1d2c63]" />
          </div>
          <div>
            <h3 className="mb-1 font-matter text-sm uppercase tracking-[0.16em] text-[#8f857d]">Business Hours</h3>
            <p className="font-matter text-base text-[#141c35]">
              Mon - Fri: 9am - 6pm
              <br />
              Sat - Sun: 10am - 4pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
