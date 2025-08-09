import React, { useState, useMemo } from 'react';
import { Search, Volume2, Mic, Filter } from 'lucide-react';
import { Language, Scheme } from '../types';
import { translations } from '../data/translations';
import { schemes } from '../data/schemes';
import { useVoice } from '../hooks/useVoice';

interface SchemeDiscoveryProps {
  language: Language;
}

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({ language }) => {
  const t = translations[language];
  const { speak, startListening, isListening } = useVoice(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const matchesSearch = language === 'hi' 
        ? scheme.nameHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.descriptionHi.toLowerCase().includes(searchTerm.toLowerCase())
        : scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = !stateFilter || scheme.state === stateFilter || scheme.state === 'All India';
      const matchesCrop = !cropFilter || scheme.crops.includes(cropFilter) || scheme.crops.includes('All Crops');
      const matchesType = !typeFilter || scheme.type === typeFilter;

      return matchesSearch && matchesState && matchesCrop && matchesType;
    });
  }, [searchTerm, stateFilter, cropFilter, typeFilter, language]);

  const handleVoiceSearch = () => {
    startListening((text) => {
      setSearchTerm(text);
    });
  };

  const playSchemeAudio = (scheme: Scheme) => {
    const text = language === 'hi' 
      ? `${scheme.nameHi}. ${scheme.descriptionHi}. लाभ: ${scheme.benefitsHi}`
      : `${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}`;
    speak(text);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {language === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
        </h2>

        {/* Search and Filters */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.searchSchemes}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleVoiceSearch}
                disabled={isListening}
                className={`absolute right-3 top-2 p-1 rounded ${
                  isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <Mic size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t.filterByState}</option>
              <option value="All India">All India</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>

            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t.filterByCrop}</option>
              <option value="All Crops">All Crops</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Cotton">Cotton</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t.filterByType}</option>
              <option value="subsidy">Subsidy</option>
              <option value="insurance">Insurance</option>
              <option value="loan">Loan</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {language === 'hi' ? scheme.nameHi : scheme.name}
                  </h3>
                  <button
                    onClick={() => playSchemeAudio(scheme)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    title={t.playAudio}
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {language === 'hi' ? scheme.descriptionHi : scheme.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">State:</span>
                    <span className="text-gray-600">{scheme.state}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-700 w-20">Type:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {scheme.type}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">Benefits:</p>
                  <p className="text-sm text-green-700">
                    {language === 'hi' ? scheme.benefitsHi : scheme.benefits}
                  </p>
                </div>

                {scheme.deadline && (
                  <div className="mt-3 text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                    Deadline: {scheme.deadline}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'en' ? 'No schemes found matching your criteria' : 'आपके मानदंडों से मेल खाने वाली कोई योजना नहीं मिली'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};