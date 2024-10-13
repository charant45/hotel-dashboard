import React from 'react';

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ChartWrapper;