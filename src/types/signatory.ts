export interface Signatory {
  id: string;
  name?: string;
  email?: string;
  organization?: string;
  title?: string;
  message?: string;
  timestamp: string;
  verified: boolean;
  public: boolean;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface SignatoryFormData {
  name?: string;
  email?: string;
  organization?: string;
  title?: string;
  message?: string;
  public: boolean;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface SignatoryStats {
  total: number;
  verified: number;
  organizations: number;
  individuals: number;
  recentSignatures: number; // last 24 hours
}

export interface PledgeSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 