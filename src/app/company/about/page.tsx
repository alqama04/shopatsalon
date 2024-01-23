import { socialLinks } from "@/constant/socialLinks";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const About = () => {
  return (
    <div className=" ">
      <div className="px-1 md:px-10 lg:px-12 xl:px-20">
        <div className="bg-white px-1 md:px-2 rounded-md shadow-md py-4">
          <h1 className="font-extrabold tracking-wider text-[1.6rem]">
            About US
          </h1>
          <h2 className="mt-3 mb-1 text-[1.3rem] font-semibold">
            Welcome to Shop at Salon – Where Style Meets Convenience!
          </h2>
          <p className="font-medium">
            At Shop at Salon, we take pride in being your premier destination
            for all your salon needs. Born out of a passion for transforming the
            salon industry, we are not just an e-commerce platform; we are your
            dedicated partner in elevating your salon experience.
          </p>

          <div>
            <h1 className="font-bold text-[1.4rem] mt-4 ">Our Story :</h1>
            <p className="font-medium">
              In a world where trends evolve rapidly, Shop at Salon emerges as a
              beacon of innovation and customer-centricity. Much like the
              trusted ambiance of a salon, our platform is designed to be an
              immersive space that meets the unique needs of salon
              professionals.
            </p>
          </div>
          <div className="mt-5">
            <h1 className="font-medium text-[1.1rem] mt-4">
              Why Shop at Salon?
            </h1>
            <div>
              <h2 className="mt-3 text-[1.2rem] font-semibold">
                Exclusive Benefits:
              </h2>
              <p>
                {`We understand that every salon is unique, and that's why we
                offer more than just products. Shop at Salon provides an
                exclusive platform where salons can access a curated selection
                of high-quality products tailored to meet their specific
                requirements.`}
              </p>
            </div>
            <div>
              <h2 className="mt-3 text-[1.2rem] font-semibold">
                Same or Next Day Delivery:
              </h2>
              <p>
                {`In the fast-paced world of beauty and style, time is of the essence. We ensure that your salon doesn't miss a beat with our prompt same-day or next-day delivery service. Your order today, at your doorstep tomorrow.`}
              </p>
            </div>
            <div>
              <h2 className="mt-3 text-[1.2rem] font-semibold">
                Rewarding Partnerships:
              </h2>
              <p>
                {`At Shop at Salon, we believe in celebrating the success of our partners. Our unique business model goes beyond transactions – it's about building lasting relationships. Enroll in our annual schemes, achieve your targets, and watch as your salon earns exclusive cashback rewards, adding a touch of financial flourish to your success.`}
              </p>
            </div>
            <div>
              <h2 className="mt-3 text-[1.2rem] font-semibold">
                Rewarding Partnerships:
              </h2>
              <p>
                {`At Shop at Salon, we believe in celebrating the success of our partners. Our unique business model goes beyond transactions – it's about building lasting relationships. Enroll in our annual schemes, achieve your targets, and watch as your salon earns exclusive cashback rewards, adding a touch of financial flourish to your success.`}
              </p>
            </div>
            <div>
              <h2 className="mt-3 text-[1.2rem] font-semibold">
                A Dedicated Support System:
              </h2>
              <p>
                {`Your satisfaction is our priority. Our dedicated customer support team is here to assist you at every step. Whether you have inquiries about our products or need assistance with your order, we are just a message or a call away.`}
              </p>
            </div>
            <div>
              <h2 className="mt-3 text-[1.2rem] font-semibold">
                Elevating Salons, One Order at a Time:
              </h2>
              <p>
                {`Shop at Salon is more than an e-commerce platform; it's a commitment to elevate the salon experience. We envision a future where salons thrive, fueled by the seamless access to the best products and the unparalleled support from Shop at Salon.`}
              </p>
            </div>
          </div>
          <div className="my-2">
            <p>{`Join us on this exciting journey of style, convenience, and rewards. Shop at Salon – Your Salon's Success Partner.`}</p>
          </div>
          <div>
            <p>{`For any inquiries or to explore our exclusive annual schemes, feel free to contact us. Together, let's redefine the salon experience.`}</p>
          </div>
          <div>
            <p className="font-semibold my-3 text-center">{`Elevate, Inspire, Transform – Welcome to Shop at Salon!`}</p>
            <div className="flex justify-center gap-5 items-center w-[10rem] m-auto bg-gray-900 p-2 rounded-md text-white">
              <a href={socialLinks.ig} target="_blank">
                <FaInstagram size={30} className="stroke-2" />
              </a>

              <a href={socialLinks.wtsp} target="_blank">
                <FaWhatsapp size={30} className="stroke-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
