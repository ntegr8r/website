# Senior Marketing Funnel Application

## Overview

This is a full-stack TypeScript application that creates a marketing funnel for businesses targeting the senior market (55+). The application guides users through a multi-step process to assess their current senior marketing capabilities and book consultations for improvement strategies.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with custom plugins for development

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Memory-based storage (development) with PostgreSQL session store for production

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
└── migrations/      # Database migrations
```

## Key Components

### Database Schema (shared/schema.ts)
- **Companies**: Stores company information and user details
- **Assessments**: Stores assessment responses and calculated scores
- **Consultations**: Manages consultation bookings and preferences

### Frontend Components
- **Multi-step Funnel**: Six-step process with progress tracking
- **Assessment System**: Interactive questionnaire with scoring algorithm
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui components for consistent design

### Backend Services
- **Storage Layer**: Abstracted storage interface with memory and database implementations
- **Assessment Scoring**: Algorithm that calculates marketing maturity scores
- **API Routes**: RESTful endpoints for companies, assessments, and consultations

## Data Flow

1. **Landing Page**: User sees value proposition and trust indicators
2. **Company Information**: Collects business details and contact information
3. **Assessment**: User completes marketing capability questionnaire
4. **Results**: System calculates score and provides personalized recommendations
5. **Consultation Booking**: User schedules consultation based on assessment
6. **Thank You**: Confirmation and next steps

### Assessment Scoring Algorithm
The system evaluates:
- Senior customer percentage (0-50 points)
- Marketing channels usage (up to 50 points)
- Business challenges and goals
- Monthly marketing budget

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **wouter**: Lightweight React router

### Development Tools
- **Vite**: Fast build tool with HMR
- **@replit/vite-plugin-***: Replit-specific development plugins
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling

## Deployment Strategy

### Development
- **Server**: Started with `tsx server/index.ts`
- **Client**: Vite development server with HMR
- **Database**: Drizzle migrations with `drizzle-kit push`

### Production
- **Build Process**: 
  - Frontend: Vite builds to `dist/public`
  - Backend: esbuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: PostgreSQL with connection pooling

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment flag (development/production)

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.