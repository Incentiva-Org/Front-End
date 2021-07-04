import {React} from 'react'
import {Typography} from "@material-ui/core"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Graphs({data}) {
    return (
      <>
        <Typography style={{textAlign: "center"}}># Tasks Over Time</Typography>
        <LineChart
          width={350}
          height={180}
          data={data}
          margin={{
            top: 5,
            right: 40,
            left: -20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis  />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="School" stroke="#FF8042" />
          <Line type="monotone" dataKey="Work" stroke="#FFBB28" />
          <Line type="monotone" dataKey="Life" stroke="#00C49F" />
          <Line type="monotone" dataKey="Exercise" stroke="#0088FE" />
        </LineChart>
      </>
    );
  }