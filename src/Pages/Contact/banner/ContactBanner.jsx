import React from "react";

const ContactBanner = () => {
  return (
    <section
      className="bg-cover bg-center bg-fixed relative bg-no-repeat py-28 text-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/HsxcK5zm/89449985-l-normal-none-min-scaled.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 container mx-auto">
        {/* Divider with Text */}
        <div className="flex justify-center items-center mb-4">
          <span className="border-t border-gray-300 w-16 mr-3"></span>
          <h5 className="text-sm font-medium uppercase tracking-widest text-white">
            Contact
          </h5>
          <span className="border-t border-gray-300 w-16 ml-3"></span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default ContactBanner;
