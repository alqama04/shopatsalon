import React from "react";
interface CustomerListProp {
  _id: string;
  username: string;
  email: string;
  business_customer: boolean;
  createdAt: string;
  isActive: boolean;
  role: string;
}

interface customerList {
  customers?: CustomerListProp[];
}

const CustomerList = ({ customers }: customerList) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table align-middle rounded-md bg-gray-800 p-1">
          <thead>
            <tr className="text-white text-[1rem]">
              <th>Username</th>
              <th>Email</th>
              <th>Business Customer</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>isActive</th>
            </tr>
          </thead>
          <tbody className="mt-2">
            {customers?.map((customer) => (
              <tr
                key={customer._id}
                className="hover:bg-gray-900 transition-all duration-200  border-none"
              >
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td
                  className={
                    customer.business_customer
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {customer.business_customer ? "Yes" : "No"}
                </td>
                <td>{customer.role}</td>
                <td>{new Date(customer.createdAt).toDateString()}</td>
                <td>{customer.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
