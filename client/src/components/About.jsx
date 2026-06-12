import React from "react";
import * as motion from "motion/react-client";
import lifestyleImg from "../assets/images/sofa.jpg";
import { Truck, Wrench, DollarSign, RefreshCcw } from "lucide-react";

const benefits = [
  {
    icon: <Truck />,
    title: "Free Delivery",
    description: "Get products delivered directly to your doorstep.",
  },
  {
    icon: <Wrench />,
    title: "Maintenance Included",
    description: "We handle repairs and servicing throughout your rental period.",
  },
  {
    icon: <DollarSign />,
    title: "Affordable Living",
    description: "Access premium furniture without large upfront investments.",
  },
  {
    icon: <RefreshCcw />,
    title: "Flexible Plans",
    description: "Upgrade, return, or extend rentals whenever your needs change.",
  },
];

const About = () => {
  return (
    <section id="about" className="bg-[#F0F2F1] px-5 md:px-10 lg:px-20 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left - Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={lifestyleImg}
                alt="Modern living space"
                className="w-full h-87.5 md:h-125 object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="text-[#345246] font-semibold text-sm tracking-widest uppercase">
              About RentEase
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f312a] tracking-tight mt-3">
              Everything You Need,<br />Without Buying It.
            </h2>
            <p className="text-gray-600 mt-4 max-w-lg text-sm md:text-base leading-relaxed">
              RentEase helps you create a comfortable home without spending lakhs on furniture and appliances.
            </p>
            <p className="text-gray-600 mt-2 max-w-lg text-sm md:text-base leading-relaxed">
              Choose what you need, rent it for as long as you want, and enjoy hassle-free living with delivery, maintenance, and support included.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <h3 className="font-semibold text-[#1f312a] mt-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
