# Tech Stack Document

This document explains in simple terms the technologies chosen for our modern image marketplace website and dashboard. Each section covers a different layer of the application, so anyone—technical or not—can understand why we picked these tools and how they work together.

## 1. Frontend Technologies

We want a fast, responsive, and attractive user interface for both public visitors and logged-in users. Here’s what we use:

- **React**
  - A popular JavaScript library for building reusable UI components.
  - Lets us break the interface into small pieces (buttons, cards, forms) that are easy to maintain and update.

- **Next.js**
  - A React framework that adds server-side rendering and static site generation.
  - Improves page load speed and search-engine visibility (SEO), so our pages appear quickly and are easy to find.
  - Provides built-in routing, so we can create new pages by simply adding files.

- **shadcn/ui**
  - A collection of pre-built components (modals, tabs, inputs) styled with Tailwind CSS.
  - Speeds up development by giving us ready-to-use building blocks that match our design.

- **Tailwind CSS**
  - A utility-first styling framework where small CSS classes (e.g., `bg-blue-500`, `px-4`) compose our design.
  - Makes it easy to tweak layouts, colors, and spacing without writing custom CSS.
  - Ensures consistency and keeps our style sheets small.

- **Supabase JavaScript Client (`@supabase/supabase-js`)**
  - Handles communication with our Supabase backend for user authentication, database queries, and file storage.

- **Stripe.js and React Stripe.js**
  - Stripe’s front-end libraries for creating secure payment forms and handling checkout flows.
  - Ensures PCI compliance by never exposing sensitive card details to our servers.

## 2. Backend Technologies

Our backend powers user accounts, stores images and metadata, manages subscriptions, and handles payments.

- **Supabase** (Backend-as-a-Service)
  - **PostgreSQL Database**
    - Stores all data: user profiles, image metadata (title, description, tags, categories, alt text, copyright), purchase records, subscription plans, and invoices.
  - **Supabase Auth**
    - Provides secure sign-up, login, password reset, email verification, and session management.
  - **Supabase Storage**
    - Hosts all image and video files (PNG, JPG, MP4). Supports private buckets so we can serve watermarked previews and secure full-resolution downloads.
  - **Row-Level Security (RLS)**
    - Fine-grained access controls to ensure users see only their own dashboard data and purchased assets.

- **Next.js API Routes**
  - Lightweight serverless functions inside our Next.js app.
  - Handle operations like creating Stripe checkout sessions, processing webhooks, and custom queries to Supabase.

- **Stripe**
  - Manages one-time payments and recurring subscriptions.
  - Calculates sales tax automatically based on user location.
  - Generates invoices and provides a customer portal for subscription updates.

## 3. Infrastructure and Deployment

We need a reliable, scalable setup that makes deploying updates easy.

- **Version Control: Git & GitHub**
  - All code resides in Git repositories on GitHub.
  - Enables collaboration, code review, and history tracking.

- **Hosting & Edge Network: Vercel**
  - Hosts our Next.js application with zero-config deployments.
  - Provides a global CDN so pages, images, and API routes load from servers close to users.
  - Automatic SSL certificates (HTTPS) for secure connections.

- **Continuous Integration & Deployment (CI/CD): GitHub Actions**
  - Runs tests and linters on every pull request.
  - Automatically deploys to Vercel after merging to the main branch.

- **Supabase Hosting**
  - Supabase’s managed service handles our database, authentication, and storage without us provisioning servers.

## 4. Third-Party Integrations

To extend core functionality without reinventing the wheel, we integrate:

- **Stripe**
  - Secure payment gateway for one-time image purchases and subscription billing.
  - Built-in invoicing and tax calculation.

- **Google Analytics (or similar)**
  - Tracks site usage, popular search terms, and user behaviors.
  - Helps us understand real estate agent customers’ needs and optimize the experience.

- **Optional Future Integrations**
  - **Sentry** for error monitoring and crash reporting.
  - **Mailgun or SendGrid** for custom email notifications beyond Supabase’s built-in emails.

## 5. Security and Performance Considerations

Safety and speed are top priorities. Here’s how we address them:

- **Authentication & Access Control**
  - Supabase Auth secures all sign-in, sign-up, and password flows.
  - Two-factor authentication (optional) to boost account security.
  - Row-Level Security rules in PostgreSQL ensure users and content managers can only see authorized data.

- **Data Protection**
  - Environment variables store API keys and secrets out of source code.
  - HTTPS encryption across the site (handled by Vercel).
  - Stripe tokenizes payment details so our servers never store raw card numbers.

- **Performance Optimizations**
  - Next.js Image component and Vercel CDN for fast image delivery and on-the-fly resizing.
  - Static generation of public pages (where possible) to reduce server load.
  - Caching API responses in the browser and using SWR or React Query patterns for real-time data updates.
  - Tailwind CSS’s utility classes keep our CSS bundle minimal.

## 6. Conclusion and Overall Tech Stack Summary

We’ve chosen a modern, cohesive set of technologies that work smoothly together to deliver a fast, secure, and maintainable image marketplace:

- Frontend: React, Next.js, shadcn/ui, Tailwind CSS, Supabase JS client, Stripe.js
- Backend: Supabase (PostgreSQL, Auth, Storage), Next.js API routes, Stripe billing
- Infrastructure: GitHub + GitHub Actions, Vercel hosting, Supabase managed service
- Integrations: Stripe for payments, Google Analytics for usage insights
- Security & Performance: HTTPS, tokenized payments, row-level security, image optimization, CI/CD checks

These choices align with our goals of providing real estate agents a simple, reliable way to browse, purchase, and manage image assets—while giving admins a powerful yet user-friendly dashboard for content and financial oversight. With this stack, we can scale easily, roll out new features quickly, and keep running costs low.  

