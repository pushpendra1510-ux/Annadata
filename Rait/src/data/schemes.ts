import { Scheme } from '../types';

export const schemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Scheme',
    nameHi: 'पीएम-किसान योजना',
    description: 'Direct income support to farmer families',
    descriptionHi: 'किसान परिवारों को प्रत्यक्ष आय सहायता',
    state: 'All India',
    crops: ['All Crops'],
    type: 'subsidy',
    eligibility: ['Small and marginal farmers', 'Landholding up to 2 hectares'],
    benefits: '₹6,000 per year in three installments',
    benefitsHi: 'तीन किस्तों में प्रति वर्ष ₹6,000',
    deadline: '2024-03-31'
  },
  {
    id: '2',
    name: 'Crop Insurance Scheme',
    nameHi: 'फसल बीमा योजना',
    description: 'Insurance coverage for crop losses',
    descriptionHi: 'फसल नुकसान के लिए बीमा कवरेज',
    state: 'All India',
    crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane'],
    type: 'insurance',
    eligibility: ['All farmers', 'Sharecroppers with valid documents'],
    benefits: 'Up to 90% premium subsidy',
    benefitsHi: '90% तक प्रीमियम सब्सिडी'
  },
  {
    id: '3',
    name: 'Soil Health Card Scheme',
    nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
    description: 'Free soil testing and nutrient recommendations',
    descriptionHi: 'मुफ्त मिट्टी परीक्षण और पोषक तत्व सुझाव',
    state: 'All India',
    crops: ['All Crops'],
    type: 'other',
    eligibility: ['All farmers'],
    benefits: 'Free soil testing every 2 years',
    benefitsHi: 'हर 2 साल में मुफ्त मिट्टी परीक्षण'
  }
];