import React from 'react'
import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const data = [
    { date: 'Page A', count: 4000 },
    { date: 'Page B', count: 3000 },
    { date: 'Page C', count: 2000 },
    { date: 'Page D', count: 2780 },
    { date: 'Page E', count: 1890 },
];
const MSRPChart = () => {

    const [selected, setSelected] = useState("new");

    return (
        <>
            <div className='count-chart-main'>
                <p style={{ fontWeight: "bold" }}>Average MSRP in USD</p>
                <button className='chart-button' style={ selected === "new" ? { backgroundColor: "#FF9926", color: "white" } : null} onClick={() => {setSelected("new")}}>NEW</button>
                <button className='chart-button' style={ selected === "used" ? { backgroundColor: "#FF9926", color: "white" } : null} onClick={() => {setSelected("used")}}>USED</button>
                <button className='chart-button' style={ selected === "cpo" ? { backgroundColor: "#FF9926", color: "white" } : null} onClick={() => {setSelected("cpo")}}>CPO</button>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="0 0" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#FF9926" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </>
    )
}

export default MSRPChart