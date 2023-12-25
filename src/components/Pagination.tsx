"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Pagination = () => {
  const searchParam = useSearchParams();

  const [activePage, setActivePage] = useState(
    Number(searchParam.get("page")) || 2
  );
  const router = useRouter();
  const pathname = usePathname();
  console.log(activePage);

  const handlePagination = () => {
    console.log("first");
    console.log(activePage);
    setActivePage(activePage+1);
    router.push(`${pathname}?page=${activePage}`);
    router.refresh();
  };
  return (
    <div>
      <button onClick={() => handlePagination()} className="base-btn">
        Load More
      </button>
    </div>
  );
};

export default Pagination;
