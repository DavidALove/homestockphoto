## Proposed Implementation Plan

Below is a high-level architecture and roadmap for building your real-estate image marketplace. It incorporates the tech stack you’ve chosen, aligns with your functional requirements, and embeds the security principles outlined.

---

### 1. Architecture Overview

• **Frontend (Next.js + Shadcn UI + Tailwind CSS + TypeScript)**  
  – SSR/SSG pages for SEO and performance (e.g., homepage, search results)  
  – Client-side interactions for filtering, checkout flows  
  – React-Stripe.js for payment UI

• **Backend & Data Layer**  
  – **Supabase (PostgreSQL + Auth + Storage + RLS)**
    • Users, Roles, ImageMetadata, Transactions, Subscriptions tables  
    • Storage buckets for watermarked previews & originals  
    • RLS policies enforcing per-role access  
  – **Next.js API Routes (Serverless Functions)**
    • Webhooks (Stripe events)  
    • Custom endpoints (e.g., generate signed URLs, dynamic filters)  

• **Payments & Billing (Stripe)**  
  – One-time Checkout Sessions for individual assets  
  – Subscription Products & Plans with download limits  
  – Webhook listener to sync invoices/subscriptions back to Supabase

• **CI/CD & Hosting**  
  – GitHub Actions → Vercel (frontend + API routes)  
  – Supabase for database, auth, storage  

---

### 2. Database Schema (Supabase/PostgreSQL)

1. **users**  
   • id (uuid, PK)  
   • email (unique)  
   • role_id → roles.id  
   • stripe_customer_id

2. **roles**  
   • id (smallint, PK)  
   • name (enum: super_admin, content_manager, customer)

3. **images**  
   • id (uuid, PK)  
   • title, description, alt_text  
   • categories (array), subcategories (array)  
   • tags (text[])  
   • formats ({watermarked_url, original_url, preview_video_url})  
   • metadata (orientation, resolution, color_palette)  
   • created_by (uuid → users.id)

4. **pricing_tiers**  
   • id (uuid, PK)  
   • image_id → images.id  
   • type (one_time | subscription)  
   • stripe_price_id  
   • override_price

5. **transactions**  
   • id (uuid, PK)  
   • user_id → users.id  
   • image_id → images.id  
   • price_id → pricing_tiers.id  
   • stripe_payment_intent_id  
   • status, created_at

6. **subscriptions**  
   • id (uuid, PK)  
   • user_id → users.id  
   • stripe_subscription_id  
   • plan_id → pricing_tiers.id  
   • status, current_period_end

7. **invoices**  
   • id (uuid, PK)  
   • user_id → users.id  
   • stripe_invoice_id  
   • amount, status, pdf_url, created_at

---

### 3. Supabase Row-Level Security (RLS)

• **Content Manager**  
  – SELECT/INSERT/UPDATE on `images` they own or all if granted  
  – Deny SELECT on `transactions`, `invoices`, `subscriptions`

• **Super Admin**  
  – Full access to all tables

• **Customer**  
  – SELECT on `images` (public metadata + watermarked URLs)  
  – SELECT on own `transactions`, `invoices`, `subscriptions`  
  – No INSERT/UPDATE on `images`

Implement using policies that reference `auth.role()` and cross-check `user_id` columns.

---

### 4. Next.js Folder & API Structure

/pages  
├─ index.tsx            # Homepage & global search  
├─ images/               # SSR image listing & dynamic filters  
│   └─ [id].tsx          # Image details & purchase options  
├─ dashboard/           # Protected customer dashboard  
│   ├─ downloads.tsx    # Download history  
│   ├─ invoices.tsx     # Invoice list  
│   └─ subscription.tsx # Subscription management  
├─ admin/               # Protected admin panels  
│   ├─ content/         # Content manager UI  
│   └─ super/           # Super-admin UI  
└─ api/                 # Serverless endpoints  
    ├─ stripe-webhook.ts  # Handle Stripe events  
    ├─ get-signed-url.ts  # Generate Supabase Storage URLs with policies  
    └─ filters.ts         # Fetch admin-configured filter options

---

### 5. Authentication & Authorization

• **Supabase Auth**  
  – Email/password + optional OTP (MFA)  
  – Secure session cookies (HttpOnly, Secure, SameSite=Strict)  
  – Enforce password policy (min length, complexity via Supabase settings)

• **Client-side**  
  – Protect routes using HOC or middleware (Next.js middleware)  
  – Validate JWT on each request  

• **Server-side**  
  
  – Verify Supabase JWT in API Routes  
  – Enforce RBAC before performing any data operations

---

### 6. Payment Integration & Webhooks

• **Stripe Checkout**  
  – Create Session with `price` (from your `pricing_tiers.stripe_price_id`)  
  – Pass metadata (user_id, image_id, tier_id)

• **Webhook Handler**  
  – On `checkout.session.completed` → create `transactions` record  
  – On `invoice.paid` or `customer.subscription.*` → upsert `subscriptions` & `invoices` tables

• **Security**  
  – Validate webhook signature (using Stripe signing secret)  
  – Fail securely if signature invalid

---

### 7. Search & Filtering

• **Admin-Configurable Facets**  
  – Store filter definitions in a JSON table  
  – Expose via `GET /api/filters`

• **Client-side**  
  – Debounced queries to Next.js API with filters, pagination, sort  
  – Use index hints or built-in Postgres GIN indexes on tags, metadata

---

### 8. Security & Compliance Checklist

• Enforce HTTPS/TLS for all endpoints (Vercel + Supabase automatically.)  
• Sanitize and validate all user inputs server-side (API Routes + Supabase functions).  
• CSP, HSTS, X-Frame-Options, X-Content-Type-Options headers via Next.js custom server or Vercel config.  
• CSRF Protection: use Anti-Forgery tokens on any form POSTs.  
• SRI for any third-party scripts.  
• Least Privilege for database roles & Supabase Service Key should live in CI secrets only.  
• Logging & Monitoring: integrate Sentry or Logflare for runtime errors (no PII in logs).  

---

### Next Steps

1. **API & Schema Setup:** Create Supabase tables/RLS policies and initial Next.js API routes.  
2. **Auth Flows:** Implement Supabase Auth in Next.js with secure cookies.  
3. **Payment Flows:** Wire up Stripe Checkout & Webhook handlers.  
4. **UI Components:** Build Shadcn UI components (search bar, filters, dashboards).  
5. **Testing & Hardening:** Unit/integration tests, OWASP ZAP scan, dependency vulnerability scan.  

Feel free to review and let me know if you’d like to dive deeper into any specific area.