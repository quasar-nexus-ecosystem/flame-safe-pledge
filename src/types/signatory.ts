export interface Signatory {
  id: string;
  user_id?: string; // Foreign key to auth.users
  name?: string;
  organization?: string;
  title?: string;
  message?: string;
  created_at: string;
  display_publicly: boolean;
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
  countries: number;
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