import { headers } from "next/headers";
import React from "react";
import dynamic from "next/dynamic";

const CustomerList = dynamic(()=>import('./CustomerList'),{
  loading: () => <div>Loading...</div>,
})

const Pagination = dynamic(()=>import('@/components/Pagination'),{
  loading: () => <div>Loading...</div>,
})
const Search = dynamic(()=>import('@/components/Search'),{
  loading: () => <div>Loading...</div>,
})

const page = async ({ searchParams }: any) => {
  let customer = [];
  let totalCustomer = 0
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;
  const phone = searchParams.phone;
  const email = searchParams.email;

  let queryStr = `page=${page}&limit=${limit}${phone ? `&phone=${phone}` : ""}${
    email ? `&email=${email}` : ""
  }`;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/customers?${queryStr}`,
    {
      headers: new Headers(headers()),
    }
  );

  if (res.ok) {
    const data= await res.json();
    customer = data?.user
    totalCustomer = data.totalUsers
  }
  

  return (
    <div className="min-h-screen h-full flex flex-col ">
      <div className="flex-1 p-1">
        <h1 className="text-[1.3rem] font-semibold">Total Customers - {totalCustomer} </h1>
        <div className="md:w-1/3">
          <Search placeholder="Find customer" />
        </div>
        <CustomerList  customers={customer}/>
      </div>

      <div className="my-auto">
        <Pagination
          page={page}
          limit={limit}
          email={email}
          phone={phone}
          datatLen={customer.length || 0}
        />
      </div>
    </div>
  );
};

export default page;
