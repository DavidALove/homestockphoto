# Backend Structure Document

This document outlines the backend setup for the online image marketplace. It covers architecture, databases, APIs, hosting, infrastructure, security, monitoring, and maintenance. The aim is to give a clear picture of how everything works together.

## 1. Backend Architecture

Overall, we rely on a serverless, BaaS (Backend-as-a-Service) approach centered on Supabase, with small custom serverless functions for payment and admin logic.

- Design Pattern: Client–Server with a clear separation between frontend (Next.js) and backend (Supabase + serverless functions). We also follow MVC principles in our serverless code: Models handle data, Controllers process requests, and Views are the JSON responses.
- Frameworks and Platforms:
  - Supabase: PostgreSQL database, Auth, Storage
  - Next.js API Routes (serverless functions) on Vercel
  - Stripe SDK and webhooks for payment logic
- Scalability:
  - Supabase and Vercel automatically scale to meet demand
  - CDN caching (via Vercel/Cloudflare) reduces load on origin
- Maintainability:
  - BaaS reduces custom server code
  - Database schema changes managed via migrations
  - Clear separation of concerns (auth, storage, business logic)
- Performance:
  - Edge caching for static assets
  - Row-Level Security and policies in Supabase ensure quick, secure queries
  - Efficient indexing on key tables (assets, users, subscriptions)

## 2. Database Management

We use Supabase’s managed PostgreSQL database.

- Types and Systems:
  - SQL database: PostgreSQL
  - Managed by Supabase, with built-in backups and monitoring
- Data Structure and Access:
  - Relational tables for users, assets, categories, pricing, subscriptions, invoices
  - Supabase Auth handles user records and JWT tokens
  - Supabase Storage holds files (images/videos) and generates secure URLs
- Data Management Practices:
  - Row-Level Security (RLS) to enforce access rules (e.g., only content managers can update asset metadata)
  - Daily automated backups and point-in-time recovery
  - Indexing on frequently filtered columns (tags, categories, price tiers)

## 3. Database Schema

### Human-Readable Overview

- Users: store user profiles, roles (agent, super-admin, content-manager)
- Assets: store metadata (title, description, tags, category IDs, price tiers, subscription limits)
- Categories & Subcategories: hierarchical lookup tables
- PricingOverrides: custom pricing per asset when needed
- Subscriptions & Plans: plan definitions, download limits, billing cycles
- Invoices: records of transactions, amounts, tax, Stripe invoice IDs

### SQL Schema (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('agent','super-admin','content-manager')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INT REFERENCES categories(id)
);

-- Assets
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  category_id INT REFERENCES categories(id),
  subcategory_id INT REFERENCES categories(id),
  alt_text TEXT,
  copyright_info TEXT,
  default_price_cents INT NOT NULL,
  subscription_limit INT NOT NULL,
  storage_path TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pricing Overrides
CREATE TABLE pricing_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  price_cents INT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Subscription Plans
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  stripe_product_id TEXT NOT NULL,
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('month','year')),
  image_download_limit INT NOT NULL,
  video_download_limit INT NOT NULL
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id),
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_invoice_id TEXT NOT NULL,
  amount_cents INT NOT NULL,
  tax_cents INT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 4. API Design and Endpoints

We expose a set of RESTful JSON endpoints via Next.js API Routes. Supabase client is used where possible; custom routes handle Stripe and advanced logic.

Key Endpoints:

- Authentication (handled by Supabase Auth)
  - POST /api/auth/signup  → Sign up new user
  - POST /api/auth/login   → Log in existing user
  - POST /api/auth/reset   → Password reset email

- Assets
  - GET  /api/assets              → List assets with filters (tags, category, price)
  - GET  /api/assets/:id          → Get asset details
  - GET  /api/assets/:id/preview  → Get secure preview URL

- Category & Filters
  - GET /api/categories           → List categories and subcategories

