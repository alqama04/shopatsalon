import React from "react";
import dynamic from "next/dynamic";

const UserInfo = dynamic(() => import("./UserInfo"), {
  loading() {
    return <div>Loading...</div>;
  },
});

interface Customer {
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
    business_customer: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  currentCycle: {
    name: string;
    target_amt: number;
    reward_percentage:number
  };
  cyclePurchase: number;
  reward: number;
  cycleStartDate: string;
  cycleEndDate: string;
  allTimePurchase: number;
  display_name: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  createdAt: string;
}

interface UserDetailProps {
  customer: Customer;
}
let colClass = "flex flex-col gap-1 bg-gray-800 shadow-sm p-2 rounded-md ";

const UserDetail: React.FC<UserDetailProps> = ({ customer }) => {
  return (
    <div>
      <h2 className="text-[1.4rem] tracking-wider mb-2">Customer Info</h2>
      <UserInfo user={customer.user} phone_number={customer.phone_number} />

      <h2 className="text-[1.4rem] tracking-wider mt-3 mb-1.5">
        Business Info
      </h2>
      <div className="grid gap-2 grid-cols-2 md:3 lg:grid-cols-3 2xl:grid-cols-6">
        <div className={colClass}>
          <h1>Business Name</h1>
          <p className="text-white">{customer.display_name}</p>
        </div>

        <div className={colClass}>
          <h1>Registered Date</h1>
          <p className="text-white">
            {new Date(customer.createdAt).toDateString()}
          </p>
        </div>

        <div className={colClass}>
          <h1>City</h1>
          <p className="text-white">{customer.city}</p>
        </div>

        <div className={colClass}>
          <h1>State</h1>
          <p className="text-white">{customer.state}</p>
        </div>

        <div className={`${colClass} col-span-2`}>
          <h1>Address</h1>
          <p className="text-white">{customer.address}</p>
        </div>
      </div>

      <h2 className="text-[1.4rem] tracking-wider mt-3 mb-1.5">
        Purchase Cycle 
        <span className="flex text-[0.9rem] text-red-700">
          {new Date(customer.cycleStartDate).toDateString()} -{" "}
          {new Date(customer.cycleEndDate).toDateString()}
        </span>
      </h2>

      <div className="grid gap-2 grid-cols-2 md:4 lg:grid-cols-4 2xl:grid-cols-6">
        <div className={colClass}>
          <h1>Level</h1>
          <div className="flex gap-2 items-center">
          <p className="text-white capitalize">{customer.currentCycle.name}</p>
          <p className="text-white">{customer.currentCycle.reward_percentage}%</p>
          </div>
          
        </div>

        <div className={colClass}>
          <h1>Level Target</h1>
          <p className="text-white">{customer.currentCycle.target_amt}</p>
        </div>

        <div className={colClass}>
          <h1>Target achieved</h1>
          <p className="text-white">{customer.cyclePurchase}</p>
        </div>

        <div className={colClass}>
          <h1>Reward</h1>
          <p className="text-white">{customer?.reward.toFixed(2)}</p>
        </div>
        <div className={colClass}>
          <h1>All Time Purchase</h1>
          <p className="text-white">{customer.allTimePurchase}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
