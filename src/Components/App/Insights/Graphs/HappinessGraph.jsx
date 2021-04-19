import { Typography } from '@material-ui/core';
import {React} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function HappinessGraph({data}) {
    return (
        <>
            <Typography style={{textAlign: "center"}}>Happiness Over Time</Typography>
            <BarChart
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
                <XAxis dataKey="Date" />
                <YAxis interval={[0, 10]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="Happiness" barSize={30} fill="#805AD5"/>
            </BarChart>
        </>
      );
  }