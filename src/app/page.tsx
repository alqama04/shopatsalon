import Hero from "@/components/Hero";
import { Skeleton } from "@/components/Skeleton";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React from "react";

const Services = dynamic(() => import("@/components/Services"), {
  ssr:false,
  loading: () => (
    <div>
      <Skeleton />
    </div>
  ),
});

const Home = () => {
  return (
    <>
      <div>
        <div
          
          className="bg-Clip bg-gradient-to-br from-black via-gray-900 to-gray-950 "
        >
          <Navbar />
          <LandingPage />
        </div>
        <Hero />
        <Services />
      </div>
    </>
  );
};

export default Home;
