// User types
export type UserRole = 'agent' | 'super-admin' | 'content-manager';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  stripe_customer_id?: string;
}

// Asset types
export interface Asset {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category_id: number;
  subcategory_id?: number;
  alt_text: string;
  copyright_info: string;
  default_price_cents: number;
  subscription_limit: number;
  storage_path: string;
  created_by: string;
  created_at: string;
  // Metadata
  orientation?: 'landscape' | 'portrait' | 'square';
  resolution?: string;
  color_palette?: string[];
  // URLs (populated from storage)
  preview_url?: string;
  watermarked_url?: string;
}

export interface Category {
  id: number;
  name: string;
  parent_id?: number;
}

// Pricing types
export interface PricingTier {
  id: string;
  name: string;
  price_cents: number;
  stripe_price_id?: string;
}

export interface PricingOverride {
  id: string;
  asset_id: string;
  price_cents: number;
  updated_at: string;
}

// Subscription types
export interface SubscriptionPlan {
  id: string;
  name: string;
  stripe_product_id: string;
  billing_interval: 'month' | 'year';
  image_download_limit: number;
  video_download_limit: number;
  price_cents: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  stripe_subscription_id: string;
  status: string;
  current_period_end: string;
  created_at: string;
}

// Invoice types
export interface Invoice {
  id: string;
  user_id: string;
  stripe_invoice_id: string;
  amount_cents: number;
  tax_cents?: number;
  pdf_url?: string;
  created_at: string;
}

// Transaction types
export interface Transaction {
  id: string;
  user_id: string;
  asset_id: string;
  price_cents: number;
  status: 'pending' | 'completed' | 'failed';
  stripe_payment_intent_id?: string;
  created_at: string;
}

// Search & Filter types
export interface SearchFilters {
  query?: string;
  category_id?: number;
  subcategory_id?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
  resolution?: string;
  color?: string;
  tags?: string[];
}

