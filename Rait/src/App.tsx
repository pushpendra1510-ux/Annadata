import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SchemeDiscovery } from './components/SchemeDiscovery';
import { EligibilityChecker } from './components/EligibilityChecker';
import { AlertsAndLocation } from './components/AlertsAndLocation';
import { ContactForm } from './components/ContactForm';
import { AdminPanel } from './components/AdminPanel';
import AuthForm from './components/AuthForm';
import { useLanguage } from './hooks/useLanguage';
import './App.css';

function App() {
  const { language, toggleLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'schemes':
        return <SchemeDiscovery language={language} />;
      case 'eligibility':
        return <EligibilityChecker language={language} />;
      case 'contact':
        return <ContactForm language={language} />;
      case 'admin':
        return <AdminPanel language={language} />;
      case 'alerts':
        return <AlertsAndLocation language={language} />;
      default:
        return (
          <>
            <HeroSection language={language} onSectionChange={setActiveSection} />
            <SchemeDiscovery language={language} />
            <EligibilityChecker language={language} />
            <AlertsAndLocation language={language} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      
      {activeSection !== 'home' && (
        <div className="bg-white border-b p-4">
          <div className="container mx-auto">
            <button
              onClick={() => setActiveSection('home')}
              className="text-blue-600 hover:underline flex items-center space-x-2"
            >
              <span>←</span>
              <span>{language === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}</span>
            </button>
          </div>
        </div>
      )}

      <AuthForm />

      <main>
        {renderSection()}
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'hi' ? 'महत्वपूर्ण लिंक' : 'Important Links'}
              </h3>
              <ul className="space-y-1 text-sm">
                <li><button onClick={() => setActiveSection('schemes')} className="hover:underline">
                  {language === 'hi' ? 'योजनाएं' : 'Schemes'}
                </button></li>
                <li><button onClick={() => setActiveSection('eligibility')} className="hover:underline">
                  {language === 'hi' ? 'पात्रता जांच' : 'Eligibility Check'}
                </button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:underline">
                  {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                </button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'hi' ? 'सहायता' : 'Support'}
              </h3>
              <ul className="space-y-1 text-sm">
                <li>📞 1800-123-4567</li>
                <li>📧 help@rait.gov.in</li>
                <li>⏰ 24/7 {language === 'hi' ? 'उपलब्ध' : 'Available'}</li>
              </ul>
            </div>
            <div>
              <button
                onClick={() => setActiveSection('admin')}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {language === 'hi' ? 'प्रशासक पैनल' : 'Admin Panel'}
              </button>
            </div>
          </div>
          <div className="border-t border-green-700 pt-4">
            <p className="text-sm">
              © 2025 Rait - {language === 'hi' ? 'भारत सरकार की एक पहल' : 'A Government of India Initiative'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;