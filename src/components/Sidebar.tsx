import React, { useState } from 'react';
import { Home, BarChart2, Users, Settings, LogOut } from 'lucide-react';
import Logo from '../Logo';

interface SidebarProps {
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [activePage, setActivePage] = useState('home');

  const handleNavigation = (page: string) => {
    setActivePage(page);
    onNavigate(page);
  };

  return (
    <div className="flex flex-col w-64 bg-gradient-to-br from-gray-900 to-gray-800 h-screen fixed left-0 top-0 shadow-lg">
      <div className="flex items-center justify-center h-24 shadow-md overflow-hidden mb-4">
        <Logo /> 
      </div>

      <nav className="flex-grow px-4">
        <ul className="flex flex-col space-y-2">
          <li>
            <button 
              className={`flex items-center px-4 py-3 w-full text-left rounded-md transition duration-200 
                ${activePage === 'home' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => handleNavigation('home')}
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center px-4 py-3 w-full text-left rounded-md transition duration-200 
                ${activePage === 'analytics' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => handleNavigation('analytics')}
            >
              <BarChart2 className="h-5 w-5 mr-3" />
              Analytics
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center px-4 py-3 w-full text-left rounded-md transition duration-200 
                ${activePage === 'customers' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => handleNavigation('customers')}
            >
              <Users className="h-5 w-5 mr-3" />
              Customers
            </button>
          </li>
          <li>
            <button 
              className={`flex items-center px-4 py-3 w-full text-left rounded-md transition duration-200 
                ${activePage === 'settings' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => handleNavigation('settings')}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-auto mb-4 px-4">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white rounded-md transition duration-200">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
