# 💈 Bergas - Barbershop Management Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Modern frontend application for Bergas Barbershop Management System. Built with Next.js 16, React 19, and TypeScript.

🌐 **Live:** [bergas.muzaaqi.my.id](https://bergas.muzaaqi.my.id)  
🔗 **Backend:** [barber-app-be](https://github.com/muzaaqi/barber-app-be)

---

## ✨ Features

- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- 🎨 **Dark/Light Mode** - Theme switching with next-themes
- 📊 **Analytics Dashboard** - Charts and reports with Recharts
- 📅 **Booking System** - Calendar picker with date-fns
- 📷 **QR Code** - Generate and scan QR codes for bookings
- 🔄 **Real-Time Updates** - Live notifications via Socket.IO
- 📋 **Data Tables** - Interactive tables with TanStack Table
- 🔔 **Toast Notifications** - User feedback with Sonner

---

## 🛠 Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19.2** - Latest React with concurrent features
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first styling

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - CSS variant management

### Key Libraries
- **Axios** - HTTP client for API requests
- **Socket.IO Client** - Real-time communication
- **Recharts** - Data visualization
- **TanStack Table** - Headless table component
- **react-day-picker** - Date picker
- **date-fns** - Date utilities
- **QR Code** - qrcode, qrcode.react, @yudiel/react-qr-scanner
- **Sonner** - Toast notifications
- **Embla Carousel** - Carousel component

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** or **Bun 1.0+**
- **Backend API** running at `http://localhost:5000`

### Installation

```bash
# Clone repository
git clone https://github.com/muzaaqi/barber-app-fe.git
cd barber-app-fe

# Install dependencies
bun install
# or
npm install
```

### Configuration

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

NEXT_PUBLIC_APP_NAME=Bergas
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Build & Deploy

### Build for Production

```bash
bun run build
# or
npm run build
```

### Start Production Server

```bash
bun start
# or
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com/new)
3. Add environment variables
4. Deploy! 🚀

Or use Vercel CLI:
```bash
vercel --prod
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |

---

## 🔑 Key Features Implementation

### API Client (Axios)
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Real-Time Updates (Socket.IO)
```typescript
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

socket.on('booking-update', (data) => {
  // Handle real-time updates
});
```

### QR Code Generation
```tsx
import QRCode from 'qrcode.react';

<QRCode value={bookingId} size={256} level="H" />
```

### Toast Notifications
```typescript
import { toast } from 'sonner';

toast.success('Booking created!');
toast.error('Failed to create booking');
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

## 👨‍💻 Developer

**Muzaaqi**
- GitHub: [@muzaaqi](https://github.com/muzaaqi)
- Website: [muzaaqi.my.id](https://muzaaqi.my.id)

---

## 🔗 Links

- **Frontend:** [bergas.muzaaqi.my.id](https://bergas.muzaaqi.my.id)
- **Backend:** [barber-app-be](https://github.com/muzaaqi/barber-app-be)
- **API Docs:** [bergas-api.muzaaqi.my.id](https://bergas-api.muzaaqi.my.id)

---

<div align="center">

**Built with ❤️ by Muzaaqi**

⭐ Star this repo if you find it helpful!

</div>