import Link from "next/link";
import React from "react";

const Pagination = () => {
  return (
    
      <div className="mt-auto join justify-center w-full m-auto">
        <Link href="/" className="join-item base-btn ">
          «
        </Link>
        <button className="join-item base-btn">Page </button>
        <Link href={""} className="join-item base-btn">
          »
        </Link>
    </div>
  );
};

export default Pagination;
