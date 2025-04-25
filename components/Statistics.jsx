'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const data = [
  { name: 'Jan', uv: 400, pv: 240, zv: 299},
  { name: 'Feb', uv: 300, pv: 139, zv: 539},
  { name: 'Mar', uv: 200, pv: 980, zv: 649},
  { name: 'Apr', uv: 278, pv: 390, zv: 709},
  { name: 'May', uv: 189, pv: 480, zv: 909},
];

const Statistics = () => {
  return (
    <div className='flex flex-col flex-1 bg-[#0b100e] px-12 py-4 rounded-2xl text-white'>
      <div className='flex flex-1/4 px-4 py-4 rounded-2xl'>Your Statistics</div>
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorZv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ffff00" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="zv" stroke="#ff0000" fillOpacity={1} fill="url(#colorZv)" />
      </AreaChart>
    </div>
  );
};

export default Statistics;
