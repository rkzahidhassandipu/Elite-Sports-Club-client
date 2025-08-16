import React from "react";

const ContactBanner = () => {
  return (
    <section className="relative bg-gray-100 py-16 text-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 container mx-auto">
        {/* Divider with Text */}
        <div className="flex justify-center items-center mb-4">
          <span className="border-t border-gray-400 w-16 mr-3"></span>
          <h5 className="text-sm font-medium uppercase tracking-widest text-gray-600">
            Contact
          </h5>
          <span className="border-t border-gray-400 w-16 ml-3"></span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fadeInUp">
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default ContactBanner;
