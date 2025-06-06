# Fravega Challenge

## 🚀 Technology Stack

**Frontend:** Next.js 15 (App Router) + React 19 + TypeScript + SCSS Modules  
**State:** TanStack Query v5 + Axios  
**Quality:** ESLint + Prettier + Husky
**Testing:** Jest + Testing Library

## 📦 Installation and Commands

```bash
# Install and setup
git clone git@github.com:cardgabriel/fravega-challenge.git
npm install
npm run prepare

# Development
npm run dev              # Development server with Turbopack
npm run build           # Production build
npm run start           # Production server

# Quality
npm run lint            # Check for errors
npm run lint:fix        # Auto-fix issues
npm run format          # Format code
npm run type-check      # Type checking

# Testing
npm test                # Tests in watch mode
npm run test:ci         # Tests with coverage
```

## 🏗️ Structure

```
├── app/                    # Application (App Router)
│   ├── _lib/              # Configurations and utilities
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # React providers
├── __tests__/             # Tests
├── .husky/                # Git hooks
└── public/                # Static files
```

## ⚙️ Configuration

**Environment variables** (`.env.local`):

```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

**HTTP Client:** Pre-configured in `app/_lib/axiosClient.ts` with 10s timeout and JSON headers.

**Git Hooks:** Pre-commit (formatting/linting) and pre-push (tests/build).

## 🧪 Features

- **Ultra-fast development** with Turbopack
- **Complete type safety** with TypeScript
- **Optimized state management** with TanStack Query
- **Encapsulated styles** with SCSS Modules
- **Complete testing** with automatic coverage
- **Automatic quality** with ESLint, Prettier and git hooks
- **React Query DevTools** included
- **Conventions:** PascalCase (components), camelCase (utilities), SCSS Modules.

Open [http://localhost:3000](http://localhost:3000) after running `npm run dev` to get started.

---

_Public Project - Fravega Challenge_
