import React from 'react'

interface UserProp{
    _id:string,
    username:string,
    email:string,
    role:string,
    business_customer:boolean,
    createdAt:string,
}

const UserTable = () => {
  return (
    <>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
 
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
 
       
     
    </tbody>
  </table>
</div>
    </>
  )
}

export default UserTable