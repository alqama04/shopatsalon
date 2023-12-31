"use client";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Purchase {
  amount: number;
  purchase_date: string;
  addedBy: {
    username: string;
  };
  createdAt: string;
}

interface ChartProps {
  purchase: Purchase[];
}

const Chart: React.FC<ChartProps> = ({ purchase }) => {
  const data = purchase.map((purchase) => ({
    purchases: purchase.amount,
    createdAt: `${new Date(purchase.createdAt).toDateString()}`, //
  }));

  return (
    <div className="h-full mt-8">
      <h1 className="text-[1.2rem] font-semibold tracking-wider">
        This Month Purchase
      </h1>
      <div className="h-64 mt-5 flex justify-start items-center">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            style={{ padding: 0, margin: 0 }}
            margin={{ top: 5, right: 3, left: -15, bottom: 5 }}
          >
            <CartesianGrid stroke="#720375" strokeDasharray="2 2" />
            <YAxis />

            <XAxis
              dataKey="createdAt"
              interval={"preserveStartEnd"}
              tickFormatter={(value) => value.slice(4, 10)}
            />

            <Line type="bump" dataKey="purchases" stroke="#8884d8" />

            <Tooltip wrapperStyle={{ backgroundColor: "#000", color: "red" }} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
