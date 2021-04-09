import {React} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function HappinessGraph({data}) {
    console.log(data)
    return (
            <BarChart
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
                <XAxis dataKey="Date" />
                <YAxis interval={[0, 10]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="Happiness" barSize={30} fill="#805AD5"/>
            </BarChart>
      );
  }