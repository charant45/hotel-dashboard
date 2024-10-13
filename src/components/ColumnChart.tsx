import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BookingData } from '../types';

interface ColumnChartProps {
  data: BookingData[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const countryData = data.reduce((acc, item) => {
    const visitors = item.adults + item.children + item.babies;
    acc[item.country] = (acc[item.country] || 0) + visitors;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(countryData)
    .map(([country, visitors]) => ({ country, visitors }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="country" 
          angle={-45}
          textAnchor="end"
          height={60}
          interval={0}
          tick={{fontSize: 12}}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="visitors" fill="#82ca9d">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${index * 36}, 70%, 50%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChart;