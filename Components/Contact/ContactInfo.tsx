import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-white  p-8 shadow-sm h-fit lg:sticky lg:top-8">
      <h2 className="text-2xl font-medium mb-8">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">support@kancosmetics.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600">+977 01-410458</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Address</h3>
            <p className="text-gray-600">
              Nepal,
              <br />
              Kathmandu-10
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
            <p className="text-gray-600">
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
