import React from "react";
import * as motion from "motion/react-client";
import yellowSofa from "../assets/images/yellow-sofa.jpg";

const Home = () => {
  return (
    <div
      id="home"
      className="pt-20 md:pt-24 w-full flex flex-col items-center lg:items-start lg:flex-row justify-between lg:min-h-[95vh] px-4 md:px-8 lg:px-20 lg:py-15 py-10 bg-[#3B5D4F] text-white overflow-hidden"
    >
      <div className="w-full lg:w-[50%] text-center lg:text-left lg:py-15 mb-2 md:mb-6 lg:mb-0">
        <h1 className="font-semibold tracking-tighter leading-tight text-4xl md:text-5xl lg:text-6xl">
          Designed to Elevate <br /> Everyday Living.
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-200 max-w-lg mt-5 mx-auto lg:mx-0">
          Premium furniture and appliances on rent, delivered to your doorstep
          with flexible plans and zero ownership hassles.
        </p>

        {/* buttons */}
        <div className="flex flex-col md:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-6 w-full">
          <a href="#featured">
            <button className="bg-[#eec50e] text-black w-40 px-2 py-3 rounded-full text-md font-medium hover:bg-[#e1bc16]">
            Shop Now
          </button>
          </a>
          <a href="#categories">
            <button className="bg-transparent border border-white w-40 px-2 py-3 rounded-full text-md font-medium hover:bg-white/20">
              Explore
            </button>
          </a>
        </div>
      </div>

      <div className="w-full lg:w-[50%] py-10 lg:py-0 flex justify-center relative">
        {/* Background Card */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-[#2b4238] w-65 h-75 md:w-85 md:h-100 lg:w-105 lg:h-125 absolute rounded-2xl"
        ></motion.div>

        {/* Front Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -180 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.7,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.4 },
          }}
          className="bg-[#284a3c]  w-65 h-75 md:w-85 md:h-100 lg:w-105 lg:h-125 relative left-6 md:left-10 lg:left-12 top-6 md:top-10 lg:top-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          <img
            src={yellowSofa}
            alt="Yellow Sofa"
            className="h-full w-full object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
