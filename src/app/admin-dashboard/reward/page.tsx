import React from "react";
import dynamic from "next/dynamic";
import fetchReward from "./FetchReward";

const UpdateReward = dynamic(() => import("./(action)/UpdateReward"), {
  ssr: false,
  loading() {
    return <div>Loading...</div>;
  },
});

const Pagination = dynamic(() => import("@/components/Pagination"), {
  loading() {
    return <div>Loading...</div>;
  },
});
const Search = dynamic(() => import("@/components/Search"), {
  loading() {
    return <div>Loading...</div>;
  },
});

const page = async ({ searchParams }: any) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;
  const phone = searchParams.phone;
  const email = searchParams.email;

  const rewardData = await fetchReward({ page, limit, phone, email });

  return (
    <div className="min-h-screen h-full flex flex-col ">
      <div className="flex-1">
        <div className="w-1/3 p-1">
          <Search placeholder="Find User" />
        </div>
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
              {rewardData
                ? rewardData?.rewards.length &&
                  rewardData?.rewards.map((item) => (
                    <tr key={item._id}>
                      <td>Rs. {item?.reward}</td>
                      <td>Rs. {item?.cyclePurchase}</td>
                      <td>{item?.currentCycle?.name || ""}</td>
                      <td>{new Date(item?.cycleStartDate).toDateString()}</td>
                      <td>{new Date(item?.cycleEndDate).toDateString()}</td>
                      <td>{item?.user?.username}</td>
                      <td>{item?.user?.email}</td>
                      <td>
                        <UpdateReward id={item._id.toString()} />
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        page={page}
        limit={limit}
        email={email}
        phone={phone}
        datatLen={rewardData?.rewards.length || 0}
      />
    </div>
  );
};

export default page;
