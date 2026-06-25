import React from "react";
import PageLoader from "../../components/Common/PageLoader";

import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";

export function TaskBarChart({data}){
  return(
  <ResponsiveContainer width = "100%" height = {320}>
    <BarChart data = {data} margin = {{top: 20, right: 20, left: 0, bottom: 5}}>
      <CartesianGrid strokeDasharray = "3 3"/>
      <XAxis dataKey = "name"/>
      <YAxis />
      <Tooltip />
      <Bar dataKey = "value" radius = {[8,8,0,0]}/>
    </BarChart>
  </ResponsiveContainer>
  );
}

export default TaskBarChart;