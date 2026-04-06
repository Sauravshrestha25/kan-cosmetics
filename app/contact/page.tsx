import ContactForm from "@/Components/Contact/ContactForm";
import ContactInfo from "@/Components/Contact/ContactInfo";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-20">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
