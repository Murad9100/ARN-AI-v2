export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'max';
  isVerified: boolean;
  createdAt: Date;
  tokensUsed: number;
  tokensLimit: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface Plan {
  id: 'free' | 'pro' | 'max';
  name: string;
  price: number;
  tokens: number;
  features: PlanFeature[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    tokens: 1000,
    features: [
      { name: 'Gündəlik 1000 token', included: true },
      { name: 'Əsas AI modeli', included: true },
      { name: 'Pentest əsasları', included: true },
      { name: 'Kod analizi', included: false },
      { name: 'Vulnerability scanner', included: false },
      { name: 'API access', included: false },
      { name: 'Priority dəstək', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    tokens: 50000,
    popular: true,
    features: [
      { name: 'Aylıq 50,000 token', included: true },
      { name: 'Bütün AI modelləri', included: true },
      { name: 'Advanced Pentest', included: true },
      { name: 'Kod analizi', included: true },
      { name: 'Vulnerability scanner', included: true },
      { name: 'API access', included: false },
      { name: 'Priority dəstək', included: false },
    ]
  },
  {
    id: 'max',
    name: 'Max',
    price: 99,
    tokens: 500000,
    features: [
      { name: 'Limitsiz token', included: true },
      { name: 'Bütün AI modelləri + Beta', included: true },
      { name: 'Enterprise Pentest', included: true },
      { name: 'Advanced Kod analizi', included: true },
      { name: 'Real-time Vulnerability', included: true },
      { name: 'Full API access', included: true },
      { name: '24/7 Priority dəstək', included: true },
    ]
  }
];
