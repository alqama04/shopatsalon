import React from "react";
import fetchData from "../fetchData";
 
const PurchaseTable = async() => {
  const {purchase} = await fetchData()
  return (
    <div className="mt-5">
      <div className="overflow-x-auto">
        <table className="table align-middle rounded-md bg-gray-800 p-1">
          <thead>
            <tr className="text-white text-[1rem]">
              <th>Amount</th>
              <th>Purchase Date</th>
              <th>Record Added By</th>
            </tr>
          </thead>
          <tbody className="mt-2">
            {purchase.length ? (
              purchase.map((item) => (
                <tr
                  key={item.createdAt}
                  style={{ borderRadius: "10px" }}
                  className="hover:bg-gray-900 transition-all duration-200  border-none"
                >
                  <td>Rs {item.amount} </td>
                  <td>{new Date(item.createdAt).toDateString()}</td>
                  <td>Purple</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-[1.1rem]">
                  <h2>Nothing to show Here</h2>
                </td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseTable;
