import { headers } from "next/headers";
import dynamic from "next/dynamic";

const UpdateLevel = dynamic(()=>import('../(action)/(updateLevel)/UpdateLevel'),{
  ssr:false,
  loading() {
    return <button className="loading loading-spinner loading-sm bg-gray-800"/>;
  },
})
 
const DeleteLevel = dynamic(()=>import("../(action)/(delete)/DeleteLevels"),{
  ssr:false,
  loading() {
    return <button className="loading loading-spinner loading-sm bg-red-700"/>;
  },
})


interface Level {
  _id: string;
  name: string;
  target_amt: number;
  reward_percentage: number;
  createdAt: string;
}

const FetchLevels = async () => {
  let levels: Level[];
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/levels`, {
      method: "GET",
      headers: headers(),
    });
    levels = await response.json();
  } catch (error) {
    levels = [];
   
    throw new Error("Unable to Get Data");
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Target</th>
              <th>Reward Percentage</th>
              <th>Created Date</th>
              <th>Update Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {levels.length >0 && levels.map((item: Level) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.target_amt}</td>
                <td>{item.reward_percentage}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <DeleteLevel id={item._id.toString()} />
                    <UpdateLevel id={item._id.toString()} name={item.name} target_amt={item.target_amt.toString()} reward_percentage={item.reward_percentage.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchLevels;
