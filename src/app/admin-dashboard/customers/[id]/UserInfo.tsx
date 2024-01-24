import React from "react";

interface UserProp {
  _id: string;
  username: string;
  email: string;
  role: string;
  business_customer: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

let colClass = "flex flex-col gap-1 bg-gray-800 shadow-sm p-2 rounded-md ";

const UserInfo = ({user, phone_number}: {user: UserProp; phone_number: string;}) => {
  return (
    <div className="grid gap-2 grid-cols-2 md:3 lg:grid-cols-3 2xl:grid-cols-6">
      <div className={`${colClass} col-span-2 md:col-span-1`}>
        <h1>id</h1>
        <p className="text-white">{user._id}</p>
      </div>
      <div className={colClass}>
        <h1>user name</h1>
        <p className="text-white">{user.username}</p>
      </div>

      <div className={colClass}>
        <h1>Phone</h1>
        <p className="text-white">{phone_number}</p>
      </div>

      <div className={`${colClass} col-span-2 md:col-span-1`}>
        <h1>Email</h1>
        <p className="text-white">{user.email}</p>
      </div>
      <div className={colClass}>
        <h1>Business Customer</h1>
        <p className="text-white">{user.business_customer ? "YES" : "No"}</p>
      </div>

      <div className={colClass}>
        <h1>Created Date</h1>
        <p className="text-white">{new Date(user.createdAt).toDateString()} </p>
      </div>

      <div className={colClass}>
        <h1>User Type</h1>
        <p className="text-white">{user.role} </p>
      </div>
    </div>
  );
};

export default UserInfo;
