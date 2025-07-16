import { FaCalendarAlt, FaUserFriends, FaTrophy, FaStar } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCalendarAlt className="text-4xl text-blue-400" />,
      title: "Easy Booking",
      desc: "Book your favorite courts with just a few clicks.",
    },
    {
      icon: <FaUserFriends className="text-4xl text-blue-400" />,
      title: "Professional Coaching",
      desc: "Learn from certified professional coaches.",
    },
    {
      icon: <FaTrophy className="text-4xl text-blue-400" />,
      title: "Tournaments",
      desc: "Participate in exciting tournaments and competitions.",
    },
    {
      icon: <FaStar className="text-4xl text-blue-400" />,
      title: "Premium Facilities",
      desc: "World-class courts and equipment for the best experience.",
    },
  ];

  return (
    <section
      className="bg-gradient-to-r from-elite-primary via-elite-brand to-elite-primary text-white py-16 px-4"
      id="why-choose-us"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
          Why Choose Us?
        </h2>
        <p
          className="mb-12 text-base md:text-lg max-w-2xl mx-auto text-white/80"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          We provide exceptional sports facilities and services to help you
          achieve your athletic goals.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
