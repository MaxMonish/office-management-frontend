import React from "react";

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

import PageLoader from "../../components/Common/PageLoader";

function EmployeeWeeklyChart({ data }){
    return(
    <div style = {{width: "100%", height: "300px"}}>
        <ResponsiveContainer>
            <BarChart data = {data}>
                <CartesianGrid strokeDasharray = "3 3"/>
                <XAxis dataKey = "day"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey = "tasks" fill = "#2563eb" radius = {[8,8,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    </div>
    );
}

export default EmployeeWeeklyChart;