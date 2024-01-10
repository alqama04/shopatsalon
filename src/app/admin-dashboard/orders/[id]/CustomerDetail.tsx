import React from "react";

interface customerProp {
  customer: {
    user: {
      username: string;
      email: string;
    };
    display_name: string;
    phone_number: number;
    address: string;
    city: string;
    state: string;
  };
}

const CustomerDetail = ({customer}:customerProp) => {
  return (
    <>
      <h1>Customer Detail</h1>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2">
        <div className="shadow-md rounded-lg bg-gray-800 p-2">
          <h1>Name</h1>
          <p className="text-white">{customer?.user.username}</p>
        </div>
        <div className="shadow-md rounded-lg bg-gray-800 p-2">
          <h1>Buisiness Name</h1>
          <p className="text-white break-words">{customer?.display_name}</p>
        </div>
        <div className="shadow-md rounded-lg bg-gray-800 p-2">
          <h1>Phone</h1>
          <p className="text-white">{customer?.phone_number}</p>
        </div>
        <div className="shadow-md rounded-lg bg-gray-800 p-2">
          <h1>Email</h1>
          <p className="text-white break-words">{customer?.user.email}</p>
        </div>

        <div className="shadow-md rounded-lg bg-gray-800 p-2">
          <h1>City</h1>
          <p className="text-white">{customer?.city}</p>
        </div>
        <div className="shadow-md rounded-lg bg-gray-800 p-2">
          <h1>State</h1>
          <p className="text-white break-words">{customer?.state}</p>
        </div>
        <div className="shadow-md rounded-lg bg-gray-800 p-2 col-span-2">
          <h1>Address</h1>
          <p className="text-white break-words">{customer?.address}</p>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail;
