# 💈 Bergas - Barbershop Management Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-Production-success)](https://bergas.muzaaqi.my.id)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Modern, responsive, and intuitive frontend application** for Bergas Barbershop Management System. Built with Next.js and TypeScript, providing seamless user experience for customers, barbers, and administrators.

🌐 **Live Demo:** [bergas.muzaaqi.my.id](https://bergas.muzaaqi.my.id)  
🔗 **Backend API:** [barber-app-be](https://github.com/muzaaqi/barber-app-be)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Build & Deployment](#-build--deployment)
- [Available Scripts](#-available-scripts)
- [Project Architecture](#-project-architecture)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👤 User Experience
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Modern UI/UX** - Clean and intuitive interface with shadcn/ui components
- **Dark/Light Mode** - Theme switching for better user experience
- **Real-Time Updates** - Live booking status and notifications

### 🎯 Customer Features
- **Browse Services** - View available haircut services and pricing
- **Book Appointments** - Easy appointment scheduling with date/time picker
- **Barber Selection** - Choose preferred barber for your appointment
- **Booking History** - Track past and upcoming appointments
- **Profile Management** - Update personal information and preferences

### ✂️ Barber Features
- **Schedule Management** - View and manage daily appointments
- **Customer Details** - Access customer information and history
- **Service Tracking** - Track completed services and earnings
- **Availability Control** - Set working hours and days off

### 👨‍💼 Admin Features
- **Dashboard Analytics** - Comprehensive business insights and statistics
- **User Management** - Manage customers, barbers, and staff
- **Service Management** - Add, edit, or remove services
- **Product Catalog** - Manage barbershop products and inventory
- **Booking Overview** - Monitor all appointments and bookings
- **Reports & Analytics** - Revenue reports and performance metrics

---

## 🛠 Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5.0+** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide Icons** - Beautiful & consistent icon set

### State Management & Data Fetching
- **React Query / TanStack Query** - Server state management
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests

### Forms & Validation
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Bun** - Fast JavaScript runtime & package manager

### Build & Deployment
- **Vercel** - Deployment platform
- **Git** - Version control

---

## 📁 Project Structure

```
barber-app-fe/
│
├── public/                   # Static assets
│   ├── images/              # Image files
│   ├── icons/               # Icon files
│   └── fonts/               # Font files
│
├── src/                     # Source code
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (customer)/     # Customer pages
│   │   ├── (barber)/       # Barber dashboard
│   │   ├── (admin)/        # Admin panel
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   │
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layouts/        # Layout components
│   │   ├── forms/          # Form components
│   │   └── shared/         # Shared components
│   │
│   ├── lib/                # Utility functions
│   │   ├── api/            # API client & endpoints
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   └── constants/      # Constants & configs
│   │
│   ├── types/              # TypeScript type definitions
│   │   ├── api.ts          # API types
│   │   ├── models.ts       # Data models
│   │   └── components.ts   # Component types
│   │
│   ├── stores/             # State management
│   │   ├── auth.ts         # Auth state
│   │   ├── booking.ts      # Booking state
│   │   └── user.ts         # User state
│   │
│   └── styles/             # Global styles
│       └── globals.css     # Global CSS
│
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
├── eslint.config.mjs       # ESLint configuration
├── postcss.config.mjs      # PostCSS configuration
├── package.json            # Dependencies
├── bun.lock               # Bun lock file
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18.17+** or **Bun 1.0+** - [Download Node.js](https://nodejs.org/) or [Download Bun](https://bun.sh/)
- **Git** - Version control system
- **Backend API** - Make sure the [backend API](https://github.com/muzaaqi/barber-app-be) is running

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/muzaaqi/barber-app-fe.git
cd barber-app-fe
```

2. **Install dependencies**

Using **Bun** (recommended):
```bash
bun install
```

Or using **npm**:
```bash
npm install
```

Or using **yarn**:
```bash
yarn install
```

Or using **pnpm**:
```bash
pnpm install
```

### Configuration

1. **Create environment file**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. **Configure environment variables**

Edit `.env.local` with your settings:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Production API (comment out for local development)
# NEXT_PUBLIC_API_URL=https://bergas-api.muzaaqi.my.id
# NEXT_PUBLIC_API_BASE_URL=https://bergas-api.muzaaqi.my.id/api

# Application Configuration
NEXT_PUBLIC_APP_NAME=Bergas
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Socket.IO (if using real-time features)
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Image Upload
NEXT_PUBLIC_MAX_FILE_SIZE=5242880  # 5MB in bytes
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CHAT=true
```

### Running the Application

**Development Mode** (with hot reload):

Using **Bun**:
```bash
bun dev
```

Using **npm**:
```bash
npm run dev
```

Using **yarn**:
```bash
yarn dev
```

Using **pnpm**:
```bash
pnpm dev
```

The application will be available at: `http://localhost:3000`

---

## 📦 Build & Deployment

### Build for Production

Using **Bun**:
```bash
bun run build
```

Using **npm**:
```bash
npm run build
```

This will:
1. Type-check with TypeScript
2. Optimize and bundle the application
3. Generate static pages where possible
4. Create production-ready build in `.next` folder

### Preview Production Build

```bash
bun start
# or
npm start
```

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com):

#### Option 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build
4. Add your environment variables in Vercel dashboard
5. Deploy! 🚀

#### Option 2: Deploy using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deploy to Other Platforms

#### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

#### Docker
```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**Current Production:** Deployed at [bergas.muzaaqi.my.id](https://bergas.muzaaqi.my.id)

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server at http://localhost:3000 |
| `bun build` | Build production-ready application |
| `bun start` | Start production server |
| `bun lint` | Run ESLint to check code quality |
| `bun lint:fix` | Fix ESLint errors automatically |
| `bun type-check` | Run TypeScript type checking |
| `bun format` | Format code with Prettier (if configured) |

---

## 🏗️ Project Architecture

### App Router Structure

Using Next.js 16 App Router with route groups:

```
app/
├── (auth)/              # Authentication pages
│   ├── login/
│   ├── register/
│   └── forgot-password/
│
├── (customer)/          # Customer pages
│   ├── dashboard/
│   ├── bookings/
│   ├── services/
│   └── profile/
│
├── (barber)/           # Barber pages
│   ├── dashboard/
│   ├── schedule/
│   └── customers/
│
└── (admin)/            # Admin pages
    ├── dashboard/
    ├── users/
    ├── services/
    ├── bookings/
    └── analytics/
```

### Component Organization

```
components/
├── ui/                 # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
│
├── layouts/           # Layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
│
├── forms/            # Form components
│   ├── BookingForm.tsx
│   ├── LoginForm.tsx
│   └── ServiceForm.tsx
│
└── shared/           # Shared components
    ├── LoadingSpinner.tsx
    ├── ErrorBoundary.tsx
    └── NotFound.tsx
```

### API Integration

```typescript
// lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### State Management

Using Zustand for global state:

```typescript
// stores/auth.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (credentials) => {
    // Login logic
  },
  logout: () => {
    set({ user: null, token: null });
  },
}));
```

---

## 🎨 Theming & Styling

### Tailwind Configuration

Custom theme with Bergas branding colors:

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        // ... more colors
      },
    },
  },
};
```

### Using shadcn/ui Components

```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MyForm() {
  return (
    <form>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </form>
  )
}
```

---

## 🔒 Authentication Flow

1. User enters credentials on login page
2. Frontend sends request to `/api/user/login`
3. Backend returns JWT token
4. Token stored in localStorage
5. Token included in subsequent API requests
6. Protected routes check for valid token

```typescript
// Example protected route
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

