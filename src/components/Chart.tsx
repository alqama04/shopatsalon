'use client'
import React from 'react'
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

const Chart = ({data}:any) => {
  
  return (
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
  )
}

export default Chart