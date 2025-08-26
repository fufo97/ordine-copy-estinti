import type { Request, Response, NextFunction } from 'express';

/**
 * HTTPS redirect middleware for production environments
 * Forces all HTTP traffic to redirect to HTTPS for maximum security
 */

/**
 * Middleware to force HTTPS redirect in production
 * Only applies when NODE_ENV=production to avoid breaking development
 */
export function forceHTTPS(req: Request, res: Response, next: NextFunction): void {
  // Only enforce HTTPS in production
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  // Check if request is already secure
  const isSecure = req.secure || 
                   req.headers['x-forwarded-proto'] === 'https' ||
                   req.headers['x-forwarded-ssl'] === 'on';

  if (isSecure) {
    return next();
  }

  // Log insecure access attempt for monitoring (development only)
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 SECURITY: Redirecting insecure HTTP request to HTTPS:', {
      url: req.originalUrl,
      userAgent: req.get('User-Agent')?.substring(0, 100),
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
  }

  // Redirect to HTTPS
  const httpsUrl = `https://${req.get('host')}${req.originalUrl}`;
  
  // Use 301 (permanent redirect) for better SEO and caching
  res.status(301).redirect(httpsUrl);
}

/**
 * Secure cookie configuration for production HTTPS environments
 */
export function getSecureCookieConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    // Essential security flags
    httpOnly: true,           // Prevent XSS access to cookies
    secure: isProduction,     // Only send over HTTPS in production
    sameSite: 'strict' as const, // Prevent CSRF attacks
    
    // Session timing
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    
    // Domain and path restrictions
    path: '/',
    
    // Additional security for production
    ...(isProduction && {
      domain: undefined, // Let browser set this automatically for security
      priority: 'high' as const
    })
  };
}

/**
 * Enhanced security headers specifically for HTTPS environments
 */
export function addHTTPSSecurityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Only add these enhanced headers if we're on HTTPS
  const isSecure = req.secure || 
                   req.headers['x-forwarded-proto'] === 'https' ||
                   req.headers['x-forwarded-ssl'] === 'on';

  if (!isSecure) {
    return next();
  }

  // Enhanced security headers for HTTPS
  res.setHeader('Expect-CT', 'max-age=86400, enforce');
  
  // Certificate Transparency reporting (optional but recommended)
  res.setHeader('Report-To', JSON.stringify({
    group: 'ct-report',
    max_age: 86400,
    endpoints: [{ url: '/api/security/ct-report' }]
  }));

  next();
}

/**
 * Security monitoring endpoint for Certificate Transparency violations
 * This helps detect potential certificate-based attacks
 */
export function handleCTViolationReport(req: Request, res: Response): void {
  try {
    // Log CT violations for security monitoring
    // Log CT violations in development only
    if (process.env.NODE_ENV === 'development') {
      console.warn('🚨 SECURITY ALERT: Certificate Transparency violation reported:', {
        report: req.body,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error handling CT violation report:', error);
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}