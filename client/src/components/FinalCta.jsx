import React from "react";
import * as motion from "motion/react-client";

const FinalCta = () => {
  return (
    <section className="bg-[#345246] px-5 md:px-10 lg:px-20 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Ready to Furnish Your Home?
        </h2>
        <p className="text-gray-200 mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Browse premium furniture and appliances available for rent.
        </p>
        <a
          href="#categories"
          className="inline-block bg-[#eec50e] text-[#1f312a] px-10 py-3.5 rounded-full text-lg font-semibold hover:bg-[#e1bc16] transition-colors shadow-lg mt-8"
        >
          Explore Rentals
        </a>
      </motion.div>
    </section>
  );
};

export default FinalCta;
