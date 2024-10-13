import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-400 mb-2">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter site name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-2">
              Language
            </label>
            <select
              id="language"
              name="language"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-400">Enable dark mode</span>
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;