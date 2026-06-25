import React from "react";

import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";

import PageLoader from "../../components/Common/PageLoader";

const COLORS = ["#22c55e",  "#ef4444", "#eab308"];

const renderCustomLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, value}) => {
  if (value === 0) return null;
  
  const RADIAN = Math.PI / 180;
  
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);

  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return(
  <text x = {x} y = {y} fill = "#334155" textAnchor = {
    x > cx ? "start" : "end"}
    
    dominantBaseline = "central" fontSize = "14" fontWeight = "600">
      {`${value} (${(
        percent * 100).toFixed(0)}%)`}
  </text>
  );
};

export function AttendancePieChart({data}){
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return(
  
  <ResponsiveContainer width = "100%" height = {450}>
    <PieChart>
      <Pie data = {data} dataKey = "value" nameKey = "name" cx = "50%" cy = "50%" innerRadius = {100} outerRadius = {170} paddingAngle={4} labelLine = {true} label = {renderCustomLabel}>
        {data.map((entry, index) => (
          <Cell key={index} fill={ COLORS[index] } />
        )
        )}
      </Pie>

        <text x = "50%" y = "47%" textAnchor = "middle" dominantBaseline = "middle" fontSize = "42" fontWeight = "700" fill = "#0f172a">
          {total}
        </text>

        <text x = "50%" y="55%" textAnchor = "middle" dominantBaseline = "middle" fontSize = "16" fill = "#64748b">
          Total
        </text>

        <Tooltip formatter = {(value) => [value, "Days"]}/>

        <Legend verticalAlign = "bottom" height = {50}/>

      </PieChart>

    </ResponsiveContainer>

  );
}