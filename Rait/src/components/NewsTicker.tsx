import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface NewsTickerProps {
  language: Language;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ language }) => {
  const [news, setNews] = useState([
    {
      en: "Monsoon forecast shows 95% normal rainfall expected this season",
      hi: "मानसून पूर्वानुमान इस मौसम में 95% सामान्य वर्षा की संभावना दिखाता है"
    },
    {
      en: "New crop insurance scheme launched with enhanced coverage",
      hi: "बेहतर कवरेज के साथ नई फसल बीमा योजना शुरू की गई"
    },
    {
      en: "Government announces ₹50,000 crore agriculture infrastructure fund",
      hi: "सरकार ने ₹50,000 करोड़ कृषि अवसंरचना फंड की घोषणा की"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-4">
      <div className="flex items-center">
        <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-semibold mr-3">
          {language === 'en' ? 'NEWS' : 'समाचार'}
        </span>
        <div className="overflow-hidden flex-1">
          <p className="text-sm text-gray-700 animate-pulse">
            {news[currentIndex][language]}
          </p>
        </div>
      </div>
    </div>
  );
};