import React from "react";
import * as motion from "motion/react-client";
import yellowSofa from "../assets/images/yellow-sofa.jpg";

const Home = () => {
  return (
    <div className="h-[90vh] w-full flex flex-start px-25 gap-20 justify-center bg-[#3B5D4F] text-white">
      <div className="flex w-[50%] px-10 py-28 flex-col gap-6">
        <h1 className="font-semibold tracking-tighter leading-tight text-5xl">
          Designed to Elevate <br /> Everyday Living.
        </h1>
        <p className="text-lg text-gray-200 max-w-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
          odit omnis molestiae quibusdam distinctio iure animi labore rerum
          fugit earum blanditiis nulla soluta qui maiores!
        </p>
        <div className="flex gap-5 mt-2">
          <button className="bg-[#eec50e] text-black w-40 px-2 py-3 rounded-full text-md font-medium hover:bg-[#e1bc16]">
            Shop Now
          </button>
          <button className="bg-transparent border border-white w-40 px-2 py-3 rounded-full text-md font-medium hover:bg-white/20">
            Explore
          </button>
        </div>
      </div>

      <div className="w-[50%] py-15 px-10 relative">
        {/* Background Card */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-[#2b4238] h-110 w-105 absolute rounded-lg"
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
          className="bg-[#284a3c] h-110 w-105 relative left-12 top-12 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          <img
            src={yellowSofa}
            alt="Yellow Sofa"
            className="h-full w-full object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
