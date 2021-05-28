import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];
export default function TaskPie({data}) {
  var formatted = [{name: "School", value: 0}, {name: "Work", value: 0}, {name: "Life", value: 0} , {name: "Exercise", value: 0}]
  for(const i in data) {
    formatted[0].value += data[i].School
    formatted[1].value += data[i].Work
    formatted[2].value += data[i].Life
    formatted[3].value += data[i].Exercise
  }
  data = formatted
  return (
      <PieChart width={350} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy={140}
            innerRadius={120}
            outerRadius={140}
            labelLine={false}
            fill="#8884d8"
            startAngle={180}
            endAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
      </PieChart>
  );
}