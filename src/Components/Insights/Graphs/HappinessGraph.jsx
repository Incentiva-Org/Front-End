import {React, Component, useState, createRef, useEffect} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HappinessGraph({data}) {
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
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Happiness" barSize={30} fill="#805AD5"/>
            </BarChart>
      );
  }