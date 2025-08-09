import React, { useState } from 'react';
import { Phone, Mail, Send, Mic, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { useVoice } from '../hooks/useVoice';

interface ContactFormProps {
  language: Language;
}

export const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const t = translations[language];
  const { speak, startListening, isListening } = useVoice(language);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVoiceInput = (field: 'name' | 'message') => {
    startListening((text) => {
      setFormData(prev => ({ ...prev, [field]: text }));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send to backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    const message = language === 'hi' 
      ? 'आपका संदेश भेज दिया गया है। हम जल्दी ही संपर्क करेंगे।'
      : 'Your message has been sent. We will contact you soon.';
    speak(message);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-8 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Send className="text-green-600" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'hi' ? 'संदेश भेजा गया!' : 'Message Sent!'}
            </h2>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'हम 24 घंटे में आपसे संपर्क करेंगे।'
                : 'We will contact you within 24 hours.'
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t.contactForm}
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Phone className="text-blue-600 mx-auto mb-2" size={32} />
                <h3 className="font-semibold text-gray-800 mb-1">
                  {language === 'hi' ? 'हेल्पलाइन' : 'Helpline'}
                </h3>
                <p className="text-blue-600 font-medium">1800-123-4567</p>
                <button className="mt-2 text-blue-600 text-sm hover:underline">
                  {language === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
                </button>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Mail className="text-green-600 mx-auto mb-2" size={32} />
                <h3 className="font-semibold text-gray-800 mb-1">
                  {language === 'hi' ? 'ईमेल' : 'Email'}
                </h3>
                <p className="text-green-600 font-medium">help@rait.gov.in</p>
                <button className="mt-2 text-green-600 text-sm hover:underline">
                  {language === 'hi' ? 'ईमेल भेजें' : 'Send Email'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yourName}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'hi' ? 'अपना नाम लिखें' : 'Enter your name'}
                  />
                  <button
                    type="button"
                    onClick={() => handleVoiceInput('name')}
                    className={`absolute right-2 top-2 p-1 rounded ${
                      isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <Mic size={16} />
                  </button>
                </div>
              </div>

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
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500"
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yourMessage}
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'hi' 
                      ? 'अपना संदेश लिखें या आवाज़ का उपयोग करें'
                      : 'Write your message or use voice input'
                    }
                  />
                  <div className="absolute right-2 top-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => handleVoiceInput('message')}
                      className={`block p-1 rounded ${
                        isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      <Mic size={16} />
                    </button>
                    {formData.message && (
                      <button
                        type="button"
                        onClick={() => speak(formData.message)}
                        className="block p-1 rounded bg-green-500 text-white hover:bg-green-600"
                      >
                        <Volume2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{t.submitQuery}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};