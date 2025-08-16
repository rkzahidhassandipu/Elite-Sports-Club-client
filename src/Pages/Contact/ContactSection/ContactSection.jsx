import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section
      className="py-20 bg-cover bg-center bg-fixed relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary"></div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10  w-4/5 mx-auto">
        {/* Contact Info */}
        <div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-200">
            Have questions or need help? Reach out using the form or contact us directly.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="text-blue-400 w-6 h-6" />
              <span>123 Main Street, Kuala Lumpur, Malaysia</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-blue-400 w-6 h-6" />
              <span>+60 123-456-789</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="text-blue-400 w-6 h-6" />
              <span>info@example.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className=" shadow-2xl rounded-2xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
