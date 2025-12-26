# VisaGuide

## Project Info

Single-page application for visa services with an admin dashboard.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

Clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Project Flow

### Architecture
- Frontend: Vite + React + TypeScript with Tailwind and shadcn-ui UI components.
- Backend: Lightweight Express server serving `site_content` from a local JSON file for development (`server/index.js`).
- Data: Supabase handles authentication and stores services, destinations, testimonials, FAQs, and contact info. Hero/About content is managed via local JSON in dev.

### Entry & Routing
- Entry: `index.html` mounts React into `#root`; `src/main.tsx` renders `<App />`.
- Router: `BrowserRouter` defines routes in `src/App.tsx`:
  - `/` → public landing page composed from section components.
  - `/admin` → protected admin dashboard.
  - `/admin/login` → admin login/sign-up.
  - `*` → 404 page.

### Public Site
- Sections: `Navbar`, `HeroSection`, `AboutSection`, `ServicesSection`, `DestinationsSection`, `WhyChooseUs`, `HowItWorks`, `TestimonialsSection`, `FAQSection`, `ContactSection`, `Footer`.
- Content source: Currently static arrays within components; does not fetch from backend on the public pages.

### Authentication & Authorization
- Supabase client initialized from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- `AuthProvider` tracks Supabase auth session and checks admin role via `public.user_roles`.
- Development backdoor: Optional local `hardcoded_admin` flag for dev login.

### Admin Dashboard
- Access control: Redirects unauthenticated users to `/admin/login`; shows “Access Denied” if not admin.
- Data loading:
  - `site_content` (hero/about) via Supabase select.
  - `services`, `destinations`, `testimonials`, `faqs`, `contact_info` via Supabase selects.
- Editing & persistence:
  - Save hero/about to Supabase upsert (conflict on `section_key`).
  - Save other collections directly to Supabase tables with update/insert/delete.
- UX: Tabs per section, toast notifications, sign-out.

### Backend API (Dev)
Optional local API previously used for `site_content` has been removed from the admin flow for deployment simplicity.

### Supabase Schema
- Roles: `public.app_role` enum and `public.user_roles` with RLS; helper function `public.has_role`.
- Content tables: `site_content`, `services`, `destinations`, `testimonials`, `faqs`, `contact_info` with RLS (public select, admin manage).
- Seed data provided in migrations for initial content.

### Local Development
- Install dependencies: `npm i`
- Frontend dev server: `npm run dev` (Vite on port 8080)
- Local API server: `npm run start:api` (Express on port 3001)
- Lint: `npm run lint`
- Build & preview: `npm run build && npm run preview`

### Environment
- Required env for Supabase in `.env`:
  - `VITE_SUPABASE_URL=...`
  - `VITE_SUPABASE_PUBLISHABLE_KEY=...`

## Deploy to Netlify

### Quick Setup
- Connect your repository in Netlify and create a new site.
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables under Site Settings → Environment:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Ensure client-side routing works:
  - The repo includes `public/_redirects` with `/* /index.html 200` which Netlify uses at deploy time.

### Admin Functionality Notes
- Admin dashboard writes content to Supabase tables (`site_content`, `services`, `destinations`, `testimonials`, `faqs`, `contact_info`).
- RLS allows public read; admin manage requires authenticated user with `admin` in `public.user_roles`.
- Seed your roles and initial content using the provided Supabase migrations.

### Optional: Netlify CLI
- Install: `npm i -g netlify-cli`
- Login: `netlify login`
- Init: `netlify init`
- Deploy preview: `netlify deploy --build`
- Deploy production: `netlify deploy --build --prod`

## Custom Domain on Netlify
- Go to Site Settings → Domain Management.
- Add custom domain and follow DNS instructions (Netlify assigns a CNAME).
- Optionally enable HTTPS via Netlify’s automatic SSL.
