# Frontend Guideline Document

This document lays out the frontend architecture, design principles, styling, component structure, state management, routing, performance optimizations, testing strategies, and an overall summary for the real-estate stock image marketplace. It’s written in everyday language so everyone on the team knows how we build, style, and maintain the app.

## 1. Frontend Architecture

### Frameworks and Libraries
- **Next.js**: Our core framework for React-based pages, server-side rendering (SSR), static generation (SSG), and API routes.
- **React**: Component-driven UI library.
- **Tailwind CSS**: Utility-first CSS for rapid, consistent styling.
- **Shadcn UI**: Prebuilt components (built on Radix + Tailwind) for accessible, polished UI elements.
- **Next.js API Routes**: Lightweight backend endpoints for custom logic (e.g., checkout sessions).
- **Vercel**: Hosting platform with automatic deployments and edge caching.

### How This Supports Scalability, Maintainability & Performance
- **Scalability**: File-based routing and isolated components let us grow the app without it becoming tangled. Static pages and API Routes spin up easily.
- **Maintainability**: Clear folder structure (pages, components, styles, lib) and component-based code ensure changes live in one place. Shadcn UI and Tailwind utilities keep styles consistent.
- **Performance**: Next.js automatic code splitting, image optimization, and server rendering deliver fast page loads. Vercel’s CDN caches static assets globally.

## 2. Design Principles

### Key Principles
1. **Usability**: Clear navigation, intuitive search and filters, familiar patterns (cards, modals, tabs).
2. **Accessibility** (WCAG AA): All images have meaningful alt text. Shadcn UI components include proper ARIA roles by default. We ensure keyboard navigation and color contrast.
3. **Responsiveness**: Mobile-first design; layouts adapt from small screens (single-column) to desktops (multi-column grids).
4. **Clarity & Consistency**: Reuse of components and styles gives users a predictable experience.

### Applying These in the UI
- Search bar always at top, stickied on scroll for easy access.
- Filter panel toggles on mobile and stays visible on desktop.
- Buttons and links have clear labels (“Buy now,” “Subscribe,” “Reset Password”).
- Form fields use consistent spacing and focus states.

## 3. Styling and Theming

### Styling Approach
- **Tailwind CSS** for utility classes (colors, spacing, typography).
- **Shadcn UI** components get further customized via Tailwind config.
- We follow an atomic approach: small utility-driven styles first, then custom classes only when needed.

### Theming
- All colors, font sizes, and breakpoints are defined in **tailwind.config.js** under `theme.extend`.
- Dark and light modes can be toggled via Tailwind’s `dark:` variant.

### Visual Style
- **Style**: Modern with a touch of glassmorphism. Transparent cards with subtle blur overlays over background images.
- **Color Palette**:
  - Primary Neon Blue: #00D1FF
  - Accent Neon Orange: #FF7F00
  - Dark Background: #1A202C
  - Light Background: #F7FAFC
  - Card Overlay: rgba(255, 255, 255, 0.08)
  - Text Primary: #FFFFFF
  - Text Secondary: #A0AEC0
- **Font**: Inter (sans-serif). Light, readable typography for long descriptions and metadata.

## 4. Component Structure

### Organization
- **/components**
  - **/atoms**: Buttons, Inputs, Labels, Icons.
  - **/molecules**: SearchBar (Input + IconButton), ImageCard (Thumbnail + Metadata), FilterTag.
  - **/organisms**: FilterPanel, ImageGrid, Navbar, Footer, SubscriptionModal.
  - **/layouts**: MainLayout (Navbar + Footer), DashboardLayout (Sidebar + Header).
- **/pages**: File-based routes for home, search, product, dashboard, admin, auth.

### Reuse & Maintainability
- Each UI piece lives in one file with optional subfiles (Component.tsx, Component.css). No duplication.
- Centralized props definitions and consistent naming (`<Button variant=“primary”>`).
- Shared utilities and hooks in **/lib** (e.g., `useAuth`, `useFetchImages`).

## 5. State Management

### Authentication & User State
- **Supabase Auth** session is stored in React Context (`AuthContext`), so any component can check `user` and `loading` states.

### Server Data (Images, Orders)
- **SWR** or **React Query** for data fetching, caching, revalidation (e.g., image catalog, user invoices).
- Hooks like `useImages`, `useUserSubscriptions` wrap fetch logic, handle loading + errors.

### Local UI State
- useState/useReducer for component-level state (e.g., toggling filter panel, modals).

## 6. Routing and Navigation

### File-Based Routing
- **/pages** folder with routes:
  - `/` – home/search
  - `/images/[id]` – image detail
  - `/auth/login`, `/auth/signup`, `/auth/reset-password`
  - `/dashboard` – user downloads, invoices, subscriptions
  - `/admin` – super-admin & content manager panels

### Navigation Structure
- **Main Nav**: Logo (home), Search, Browse Categories, Login/Profile
- **Dashboard Nav**: Sidebar links for Downloads, Invoices, Subscriptions
- **Admin Nav**: Tabs for User Management, Asset Management, Pricing, Reports
- Next.js `<Link>` for client-side transitions; active route highlighting via `useRouter().pathname`.

## 7. Performance Optimization

- **Lazy Loading**: Next.js `<Image>` component with `loading="lazy"`; dynamic import for heavy components (e.g., video player).
- **Code Splitting**: Automatic with Next.js; manual dynamic imports for admin-only bundles.
- **Asset Optimization**: Tailwind CSS purging unused styles, compressing images via Supabase + Next Image loader.
- **Caching**: SWR/React Query caches API responses; Vercel edge cache for static pages.
- **Pre-fetching**: Next.js prefetches linked pages when links scroll into view.

## 8. Testing and Quality Assurance

### Unit & Integration Tests
- **Jest** + **React Testing Library** for React components and hooks.
- Mock Supabase and Stripe API calls using **msw** (Mock Service Worker).

### End-to-End (E2E) Tests
- **Cypress** for full-flow tests: sign-up/login, search + filter, purchase, download.

### Linting & Formatting
- **ESLint** (including Tailwind plugin) to enforce code style.
- **Prettier** for consistent formatting.
- **Continuous Integration** runs lint, type checks (if using TypeScript), and tests on every PR.

## 9. Conclusion and Overall Frontend Summary

This guideline outlines how we build a fast, accessible, and maintainable frontend using Next.js, React, Tailwind CSS, and Shadcn UI. Our design principles—usability, accessibility, responsiveness—guide every UI decision. A clear folder structure and component-based approach keep code organized. State is managed predictably with Context and SWR/React Query. Next.js routing and performance features (SSR, SSG, code splitting) give our users a snappy experience. Finally, solid testing practices (Jest, React Testing Library, Cypress) and linting ensure long-term quality. Together, these practices align perfectly with the project’s goal: a seamless online marketplace for real-estate agents to browse, purchase, and manage stock images and videos.