import React from "react";
import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    icon: "🛋️",
    title: "Browse Products",
    description: "Explore our collection of furniture and appliances available for rent.",
  },
  {
    icon: "🛒",
    title: "Add To Cart",
    description: "Select the products you love and add them to your rental cart.",
  },
  {
    icon: "📅",
    title: "Choose Rental Duration",
    description: "Pick a rental tenure that best fits your needs and budget.",
  },
  {
    icon: "🏠",
    title: "Enjoy Your Rental",
    description: "Get products delivered and installed at your doorstep.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F0F2F1] px-5 md:px-10 lg:px-20 py-16 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f312a] tracking-tight">
            How RentEase Works
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Rent furniture and appliances in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center w-full lg:w-60 xl:w-72 hover:shadow-lg transition-shadow group"
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl block"
                >
                  {step.icon}
                </motion.span>
                <p className="text-[#345246] font-bold text-sm mt-2">Step {index + 1}</p>
                <h3 className="font-semibold text-[#1f312a] mt-1">{step.title}</h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Arrow between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center self-center px-2">
                  <ArrowRight className="text-gray-300 w-6 h-6" />
                </div>
              )}

              {/* Down arrow (mobile only) */}
              {index < steps.length - 1 && (
                <div className="flex lg:hidden justify-center -my-3">
                  <ArrowRight className="text-gray-300 w-6 h-6 rotate-90" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-500 text-md mt-10"
        >
           No long-term commitments. Upgrade, return, or extend your rentals anytime.
        </motion.p>

      </div>
    </section>
  );
};

export default HowItWorks;
