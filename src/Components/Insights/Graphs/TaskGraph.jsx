import {React} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

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
            <Line type="monotone" dataKey="School" stroke="#FF8042" />
            <Line type="monotone" dataKey="Work" stroke="#FFBB28" />
            <Line type="monotone" dataKey="Life" stroke="#00C49F" />
            <Line type="monotone" dataKey="Exercise" stroke="#0088FE" />
          </LineChart>
      );
  }