- Pricing
  - GET  /api/pricing             → Get global price tiers
  - POST /api/pricing/override    → (Admin) Set price override for an asset

- Subscriptions & Billing
  - GET  /api/subscriptions       → User’s subscription info
  - POST /api/subscriptions       → Create or update subscription (calls Stripe)
  - GET  /api/invoices            → List user invoices
  - POST /api/webhooks/stripe     → Stripe webhook handler for invoice.payment_succeeded, subscription updates

- Admin Portal
  - GET  /api/admin/users         → (Super-admin) List all users
  - GET  /api/admin/assets        → (Content-manager+) Asset management
  - POST /api/admin/assets        → Upload new asset metadata
  - PATCH /api/admin/assets/:id   → Update asset metadata or filters

Authentication and authorization checks are done via middleware that verifies the user’s JWT token from Supabase Auth and enforces roles.

## 5. Hosting Solutions

- Supabase (hosted PostgreSQL, Auth, Storage)
  - Pros: Fully managed, built-in RLS, snapshots, scaling
- Vercel for Next.js API Routes and frontend
  - Pros: Serverless functions that auto-scale, edge caching, custom domains
- Stripe for payments
  - Pros: PCI-compliant, hosted checkout & invoices, easy tax calculation

This setup minimizes ops overhead, ensures high availability, and lets us pay only for what we use.

## 6. Infrastructure Components

- Load Balancer & Edge Network:
  - Vercel’s edge network distributes API and frontend globally
- Content Delivery Network (CDN):
  - Automatic with Vercel for static assets
  - Supabase Storage leverages CDN for file distribution
- Caching:
  - HTTP-level caching via CDN headers
  - In-memory caching in serverless functions (short-lived) for hot lookups
- Queueing & Background Jobs (future):
  - Could add Supabase Edge Functions or a serverless queue for batch tasks (e.g., video transcoding)

These components work together to reduce latency, balance load, and improve user experience.

## 7. Security Measures

- Authentication & Authorization:
  - Supabase Auth issues JWT tokens for all requests
  - Row-Level Security in Postgres ensures users can only access their own data
  - Role-based access controls: agent, content-manager, super-admin
- Data Encryption:
  - TLS encryption in transit for all web and database connections
  - At-rest encryption managed by Supabase for database and storage
- Payment Security:
  - Stripe Checkout and Customer Portal handle card data offsite
  - Webhook signature verification to prevent spoofing
- Environment Variables & Secrets:
  - Stored securely in Vercel and Supabase dashboards
  - No secrets checked into source control
- Compliance:
  - Stripe’s PCI DSS compliance covers payment flows
  - Supabase GDPR-friendly data handling

## 8. Monitoring and Maintenance

- Monitoring:
  - Supabase dashboard for DB performance, errors, and logs
  - Vercel Analytics for API latency, error rates, and usage
  - Stripe Dashboard for payment events and disputes
- Alerts:
  - Email/Slack alerts for critical errors or downtime via Vercel/Supabase integrations
- Maintenance:
  - Database migrations managed via SQL migration tool (e.g., Flyway or Supabase Migrations)
  - Regular dependency updates via CI pipeline
  - Automated backups and daily health checks
  - Scheduled audits for RLS policies and role assignments

## 9. Conclusion and Overall Backend Summary

Our backend uses Supabase as a turnkey solution for authentication, data, and file storage, augmented by small serverless functions on Vercel to handle Stripe payments and admin workflows. This approach delivers:

- Scalability: Automatic scaling of database, storage, and functions
- Maintainability: Minimal custom server code, clear separation of responsibilities
- Performance: CDN and edge caching for fast content delivery
- Security: Robust authentication, encryption, and compliance measures

By leveraging managed services and serverless infrastructure, we can focus on delivering features—search, filtering, payment, and dashboards—while keeping operational complexity low. This setup aligns perfectly with the project’s goals of a reliable, secure, and easy-to-manage online marketplace for real estate agents.
