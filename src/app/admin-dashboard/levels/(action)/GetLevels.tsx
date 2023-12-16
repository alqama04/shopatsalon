"use client";

import React, { useEffect, useState } from "react";
import UpdateLevel from "./UpdateLevel";
import DeleteLevel from "./DeleteLevels";

interface Level {
  _id: string;
  name: string;
  target_amt: string;
  createdAt: string;
}

const GetLevels: React.FC = () => {
  const [data, setData] = useState<Level[]>([]);

  const formatDate = (dateString: string): string => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString();
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Response = await fetch("/api/levels");
        const responseData: Level[] = await response.json();
        console.log(responseData)
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-md h-full">
        <thead>
          <tr>
            <th>Level</th>
            <th>Target</th>
            <th>Date Created (MM/DD/YY)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.target_amt}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="w-max">
                <div className="flex gap-1">
                <UpdateLevel levelId={item._id} />
                <DeleteLevel levelId={item._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetLevels;
