import { headers } from "next/headers";
import React from "react";
import dynamic from "next/dynamic";

const UserDetail  = dynamic(()=>import('./UserDetail'),{
  loading() {
    return <div>Loading...</div>;
  },
})

interface Params {
  params: {
    id: string;
  };
}

const page = async ({ params }: Params) => {
  let data: any = {};
  let errorMsg;
  try {
    let res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/customers/${params.id}`,
      { headers: new Headers(headers()) }
    );
    if (res.ok) {
      const { customer } = await res.json();
      data = customer;
    }
    if (!res.ok) {
      const { error } = await res.json();
      errorMsg = error || "unknow error occured";
    }
  } catch (error) {
    errorMsg = "something went wrong";
  }

  return (
    <div className="min-h-screen h-full p-2">
      {!errorMsg ? (
        <UserDetail customer={data} />
      ) : (
        <h1 className="text-1.2[rem] text-center">{errorMsg}</h1>
      )}

    </div>
  );
};

export default page;
