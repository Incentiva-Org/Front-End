import {React, Component, useState, createRef, useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Graphs({data}) {
    return (
          <LineChart
            width={500}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis  />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Work" stroke="#0088FE" />
            <Line type="monotone" dataKey="School" stroke="#00C49F" />
            <Line type="monotone" dataKey="Life" stroke="#FFBB28" />
            <Line type="monotone" dataKey="Exercise" stroke="#FF8042" />
          </LineChart>
      );
  }