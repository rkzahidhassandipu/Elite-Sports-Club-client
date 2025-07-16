import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// import MapSection from "./MapSection";

const VisitUs = () => {
  return (
    <section className="bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 px-2" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Visit Us</h2>
          <p className="text-white/80 text-base md:text-lg">
            Find us at the heart of the city
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div
            className="bg-purple-700/30 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-purple-500/30 shadow-md"
            data-aos="fade-right"
          >
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6 text-left text-sm md:text-base">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 text-lg mt-1" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>123 Sports Avenue, Elite District, City 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-blue-400 text-lg mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-400 text-lg mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>info@elitesportsclub.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div
            className="bg-slate-900 rounded-lg flex items-center justify-center text-blue-200 text-sm min-h-[250px] md:min-h-full"
            data-aos="fade-left"
          >
            <div className="w-full h-[400px] rounded overflow-hidden shadow-md">
              <iframe
                title="Elite Sports Club Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31871.315417399826!2d101.67021817740359!3d3.139003935581237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d7a56c8f2d%3A0x8e44996ab3ff8e7!2sKuala%20Lumpur!5e0!3m2!1sen!2smy!4v1721120000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
