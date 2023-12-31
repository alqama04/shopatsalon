import React from "react";
import landingImage from "@/assets/landingpage.webp";
import Image from "next/image";
import Navbar from "./Navbar";
import deliveryImage from "@/assets/delivery.webp";

const LandingPage = () => {
  return (
    <div>
      <div className="w-screen h-[100svh]">
        <div className="h-full">
          <Image
            src={landingImage}
            width={1300}
            height={800}
            alt="Landing Page"
            className="w-full h-full"
          />
        </div>
      </div>

    <div className="p-1">
      <div className="card bg-white shadow-xl md:w-[80%] lg:w-[70%] m-auto mt-3 ">
        <div className="flex items-center flex-col-reverse md:flex-row gap-2 md:gap-5 ">
          <div className="w-full p-1 md:w-[35%]">
            <Image
              src={deliveryImage}
              width={300}
              height={200}
              alt="Shop At Salon Delivery"
              className="w-full rounded-lg"
            />
          </div>

          <div className="md:pr-5 flex-1 p-1">
            <h1 className="text-center md:text-left font-bold text-[1.4rem] tracking-wide">
              Conveniece Delivered!
            </h1>
            <p className="text-center md:text-left mt-1 md:font-semibold">
              Shop At Salon Offers you the Whole Range of Products You Need In
              your Salon @ Best Price with a Same Day & Next Day Delivery
              Guaruntee.
            </p>
            <p className="text-[0.8rem] text-center font-semibold mt-4 tracking-wider">Expertise. Commitment. Value.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
