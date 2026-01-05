# Project Requirements Document

## 1. Project Overview

This project is an online image marketplace built with modern React/Next.js, Shadcn UI, Supabase, and Stripe. It will let real estate agents (and similar professionals) browse, purchase, and subscribe to high-quality image and short-form video assets (PNG, JPG, MP4). All assets are created and managed by the platform team; there is no user-generated content in this phase. Buyers can make one-time purchases in configurable pricing tiers or sign up for subscription plans with download limits.

From the user’s perspective, they land on a clean, neon-blue-and-orange-themed website, search or filter the asset catalog, view watermarked previews, and complete purchases via Stripe. After payment, they access full-resolution downloads and invoices in a secure dashboard. On the admin side, super-admins and content managers maintain the asset library, metadata, search facets, pricing, and subscription tiers—while super-admins also view financial reports.

**Why we’re building it & success criteria**

*   Enable real estate professionals to quickly find and license high-quality media without relying on a multi-vendor platform.
*   Achieve a smooth user experience from search to download, with <500 ms page load times and <200 ms filter response.
*   Securely process payments and manage subscriptions via Stripe, targeting 99.9% uptime.
*   Provide an intuitive admin interface that enforces complete metadata and pricing flexibility.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (Version 1)

*   Public landing/search pages with watermarked asset previews (PNG, JPG, MP4)

*   User authentication (sign-up, email verification, password reset) via Supabase

*   One-time purchase model with tiered/global and per-item pricing

*   Subscription model with configurable tiers, download limits, auto-renew via Stripe

*   Sales tax calculation at checkout and automated invoice generation

*   User dashboard: Downloads, Invoices (PDF export), Subscriptions (view/change via Stripe Customer Portal)

*   Admin portal with two roles:

    *   **Super-admin:** Manage users, assets, metadata, pricing, subscriptions, view financial analytics
    *   **Content manager:** Upload assets, edit metadata, configure search facets (no financial data)

*   Search & filtering by keywords, categories, subcategories, color, orientation, resolution

*   Theming and design system using Shadcn UI and Tailwind CSS (neon blue & orange)

### Out-of-Scope (Phase 1)

*   User-generated asset uploads or marketplace submissions
*   AI-driven image recommendations or auto-tagging
*   Mobile apps (iOS/Android) or desktop clients
*   Multi-language support or internationalization beyond Stripe’s built-in locale
*   Advanced SEO beyond basic Next.js SSR
*   Bulk asset import tools or CSV metadata import
*   Third-party analytics beyond Stripe and basic Supabase logs

## 3. User Flow

**Public User Journey**\
A visitor lands on the homepage with a hero banner and a prominent search bar. They can browse featured assets or enter keywords. On the search results page, a grid of watermarked previews updates in real time as they apply filters (color palette, orientation, resolution, category). Clicking an asset opens a detail modal showing full metadata (title, description, tags, alt text, copyright info), pricing tiers, and subscription options.

When the user decides to purchase, they click “Buy” or “Subscribe,” which opens a Stripe Checkout session. After entering payment details, Stripe returns the user to a success page. The system records the transaction in Supabase, updates their download entitlements, and emails an invoice. The user can then immediately download the full-resolution files.

**User Dashboard Journey**\
Authenticated users navigate to “Dashboard” via the top-right menu. The dashboard has three tabs:

1.  **Downloads:** Lists purchased items with direct download buttons at each resolution or format.
2.  **Invoices:** Displays past orders with PDF export links.
3.  **Subscriptions:** Shows active plans, usage quotas, renewal dates, and an “Upgrade/Cancel” button that links to the Stripe Customer Portal.

Notifications appear for upcoming renewals or quota limits. Profile settings let the user update personal info and notification preferences.

## 4. Core Features

*   **Authentication & Authorization**

    *   Sign-up, email verification, login, password reset (Supabase Auth)
    *   Protected routes for checkout and dashboard

*   **Asset Catalog & Presentation**

    *   Watermarked preview grid (PNG, JPG, MP4)
    *   Asset detail modal with metadata and related items

*   **Search & Filtering**

    *   Keyword search + multi-facet filters (color, orientation, resolution, category/subcategory)
    *   Real-time updates as filters change
    *   Admin-configurable filter facets

