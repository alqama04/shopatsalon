"use client";
import { brandImages } from "@/constant/brandImage";
import Marquee from "react-fast-marquee";
import React from "react";

import Image from "next/image";

const BrandImage = () => {

  return (
    <div>
      <Marquee pauseOnHover={true} speed={70} delay={0.5}>
        <div
           
          className="relative flex gap-3 mr-3"
        >
          {brandImages.map((item, i) => (
            <div
              key={i}
              className="
          bg-white
          text-center
          w-36 h-28
          rounded-md
          overflow-hidden
          flex justify-center items-center
          hover:scale-x-110
          transition-all
          select-none
          z-10
           "
            >
              <Image
                src={`/brands/${item.image}`}
                width={300}
                height={200}
                alt={item.image}
                className="object-fill"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default BrandImage;
