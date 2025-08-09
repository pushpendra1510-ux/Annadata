import React, { useState, useEffect } from 'react';
import { MapPin, Bell, Phone, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AlertsAndLocationProps {
  language: Language;
}

export const AlertsAndLocation: React.FC<AlertsAndLocationProps> = ({ language }) => {
  const t = translations[language];
  const [location, setLocation] = useState<{city: string, state: string} | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState([
    {
      type: 'weather',
      message: language === 'hi' ? 'अगले 3 दिनों में भारी बारिश की संभावना' : 'Heavy rainfall expected in next 3 days',
      severity: 'high' as const,
      time: '2 hours ago'
    },
    {
      type: 'scheme',
      message: language === 'hi' ? 'पीएम-किसान योजना का अंतिम दिन कल' : 'PM-KISAN scheme last date tomorrow',
      severity: 'medium' as const,
      time: '5 hours ago'
    }
  ]);

  useEffect(() => {
    // Simulate location detection
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real app, reverse geocode the coordinates
          setLocation({ city: 'Pune', state: 'Maharashtra' });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleEnableAlerts = () => {
    if (phoneNumber && phoneNumber.length === 10) {
      setAlertsEnabled(true);
      // In real app, send SMS verification
      alert(language === 'hi' 
        ? 'SMS अलर्ट सक्षम कर दिए गए हैं'
        : 'SMS alerts have been enabled'
      );
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-400 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-400 text-green-800';
      default: return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  return (
    <section className="py-8 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {language === 'en' ? 'Location & Alerts' : 'स्थान और अलर्ट'}
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <MapPin className="text-blue-500 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-800">
                  {language === 'en' ? 'Your Location' : 'आपका स्थान'}
                </h3>
              </div>

              {location ? (
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">City:</span> {location.city}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">State:</span> {location.state}
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg mt-4">
                    <p className="text-blue-800 text-sm">
                      {language === 'hi' 
                        ? 'आपके क्षेत्र के लिए विशिष्ट योजनाएं दिखाई जा रही हैं'
                        : 'Showing schemes specific to your region'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  {language === 'hi' 
                    ? 'स्थान का पता लगाया जा रहा है...'
                    : 'Detecting location...'
                  }
                </p>
              )}
            </div>

            {/* SMS Alerts Setup */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Bell className="text-yellow-500 mr-2" size={24} />
                <h3 className="text-lg font-semibold text-gray-800">
                  {t.enableAlerts}
                </h3>
              </div>

              {!alertsEnabled ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phoneNumber}
                    </label>
                    <div className="flex">
                      <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md text-gray-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500"
                        placeholder="9876543210"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleEnableAlerts}
                    disabled={phoneNumber.length !== 10}
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {t.enableAlerts}
                  </button>

                  <p className="text-xs text-gray-500">
                    {language === 'hi'
                      ? 'आपको मौसम, योजना और फसल संबंधी अलर्ट मिलेंगे'
                      : 'You will receive weather, scheme, and crop-related alerts'
                    }
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <Phone className="text-green-600 mx-auto mb-2" size={32} />
                    <p className="text-green-800 font-medium">
                      {language === 'hi' 
                        ? 'अलर्ट सक्षम हैं!'
                        : 'Alerts Enabled!'
                      }
                    </p>
                    <p className="text-green-600 text-sm">
                      +91 {phoneNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-orange-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'en' ? 'Recent Alerts' : 'हाल की अलर्ट'}
              </h3>
            </div>

            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};