*   **Pricing & Purchase Models**

    *   Tiered one-time purchase with global defaults and per-item overrides
    *   Subscription plans with configurable download limits per asset type
    *   Dynamic pricing management in admin portal

*   **Payment & Billing**

    *   Stripe Checkout integration for one-time and recurring payments
    *   Automated sales tax calculation by region
    *   Invoice generation & emailing

*   **User Dashboard**

    *   Downloads tab with format/resolution selector
    *   Invoices tab with PDF export
    *   Subscriptions tab with usage, renewal, and plan management

*   **Admin Portal**

    *   **Content Manager Role:** Upload assets, edit metadata, set available formats/resolutions, configure filter facets
    *   **Super-admin Role:** All content manager privileges + view financial analytics, user management, pricing & subscription configuration

*   **Metadata Management**

    *   Mandatory fields: title, description, tags, categories, subcategories, alt text, copyright info

*   **Theming & Design System**

    *   Shared component library (Shadcn UI + Tailwind) with neon blue & orange palette
    *   Responsive design for desktop and tablet

## 5. Tech Stack & Tools

*   Frontend:

    *   Next.js (React framework)
    *   Shadcn UI + Tailwind CSS (component library & styling)
    *   TypeScript

*   Backend & Data:

    *   Supabase (PostgreSQL, Auth, Storage)
    *   Supabase Row-Level Security (RLS) policies

*   Payments:

    *   Stripe (Checkout, Customer Portal, Tax calculation, Webhooks)

*   Hosting & Deployment:

    *   Vercel for frontend
    *   Supabase Edge functions (if needed)

*   IDE & Plugins:

    *   VS Code with ESLint, Prettier, Tailwind CSS IntelliSense
    *   Optional AI coding helpers (Cursor, Windsurf)

## 6. Non-Functional Requirements

*   **Performance:**

    *   First contentful paint <1 s, interactive <2 s on 3G mobile
    *   Filter response <200 ms for indexed fields

*   **Security & Compliance:**

    *   HTTPS/TLS everywhere
    *   PCI‐compliant payment handling via Stripe
    *   RLS policies on Supabase to restrict data access by role
    *   OWASP Top Ten best practices for XSS, CSRF, injection

*   **Availability & Scalability:**

    *   99.9% uptime for user-facing pages
    *   Auto-scale Supabase and Vercel instances on traffic spikes

*   **Usability & Accessibility:**

    *   WCAG 2.1 AA compliance for color contrast and keyboard navigation
    *   Responsive layouts across desktop/tablet

*   **Monitoring & Logging:**

    *   Real-time logs for auth, payments, and errors via Supabase and Vercel integrations

## 7. Constraints & Assumptions

*   **No user uploads** in V1; all assets are pre-created and uploaded by admins.
*   **Supabase region** will match target audience location for latency.
*   **Stripe supports** customer’s region for tax calculation and currencies.
*   **Admins** have reliable internet access and modern browsers (Chrome, Firefox, Safari).
*   **Search & filter facets** will be pre-defined; dynamic facet addition requires admin UI updates.

## 8. Known Issues & Potential Pitfalls

*   **Large Catalog Performance:**

    *   Filtering thousands of assets may slow queries.
    *   Mitigation: Add database indexes on filter fields, implement server-side pagination or cursor-based queries.

*   **Stripe Webhook Reliability:**

    *   Missed or delayed webhook events can orphan subscriptions.
    *   Mitigation: Implement webhook retry logic and a manual reconciliation dashboard for admins.

*   **Metadata Completeness:**

    *   Missing tags or categories reduce search quality.
    *   Mitigation: Enforce required fields in the admin upload form with client- and server-side validation.

*   **Tax Calculation Edge Cases:**

    *   Complex regional tax rules may not be covered by Stripe.
    *   Mitigation: Provide admin override for tax rates or manual invoice adjustments.

*   **Role Misconfiguration:**

    *   Over-permissive RLS policies could expose financial data to content managers.
    *   Mitigation: Write explicit RLS policies per table and test with role-based test accounts.

This PRD serves as the single source of truth for all subsequent technical documents—ensuring every requirement is clear, unambiguous, and ready for architecture, frontend, backend, and security guideline design.
