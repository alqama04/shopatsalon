'use client'
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 20
  const phone = Number(searchParams.get('phone'))
  const email = searchParams.get('email')

  const common = `&limit=${limit}${phone?`&phone=${phone}`:''}${phone?`&email=${email}`:''}`

  const NextLink = `${pathname}?page=${page+1}${common}`
  const prevLink= `${pathname}?page=${page!==1?page-1:1}${common}`
 
  return (
    
      <div className="mt-auto join justify-center w-full m-auto">
        <Link href={prevLink} className="join-item base-btn ">
          «
        </Link>
        <button className="join-item base-btn">Page </button>
        <Link href={NextLink} className="join-item base-btn">
          »
        </Link>
    </div>
  );
};

export default Pagination;
