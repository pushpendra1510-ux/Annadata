import React, { useState } from 'react';
import { Lock, Upload, Send, Users, FileText, Settings } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AdminPanelProps {
  language: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ language }) => {
  const t = translations[language];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('schemes');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in real app, use proper auth
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin/admin123 for demo.');
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <Lock className="text-gray-400 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-800">
                {t.adminPanel}
              </h2>
              <p className="text-gray-600 mt-2">
                {language === 'hi' ? 'प्रवेश करने के लिए लॉगिन करें' : 'Login to access admin panel'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'उपयोगकर्ता नाम' : 'Username'}
                </label>
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="admin123"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'hi' ? 'लॉगिन' : 'Login'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Demo credentials: admin / admin123
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t.adminPanel}</h2>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                >
                  {language === 'hi' ? 'लॉगआउट' : 'Logout'}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-gray-50 p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'schemes', icon: FileText, label: t.manageSchemes },
                    { id: 'alerts', icon: Send, label: t.sendAlerts },
                    { id: 'feedback', icon: Users, label: t.viewFeedback },
                    { id: 'settings', icon: Settings, label: language === 'hi' ? 'सेटिंग्स' : 'Settings' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {activeTab === 'schemes' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {t.manageSchemes}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          {language === 'hi' ? 'नई योजना जोड़ें' : 'Add New Scheme'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder={language === 'hi' ? 'योजना का नाम' : 'Scheme Name'}
                            className="px-3 py-2 border border-gray-300 rounded"
                          />
                          <select className="px-3 py-2 border border-gray-300 rounded">
                            <option value="">Select State</option>
                            <option value="All India">All India</option>
                            <option value="Maharashtra">Maharashtra</option>
                          </select>
                        </div>
                        <textarea
                          placeholder={language === 'hi' ? 'योजना का विवरण' : 'Scheme Description'}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded"
                          rows={3}
                        />
                        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                          <Upload size={16} className="inline mr-2" />
                          {language === 'hi' ? 'योजना जोड़ें' : 'Add Scheme'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'alerts' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {t.sendAlerts}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {language === 'hi' ? 'क्षेत्र चुनें' : 'Select Region'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded">
                            <option value="all">All Regions</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="punjab">Punjab</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {language === 'hi' ? 'अलर्ट प्रकार' : 'Alert Type'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded">
                            <option value="weather">Weather</option>
                            <option value="scheme">Scheme</option>
                            <option value="crop">Crop</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {language === 'hi' ? 'संदेश' : 'Message'}
                          </label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            rows={3}
                            placeholder={language === 'hi' ? 'अलर्ट संदेश लिखें' : 'Write alert message'}
                          />
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                          <Send size={16} className="inline mr-2" />
                          {language === 'hi' ? 'अलर्ट भेजें' : 'Send Alert'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'feedback' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {t.viewFeedback}
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: 'राम कुमार',
                          phone: '+91 9876543210',
                          message: 'PM-KISAN scheme के बारे में जानकारी चाहिए',
                          time: '2 hours ago'
                        },
                        {
                          name: 'Priya Sharma',
                          phone: '+91 9876543211',
                          message: 'Need help with crop insurance application',
                          time: '5 hours ago'
                        }
                      ].map((feedback, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{feedback.name}</h4>
                              <p className="text-sm text-gray-600">{feedback.phone}</p>
                            </div>
                            <span className="text-xs text-gray-500">{feedback.time}</span>
                          </div>
                          <p className="text-gray-700">{feedback.message}</p>
                          <div className="mt-2 space-x-2">
                            <button className="text-blue-600 text-sm hover:underline">
                              {language === 'hi' ? 'उत्तर दें' : 'Reply'}
                            </button>
                            <button className="text-green-600 text-sm hover:underline">
                              {language === 'hi' ? 'कॉल करें' : 'Call'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'hi' ? 'सेटिंग्स' : 'Settings'}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          {language === 'hi' ? 'सिस्टम सेटिंग्स' : 'System Settings'}
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span>{language === 'hi' ? 'SMS अलर्ट सक्षम करें' : 'Enable SMS Alerts'}</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span>{language === 'hi' ? 'आवाज़ सुविधा सक्षम करें' : 'Enable Voice Features'}</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>{language === 'hi' ? 'डेटा एनालिटिक्स' : 'Data Analytics'}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};