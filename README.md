# The Bombay Forum - Next.js 16 Editorial Platform

A premium editorial platform built with Next.js 16, TypeScript, Tailwind CSS 4.0, and React 19. Complete conversion from HTML design to production-ready Next.js application with public and admin sections.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4.0 with custom theme
- **Fonts**: Newsreader (serif headlines) & Manrope (sans-serif body)
- **Icons**: Material Symbols Outlined
- **Runtime**: Node.js

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
app/
├── layout.tsx                   # Root layout with Google Fonts
├── page.tsx                     # Homepage with hero, editors picks, featured articles
├── globals.css                  # Global styles & custom utilities
├── not-found.tsx                # 404 page
│
├── admin/
│   ├── login/page.tsx          # Admin login with email/access key
│   ├── dashboard/page.tsx       # Admin dashboard with stats & articles table
│   └── articles/edit/page.tsx   # Article editor with form controls
│
├── articles/
│   └── alibaug-retreat/page.tsx # Full article with author bio & images
│
├── categories/
│   ├── founders/page.tsx        # The Founders category
│   ├── creators/page.tsx        # Creators category
│   ├── wealth/page.tsx          # Wealth category
│   ├── future/page.tsx          # Future category
│   ├── suite/page.tsx           # The Suite category
│   └── bombay/page.tsx          # Bombay category
│
├── founders/
│   └── nithin-kamath/page.tsx   # Founder profile: Nithin Kamath (Zerodha)
│
├── creators/
│   └── aryan-varma/page.tsx     # Creator profile: Aryan Varma (Artist)
│
├── about/page.tsx               # About the platform
└── policies/page.tsx            # Privacy & editorial policies

components/
├── TopBar.tsx                   # Date/location/share bar
├── Header.tsx                   # Main navigation header
└── Footer.tsx                   # Footer with links & legal
```

## 📄 Pages Implemented (22 Total)

### Public Pages (16)
- ✅ **Homepage** - Hero story, editors picks (3), featured articles grid (3), founders section, The Suite carousel (3)
- ✅ **Category Pages** (6) - Founders, Creators, Wealth, Future, Suite, Bombay
- ✅ **Articles** - "The Alibaug Retreat" with full editorial layout
- ✅ **Profile Pages** (2) - Nithin Kamath (founder), Aryan Varma (creator)
- ✅ **Info Pages** - About, Policies & Commitments, 404 Not Found

### Admin Pages (3)
- ✅ **Login** - Institutional email & access key authentication UI
- ✅ **Dashboard** - Stats cards, articles table with status indicators
- ✅ **Article Editor** - Form with title, subtitle, category, content, author, featured image

### Shared Components (3)
- ✅ **TopBar** - Mumbai location, current date, share/RSS icons
- ✅ **Header** - Navigation menu, TBF logo, dark mode toggle
- ✅ **Footer** - Footer links, sections, legal, copyright

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#0B1929` (brand-navy) - Main brand color
- **Dark Navy**: `#11262B` (primary) - Headlines & text
- **Brand Red**: `#C8102E` (brand-red) - Accent, highlights
- **Teal Accent**: `#8BB0B8` (brand-teal) - Interactive elements
- **Light Background**: `#fafaf5` (surface) - Main background
- **Additional**: Gray scale for text variants, borders, containers

### Typography
- **Headlines**: Newsreader (serif) - weights 200-800
- **Body/Labels**: Manrope (sans-serif) - weights 200-800
- **Icons**: Material Symbols Outlined (24px default)

### Layout
- **Container**: 1440px max-width with 32px horizontal padding
- **Spacing**: Tailwind scale (gap-4, gap-6, gap-12, gap-16)
- **Border Radius**: Sharp aesthetic (0px default, 9999px for circles)
- **Approach**: Flexbox-first, Grid for 2D layouts

## ✨ Features

- ✅ Responsive design (mobile-first with md/lg breakpoints)
- ✅ Server Components by default for performance
- ✅ Full TypeScript type safety
- ✅ Image optimization with next/image
- ✅ SEO-ready with metadata on each page
- ✅ Semantic HTML with accessibility best practices
- ✅ Smooth hover effects and transitions
- ✅ Dark navy navigation with white text
- ✅ Magazine-style editorial layout
- ✅ Interactive admin dashboard with sidebar navigation

## 🔧 Configuration Files

- **next.config.mjs** - Remote image domains for Google images
- **tailwind.config.ts** - Custom theme with 70+ brand colors
- **tsconfig.json** - Strict TypeScript with path aliases (@/*)
- **postcss.config.js** - Tailwind CSS processing
- **package.json** - Dependencies with pnpm workspaces support

## 🌐 Deployment

Ready for immediate deployment to Vercel without additional configuration:

```bash
# Push to GitHub
git push origin main

# Deploy via Vercel dashboard or CLI
vercel
```

## 📋 Development Notes

- All pages use `export const metadata` for SEO
- Homepage includes real images from Google User Content
- Admin pages use sidebar navigation pattern
- Article pages feature author bios and full editorial layouts
- Category pages show 9 article grids (currently placeholder images)
- All text uses semantic color tokens from Tailwind theme
- Icons use Material Symbols Outlined font

## 🚀 Next Steps / Future Enhancements

- Database integration (Supabase/Neon) for dynamic content
- Authentication system for admin panel
- Article search & filtering
- Comment system for articles
- Newsletter subscription system
- Analytics integration (Google Analytics, PostHog)
- Image optimization with srcset
- Sitemap generation
- RSS feed implementation
- Social sharing buttons

## 📝 License

Proprietary © The Bombay Forum. All rights reserved.
