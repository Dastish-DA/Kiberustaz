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
export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  isLocked: boolean;
  videoUrl?: string; // Mock video URL
  content?: string;
}

export interface User {
  name: string;
  email: string;
  progress: number;
}