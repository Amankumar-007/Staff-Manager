import React, { useState } from 'react';
import { Bell, Moon, Globe, Shield, AlertCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('english');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    setSuccess('Settings saved successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance</h2>
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="darkMode"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              </div>
              <div className="ml-3 flex items-center">
                <Moon size={18} className="text-gray-500 mr-2" />
                <label htmlFor="darkMode" className="font-medium text-gray-700">
                  Dark Mode
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="emailNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500 text-sm">
                    Receive email notifications for important updates
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="pushNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="pushNotifications" className="font-medium text-gray-700">
                    Push Notifications
                  </label>
                  <p className="text-gray-500 text-sm">
                    Receive push notifications in your browser
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Language</h2>
            <div className="flex items-center">
              <Globe size={18} className="text-gray-500 mr-2" />
              <select
                id="language"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Security</h2>
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="twoFactorAuth"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                />
              </div>
              <div className="ml-3 flex items-center">
                <Shield size={18} className="text-gray-500 mr-2" />
                <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">
                  Two-Factor Authentication
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleSaveSettings}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;