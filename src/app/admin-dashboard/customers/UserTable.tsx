import React from 'react';

interface UserProp {
  _id: string;
  username: string;
  email: string;
  role: string;
  business_customer: boolean;
  isActive: boolean;
  createdAt: string;
}

interface UserTableProps {
  users: UserProp[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-sm align-middle rounded-md bg-gray-800 p-1">
          <thead>
            <tr className='text-gray-400 tracking-wider '>
              <th>Name</th>
              <th>Email</th>
              <th>Business Customer</th>
              <th>Active</th>
              <th>CreatedAt</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className='hover:bg-gray-900 transition-all duration-200 border-none'>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className={`${user.business_customer?'text-green-600':"text-red-600"}`}>{user.business_customer?"Yes":"No"}</td>
                <td className={`${user.isActive?'text-green-600':"text-red-600"}`}>{user.isActive ? 'Yes' : 'No'}</td>
                <td>{new Date(user.createdAt).toDateString()}</td>
                <td>{user.role}</td>
                <td>{/* Add action button or link here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
