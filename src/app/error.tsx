"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";
const Footer = dynamic(() => import("@/components/Footer"),{
  ssr: false,
  loading(){
    return <div><Skeleton/></div>;
  }
});

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <>
      <div className="mb-5 bg-gradient-to-r from-gray-950 via-gray-800 to-gray-900 h-[80svh] ">
        <div className="flex gap-5 justify-center items-center flex-col h-full text-white">
          <h2 className="font-bold text-[1.4rem] tracking-widest">
            {error.message || "something went wrong"}
          </h2>

          <div className="flex gap-4">
            <button className="btn font-semibold" onClick={reset}>
              Try Again
            </button>
            <button
              className="btn font-semibold"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default error;