export default function ProtectedPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return <div>Protected Content</div>;
}
```

---

## 🧪 Testing

```bash
# Run unit tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Coding Standards

- Follow **TypeScript best practices**
- Use **ESLint** for code quality
- Write **meaningful component and variable names**
- Add **JSDoc comments** for complex functions
- Keep components **small and focused**
- Use **Tailwind CSS classes** for styling
- Follow **shadcn/ui patterns** for consistency

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Muzaaqi**

- 🌐 Website: [muzaaqi.my.id](https://muzaaqi.my.id)
- 💼 GitHub: [@muzaaqi](https://github.com/muzaaqi)
- 📧 Email: admin@bergas.com

---

## 🔗 Related Projects

- **Backend API:** [barber-app-be](https://github.com/muzaaqi/barber-app-be)
- **API Documentation:** [bergas-api.muzaaqi.my.id](https://bergas-api.muzaaqi.my.id)

---

## 📞 Support

Need help? Here's how to get support:

- 📖 **Documentation:** Check out [Next.js docs](https://nextjs.org/docs)
- 🐛 **Bug Reports:** [Create an issue](https://github.com/muzaaqi/barber-app-fe/issues)
- 💬 **Questions:** [Open a discussion](https://github.com/muzaaqi/barber-app-fe/discussions)
- 📧 **Email:** admin@bergas.com

---

## 🙏 Acknowledgments

- **Next.js** - For the amazing React framework
- **Vercel** - For seamless deployment
- **shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first CSS framework

---

## 📝 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

<div align="center">

**Built with ❤️ by Muzaaqi**

⭐ Star this repo if you find it helpful!

</div>