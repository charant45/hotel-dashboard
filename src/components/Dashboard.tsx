import React, { useState, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import TimeSeriesChart from './TimeSeriesChart';
import ColumnChart from './ColumnChart';
import SparklineChart from './SparklineChart';
import { fetchBookingData } from '../utils/api';
import { BookingData } from '../types';

const Dashboard: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(2022, 0, 1),
    new Date(2022, 11, 31)
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchBookingData(dateRange[0], dateRange[1]);
      setBookingData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Hotel Booking Dashboard</h1>
      <div className="mb-8">
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Visitors per Day</h2>
            <TimeSeriesChart data={bookingData} />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Visitors per Country</h2>
            <ColumnChart data={bookingData} />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Adult Visitors</h2>
            <SparklineChart data={bookingData} type="adults" />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Child Visitors</h2>
            <SparklineChart data={bookingData} type="children" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
