import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { BookingData } from '../types';

interface SparklineChartProps {
  data: BookingData[];
  type: 'adults' | 'children';
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, type }) => {
  const chartData = data.map((item, index) => ({
    date: `${item.arrival_date_year}-${String(item.arrival_date_month).padStart(2, '0')}-${String(item.arrival_date_day_of_month).padStart(2, '0')}`,
    value: item[type]
  }));
  const totalVisitors = data.reduce((sum, item) => sum + item[type], 0);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold mb-2">{totalVisitors}</div>
      <div className="text-sm text-gray-400 mb-4">Total {type} visitors</div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(tick) => tick.split('-')[2]}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(tick) => tick.toLocaleString()}
          />
          <Tooltip
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value: number) => [value.toLocaleString(), type]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#ff7300" 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;