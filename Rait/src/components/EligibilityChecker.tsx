import React, { useState } from 'react';
import { CheckCircle, Volume2, Download } from 'lucide-react';
import { Language, User, Scheme } from '../types';
import { translations } from '../data/translations';
import { schemes } from '../data/schemes';
import { useVoice } from '../hooks/useVoice';

interface EligibilityCheckerProps {
  language: Language;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ language }) => {
  const t = translations[language];
  const { speak } = useVoice(language);
  const [formData, setFormData] = useState<Partial<User>>({
    language: language
  });
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof User, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const checkEligibility = () => {
    // Simple eligibility logic - in real app, this would be more sophisticated
    const eligible = schemes.filter(scheme => {
      if (formData.state && scheme.state !== 'All India' && scheme.state !== formData.state) {
        return false;
      }
      
      if (formData.crop && !scheme.crops.includes('All Crops') && !scheme.crops.includes(formData.crop)) {
        return false;
      }

      // Check landholding for small farmer schemes
      if (scheme.eligibility.some(e => e.includes('Small') || e.includes('marginal')) && formData.landholding && formData.landholding > 2) {
        return false;
      }

      return true;
    });

    setEligibleSchemes(eligible);
    setShowResults(true);

    // Announce results
    const message = language === 'hi' 
      ? `आपके लिए ${eligible.length} योजनाएं उपलब्ध हैं`
      : `${eligible.length} schemes are available for you`;
    speak(message);
  };

  const playSchemeAudio = (scheme: Scheme) => {
    const text = language === 'hi' 
      ? `${scheme.nameHi}. ${scheme.descriptionHi}. लाभ: ${scheme.benefitsHi}`
      : `${scheme.name}. ${scheme.description}. Benefits: ${scheme.benefits}`;
    speak(text);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t.eligibilityChecker}
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yourState}
                </label>
                <select
                  value={formData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yourCrop}
                </label>
                <select
                  value={formData.crop || ''}
                  onChange={(e) => handleInputChange('crop', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Crop</option>
                  <option value="Rice">Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.landholding}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.landholding || ''}
                  onChange={(e) => handleInputChange('landholding', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.annualIncome}
                </label>
                <input
                  type="number"
                  value={formData.income || ''}
                  onChange={(e) => handleInputChange('income', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.category}
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value as User['category'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.farmerType}
                </label>
                <select
                  value={formData.farmerType || ''}
                  onChange={(e) => handleInputChange('farmerType', e.target.value as User['farmerType'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Type</option>
                  <option value="Small">Small</option>
                  <option value="Marginal">Marginal</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>

            <button
              onClick={checkEligibility}
              className="w-full mt-6 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <CheckCircle size={20} />
              <span>{t.checkEligibility}</span>
            </button>
          </div>

          {showResults && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t.eligibleSchemes} ({eligibleSchemes.length})
              </h3>

              {eligibleSchemes.length > 0 ? (
                <div className="space-y-4">
                  {eligibleSchemes.map((scheme) => (
                    <div key={scheme.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {language === 'hi' ? scheme.nameHi : scheme.name}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playSchemeAudio(scheme)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            title={t.playAudio}
                          >
                            <Volume2 size={16} />
                          </button>
                          <button
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                            title="Download PDF"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {language === 'hi' ? scheme.descriptionHi : scheme.description}
                      </p>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-green-800 text-sm font-medium">
                          {language === 'hi' ? scheme.benefitsHi : scheme.benefits}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  {language === 'en' 
                    ? 'No schemes match your current criteria. Please check back later or contact admin for assistance.'
                    : 'आपके वर्तमान मानदंडों से कोई योजना मेल नहीं खाती। कृपया बाद में जांचें या सहायता के लिए प्रशासक से संपर्क करें।'
                  }
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};