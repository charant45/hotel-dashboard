import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Customers from './components/Customers';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'customers':
        return <Customers />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 ml-64">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;