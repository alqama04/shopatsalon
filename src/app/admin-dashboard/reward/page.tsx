import React from "react";
import dynamic from "next/dynamic";
import fetchReward from "./FetchReward";
const UpdateReward = dynamic(() => import("./(action)/UpdateReward"), {
  ssr: false,
  loading() {
    return <div>Loading...</div>;
  },
});
const page = async () => {
  const { rewards } = await fetchReward();
 

  return (
    <div className="min-h-screen h-full" >
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-white tracking-wider  ">
              <th>Reward</th>
              <th>cycle purchase</th>
              <th>Level</th>
              <th>start Date</th>
              <th>End Date</th>
              <th>username</th>
              <th>email</th>
              <th>Settle</th>
            </tr>
          </thead>
          <tbody>
            {rewards.length &&
              rewards.map((item) => (
                <tr key={item._id}>
                  <td>Rs. {item.reward}</td>
                  <td>Rs. {item.cyclePurchase}</td>
                  <td>{item.currentCycle.name}</td>
                  <td>{new Date(item.cycleStartDate).toDateString()}</td>
                  <td>{new Date(item.cycleEndDate).toDateString()}</td>
                  <td>{item.user.username}</td>
                  <td>{item.user.email}</td>
                  <td>
                    <UpdateReward id={item._id.toString()} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
