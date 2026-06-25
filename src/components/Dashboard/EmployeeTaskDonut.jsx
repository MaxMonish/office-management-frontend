import React from "react";

import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeTaskDonut({ data }){
    const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];
    
    return(
    <div style = {{width:"100%", height:"300px"}}>
        <ResponsiveContainer>
            <PieChart>
                <Pie data = {data} dataKey = "value" nameKey = "name" innerRadius = {70} outerRadius = {110} paddingAngle = {4}>
                    {data.map((entry,index) => (
                        <Cell key = {index} fill = {COLORS[index]}/>
                    ))}
                    
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    </div>
    );
}

export default EmployeeTaskDonut;