import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"

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

const Chart = ({duration, service}) => {

    const [data, setData] = useState([])
    const [selected, setSelected] = useState("new");
    // const [duration, setDuration] = useState("last year")

    useEffect(() => {
        axios({
            method: "POST",
            url: "http://localhost:8080/api/inventory",
            data: {
                service: service,
                condition: selected,
                duration: duration
            }
        }).then((res) => {
            setData(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [selected, duration])

    return (
        <>
            <div className='count-chart-main'>
                <p style={{ fontWeight: "bold" }}>{service}</p>
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

export default Chart