import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";

import Anim from "@/components/Anim";

const Services = dynamic(() => import("@/components/Services"), {
  ssr: false,
  loading: () => (
    <div>
      <Skeleton />
    </div>
  ),
});

const Navbar = dynamic(()=>import('@/components/Navbar'))
const Brand = dynamic(() => import("@/components/Brands/Brand"));
const Hero = dynamic(() => import("@/components/Hero"));
const LandingPage = dynamic(() => import("@/components/LandingPage")
,{
  loading: () => (
    <div>
      <Skeleton />
    </div>
  ),
}
);
const Footer = dynamic(() => import("@/components/Footer"));

const Home = () => {

  return (
    <>
      <div>
        <div className="bg-Clip">
          <Navbar />
          <LandingPage />
        </div>

        <Anim>
          <Hero />
        </Anim>

        <Anim>
          <Services />
        </Anim>
        <Anim>
          <Brand />
        </Anim>
        <Anim>
          <Footer />
        </Anim>
      </div>
    </>
  );
};

export default Home;
