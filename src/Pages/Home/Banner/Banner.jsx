import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  const images = [
    "https://i.postimg.cc/85QLNSV8/jonathan-borba-lr-QPTQs7n-QQ-unsplash.jpg",
    "https://i.postimg.cc/Pxjv0QmT/moises-alex-Wq-I-Pb-Yugn4-unsplash.jpg",
    "https://i.postimg.cc/FFx058Wq/sebastian-pena-lambarri-7i5-HMCGup-Vw-unsplash.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[91vh] overflow-hidden text-white">
      {/* Slide Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-20"></div>

      {/* Text Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          data-aos="fade-up"
        >
          Welcome to Elite Sports Club
        </h1>
        <p
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Achieve your fitness goals with top-tier facilities, expert coaches,
          and community spirit.
        </p>
        <div
          className="flex flex-wrap justify-center gap-4 mt-5"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <button className="bg-gradient-to-r from-elite-brand to-elite-hover2 hover:from-elite-hover1 to-elite-hover2 text-white px-5 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base transition duration-300">
            Book Now
          </button>
          <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-5 sm:px-6 py-2 rounded font-semibold text-sm sm:text-base transition duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125 shadow"
                : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
