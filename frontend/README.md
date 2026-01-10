# CyberEdu Frontend

Modern React/Next.js frontend for the CyberEdu platform with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API + Zustand
- **HTTP Client:** Axios
- **Data Fetching:** React Query

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Home page
│   ├── courses/        # Courses listing
│   ├── cart/           # Shopping cart
│   ├── login/          # User login
│   ├── register/       # User registration
│   ├── forum/          # Community forum
│   ├── profile/        # User profile
│   ├── admin/          # Admin dashboard
│   ├── challenges/     # Cybersecurity challenges
│   ├── news/           # News/blog
│   └── layout.tsx      # Root layout with providers
├── components/         # Reusable components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── lib/                # Utilities
│   └── api.ts          # Axios instance with interceptors
└── styles/
    └── globals.css     # Global styles
```

## Features

### Authentication
- User registration with email validation
- Login with username/password
- Automatic JWT token handling
- Protected routes

### Course Management
- Browse courses with category filtering
- Add courses to cart
- Inventory tracking
- Real-time availability updates

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Checkout flow with order placement

### Responsive Design
- Mobile-first approach
- Dark cybersecurity theme
- Tailwind utility classes
- Consistent design system

## API Integration

The frontend connects to the API Gateway at `http://localhost:8080/api`

API routes are configured in `next.config.js`:
- `/api/users/*` → User Service
- `/api/courses/*` → Course Service
- `/api/orders/*` → Order Service
- `/api/forum/*` → Forum Service

## Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Build for Production

```bash
npm run build
npm start
```

## Docker Build

```bash
docker build -t cyberedu-frontend .
docker run -p 3000:80 cyberedu-frontend
```

## Notes

- Lint errors are expected until dependencies are installed (`npm install`)
- The app requires the API Gateway and backend services to be running
- Authentication tokens are stored in localStorage
- Cart data persists across browser sessions
