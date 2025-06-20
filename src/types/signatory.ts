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
  
  /** Email verified via /api/verify/[token] */
  verified?: boolean;
}

export interface SignatoryStats {
  total: number;
  verified: number;
  organizations: number;
  individuals: number;
  recentSignatures: number; // last 24 hours
  countries: number;
}

