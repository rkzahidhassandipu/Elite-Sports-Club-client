import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text content */}
        <div className="text-white space-y-6" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold">About Elite Sports Club</h2>

          <div>
            <h3 className="text-xl font-semibold mb-1">Our History</h3>
            <p className="text-gray-200">
              Founded in 1995, Elite Sports Club has been at the forefront of providing
              exceptional sports facilities for over 25 years. What started as a small tennis
              club has grown into a comprehensive sports complex serving thousands of members.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1">Our Mission</h3>
            <p className="text-gray-200">
              To provide world-class sports facilities and professional coaching that inspire
              athletes of all levels to achieve their personal best while fostering a community
              of sportsmanship and excellence.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1">Our Vision</h3>
            <p className="text-gray-200">
              To be the premier destination for sports enthusiasts, offering cutting-edge
              facilities, innovative programs, and an unmatched member experience that promotes
              health, wellness, and athletic achievement.
            </p>
          </div>
        </div>

        {/* Image */}
        <div data-aos="zoom-in">
          <img
            src="https://i.postimg.cc/85QLNSV8/jonathan-borba-lr-QPTQs7n-QQ-unsplash.jpg"
            alt="Fitness"
            className="rounded-lg shadow-lg object-cover w-full h-full max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
