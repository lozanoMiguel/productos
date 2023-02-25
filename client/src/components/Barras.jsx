import React from "react";
import { ResponsiveContainer, BarChart, YAxis, XAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts'

function Barras({ datos }){
    
    return  (
        <ResponsiveContainer width="100%" aspect={2}>
            <BarChart
                data={datos}
                width={500}
                height={300}
                margin={{
                    top:5,
                    right:30,
                    left:20,
                    bottom:5
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="nombre"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mayor_precio" fill="#6b48ff" />
                <Bar dataKey="mayor_stock" fill="#1ee3cf" />
            </BarChart>    
        </ResponsiveContainer>
    )
}

export default Barras;

