export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  state: string;
  crops: string[];
  type: 'subsidy' | 'insurance' | 'loan' | 'other';
  eligibility: string[];
  benefits: string;
  benefitsHi: string;
  deadline?: string;
}

export interface User {
  state: string;
  crop: string;
  landholding: number;
  income: number;
  category: 'SC' | 'ST' | 'OBC' | 'General';
  farmerType: 'Small' | 'Marginal' | 'Medium' | 'Large';
  phone?: string;
  language: 'en' | 'hi';
}

export interface NewsArticle {
  id: string;
  headline: string;
  headlineHi: string;
  summary: string;
  summaryHi: string;
  source: string;
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: 'weather' | 'scheme' | 'crop';
  message: string;
  messageHi: string;
  region: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export type Language = 'en' | 'hi';