export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
}

export interface ServicePackage {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

// LMS Types
export type ModuleType = 'video' | 'quiz' | 'resource';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface CourseModule {
  id: number;
  title: string;
  type: ModuleType;
  duration: string;
  description?: string;
  videoUrl?: string; 
  content?: string;
  questions?: QuizQuestion[]; // For quiz type
  resources?: { name: string; url: string; size: string }[]; // For resource type
}

export interface User {
  name: string;
  email: string;
  completedModules: number[];
}