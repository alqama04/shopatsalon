import Link from "next/link";
 
import React from "react";

interface PaginationProp {
  email?:string,
  phone?:string | number,
  page:number,
  limit:number,
  datatLen :number
}

const Pagination = ({email,phone,page,limit,datatLen}:PaginationProp) => {

  const common = `&limit=${limit}${phone?`&phone=${phone}`:''}${phone?`&email=${email}`:''}`

  const NextLink = `?page=${page+1}${common}`
  const prevLink= `?page=${page!==1?page-1:1}${common}`
 
  return (
    
      <div className="mt-auto join justify-center w-full m-auto">
        {
          page!==1 &&
        <Link href={prevLink} className="join-item base-btn ">
          «
        </Link>
        }
        <button className="join-item base-btn">Page {page}</button>

        {datatLen===limit &&
        <Link href={NextLink} className="join-item base-btn">
          »
        </Link>
        }
    </div>
  );
};

export default Pagination;
