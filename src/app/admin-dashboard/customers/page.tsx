import { headers } from "next/headers";
import React from "react";
import dynamic from "next/dynamic";

const UserTable = dynamic(()=>import('./UserTable'),{
  loading(){
    return <div>Loading...</div>;
  }
})

const Pagination = dynamic(()=>import('@/components/Pagination'))
const Search = dynamic(()=>import('@/components/Search'))

const page = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 30;
  const phone = searchParams.phone;
  const email = searchParams.email;
 
  let queryStr = `page=${page}&limit=${limit}${phone ? `&phone=${phone}` : ""}${
    email ? `&email=${email}` : ""
  }`; 

  let users = [];
  let error;
  
  let res = await fetch(`${process.env.NEXTAUTH_URL}/api/customers?${queryStr}`, {
    headers: new Headers(headers()),
  });
  const data = await res.json();
  if (res.ok) {
    users = data?.user;
  } else {
    error = data?.error || "unknow error occured";
  }


  return (
    <div className="min-h-screen h-full p-2 flex flex-col">
      {error ? (
        <h2 className="text-red-600">{error}</h2>
      ) : (
        <div className="flex-1">
          <h2 className="text-[1.2rem] font-semibold tracking-wider">
            Customers
          </h2>
          <div className="md:w-1/3">
            <Search placeholder="Find User" />
          </div>

          {users.length ? (
            <div>
              <UserTable users={users} />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <Pagination showNextLink={users.length || 0} page={page} limit={limit} />
    </div>
  );
};

export default page;
