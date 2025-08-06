# replit.md

## Overview

This is a full-stack web application for "ORDINE DEI COPYWRITER ESTINTI" (Order of Extinct Copywriters), an Italian email marketing agency website. The application features a modern React frontend with an Express.js backend, implementing sophisticated animations, responsive design, and form handling capabilities.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React + TypeScript with Vite bundler
- **Backend**: Express.js with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation

## Key Components

### Frontend Architecture
- **Component Library**: Custom components built on Radix UI primitives
- **Animation System**: Custom CSS animations with particle effects, morphing cards, and typewriter effects
- **Responsive Design**: Mobile-first approach with extensive breakpoint management
- **Theming**: CSS variables for consistent color scheme and spacing

### Backend Architecture
- **API Layer**: RESTful endpoints for form submissions
- **Data Layer**: Drizzle ORM with type-safe database operations
- **Storage Strategy**: Configurable storage interface supporting both in-memory and PostgreSQL implementations
- **Request Handling**: Express middleware for JSON parsing, logging, and error handling

### Database Schema
Three main entities:
1. **Users**: Basic user authentication structure
2. **Diagnosis Requests**: Free consultation form submissions
3. **Contact Submissions**: Detailed contact form with business information

## Data Flow

1. **Client Requests**: Forms submit via TanStack Query mutations
2. **API Processing**: Express routes validate data using Zod schemas
3. **Database Operations**: Drizzle ORM handles type-safe database interactions
4. **Response Handling**: Standardized JSON responses with error handling
5. **UI Updates**: React Query manages cache invalidation and UI state

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks
- **Express**: Backend web framework
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Runtime type validation
- **TanStack Query**: Server state management

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety across the stack
- **ESBuild**: Production build optimization

## Deployment Strategy

The application is configured for Replit deployment with:

- **Development**: `npm run dev` starts both frontend and backend
- **Build Process**: Vite builds frontend, ESBuild bundles backend
- **Production**: Serves static files and API from single Express server
- **Port Configuration**: External port 80 maps to internal port 5000
- **Auto-scaling**: Configured for autoscale deployment target

The build process creates optimized production bundles with the frontend assets served statically and the backend running as a Node.js application.

## User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Needs complete deployment guide for production hosting with database and file uploads.

## Changelog

Changelog:
- January 21, 2025. Implemented persistent admin mode with enhanced navigation
  - Admin mode now persists across page navigation using /admin prefix routing structure
  - Navigation routes like "/admin/home", "/admin/diagnosi", "/admin/servizi", "/admin/contatti", "/admin/blog"
  - Added "Esci dalla modalità admin" button for quick and safe exit from admin mode
  - Exit button only visible in admin mode with proper session validation
  - Fixed TypeScript errors in Navigation component by removing invalid props from EditableText
  - Navigation dynamically switches between regular and admin routes based on current mode
  - Admin session validation maintained throughout navigation for security
- January 21, 2025. Completed comprehensive blog system implementation
  - Full blog system with PostgreSQL database integration
  - Rich text editor with TipTap for professional content creation
  - Complete CRUD operations for blog post management
  - Blog accessible at /blog with responsive design
  - Admin blog management integrated into navigation menu (📝 Gestisci Blog)
  - Two sample blog posts created with SEO optimization
  - Blog post schema with tags, featured images, meta descriptions
  - Published/draft status system for content management
- January 20, 2025. Fixed admin editor cursor positioning issues and enhanced footer editing
  - Resolved cursor jumping to beginning when using formatting buttons
  - Improved content editor with better selection management
  - Enhanced storage to auto-create missing content keys
  - Fixed "home_cta_description" content update error
  - Added keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U) for formatting
  - Added complete footer content management with 16 editable elements
  - All footer text elements now fully editable in admin mode
- January 11, 2025. Enhanced admin system with comprehensive text editing
  - Added EditableText wrappers to ALL text elements across the website
  - Implemented advanced mini-editor with full formatting capabilities
  - Now every text section is clickable and editable in admin mode (/admin)
  - Enhanced user experience with better positioning and formatting tools
- June 25, 2025. Initial setup