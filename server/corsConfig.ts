import cors from 'cors';
import type { CorsOptions } from 'cors';

/**
 * Secure CORS configuration to prevent unauthorized cross-origin attacks
 */

// Production domains that are allowed to make requests
const PRODUCTION_ORIGINS = [
  'https://ordine-copywriter-estinti.replit.app', // Main Replit domain
  'https://ordinecopywriter.com', // Main production domain
  'https://www.ordinecopywriter.com', // WWW variant
  // Add other authorized domains here as needed
] as const;

// Development origins for local testing
const DEVELOPMENT_ORIGINS = [
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://localhost:3000', // Common dev ports
  'http://127.0.0.1:3000',
] as const;

/**
 * Get allowed origins based on environment
 */
function getAllowedOrigins(): string[] {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return [...DEVELOPMENT_ORIGINS, ...PRODUCTION_ORIGINS];
  }
  
  return [...PRODUCTION_ORIGINS];
}

/**
 * CORS origin checker function
 */
function corsOriginChecker(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void): void {
  const allowedOrigins = getAllowedOrigins();
  
  // Allow requests with no origin (mobile apps, curl, Postman, etc.)
  if (!origin) {
    return callback(null, true);
  }
  
  // Check if origin is in allowed list
  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  
  // Log blocked origin for security monitoring (development only)
  if (process.env.NODE_ENV === 'development') {
    console.warn('🚨 SECURITY: Blocked CORS request from unauthorized origin:', {
      origin,
      allowedOrigins,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  }
  
  // Reject unauthorized origin
  return callback(new Error('Non consentito dalla politica CORS'), false);
}

/**
 * Secure CORS configuration
 */
export const corsOptions: CorsOptions = {
  origin: corsOriginChecker,
  
  // Only allow specific HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  
  // Only allow specific headers
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name'
  ],
  
  // Expose only necessary headers to the client
  exposedHeaders: [
    'Content-Range',
    'X-Content-Range',
    'X-Total-Count'
  ],
  
  // Allow credentials (cookies, authorization headers)
  credentials: true,
  
  // Cache preflight response for 24 hours
  maxAge: 86400, // 24 hours in seconds
  
  // Enable preflight for complex requests
  preflightContinue: false,
  
  // Always send CORS headers
  optionsSuccessStatus: 204
};

/**
 * Additional security headers middleware
 */
export function addSecurityHeaders(req: any, res: any, next: any): void {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Prevent information disclosure
  res.removeHeader('X-Powered-By');
  
  // Strict Transport Security (HTTPS only) - Enhanced for maximum security
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  
  // Content Security Policy - Enhanced for production security
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // Updated CSP for production - allows external scripts needed for functionality
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://cs.iubenda.com https://cdn.iubenda.com https://replit.com https://fonts.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' https: https://fonts.gstatic.com; " +
      "connect-src 'self' https://www.google-analytics.com; " +
      "frame-ancestors 'none'; " +
      "upgrade-insecure-requests;"
    );
  } else {
    // Relaxed CSP for development
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' https:; " +
      "connect-src 'self'; " +
      "frame-ancestors 'none';"
    );
  }
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (formerly Feature Policy)
  res.setHeader('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  next();
}

/**
 * Development-specific CORS for Vite HMR
 */
export const devCorsOptions: CorsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: ['*'],
  maxAge: 86400
};

/**
 * Get appropriate CORS configuration based on environment
 */
export function getCorsConfig(): CorsOptions {
  return process.env.NODE_ENV === 'development' ? devCorsOptions : corsOptions;
}