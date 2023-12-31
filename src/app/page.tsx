import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/Skeleton";
import dynamic from "next/dynamic";
import React from "react";

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => (
    <div>
      <Skeleton />
    </div>
  ),
});

const Home = () => {
  return (
    <>
      <Navbar/>
      <LandingPage />
      <Services />
    </>
  );
};

export default Home;
