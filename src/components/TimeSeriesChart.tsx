import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookingData } from '../types';

interface TimeSeriesChartProps {
  data: BookingData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    date: new Date(item.arrival_date_year, item.arrival_date_month - 1, item.arrival_date_day_of_month).toISOString().split('T')[0],
    visitors: item.adults + item.children + item.babies
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {/* <Area type="monotone" dataKey="visitors" stroke="#D8BFD8" fill="#D8BFD8" fillOpacity={0.3} /> */}
        <Area type="monotone" dataKey="visitors" stroke="#FFA500" fill="#FFA500" fillOpacity={0.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;