import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  dateRange: [Date, Date];
  setDateRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <DatePicker
        selected={dateRange[0]}
        onChange={(date: Date | null) => date && setDateRange([date, dateRange[1]])}
        selectsStart
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-400">to</span>
      <DatePicker
        selected={dateRange[1]}
        onChange={(date: Date | null) => date && setDateRange([dateRange[0], date])}
        selectsEnd
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        minDate={dateRange[0]}
        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateRangePicker;