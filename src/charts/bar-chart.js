import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    year: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    year: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    year: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    year: 'Page D',
    pv: 3908,
    amt: 2000,
  },
  {
    year: 'Page E',
    pv: 4800,
    amt: 2181,
  },
  {
    year: 'Page F',
    pv: 3800,
    amt: 2500,
  },
  {
    year: 'Page G',
    pv: 4300,
    amt: 2100,
  },
];

function AlbumsChart(props) {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}

export default AlbumsChart;
