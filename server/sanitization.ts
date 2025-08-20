import DOMPurify from 'isomorphic-dompurify';

// XSS protection configuration
const SANITIZE_CONFIG = {
  // Allow safe HTML tags and attributes
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
  ALLOWED_ATTR: [],
  // Remove all scripts, events, and dangerous content
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'style'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'href', 'src'],
  // Remove protocol-based vectors
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
};

/**
 * Sanitize a string to prevent XSS attacks
 * Removes dangerous HTML, scripts, and event handlers while preserving safe content
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // First pass: Remove obvious XSS patterns
  let sanitized = input
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove javascript: protocol
    .replace(/javascript\s*:/gi, '')
    // Remove on* event handlers
    .replace(/\s*on\w+\s*=\s*[^>\s]+/gi, '')
    // Remove data: URLs
    .replace(/data\s*:\s*[^>\s]+/gi, '')
    // Remove vbscript: protocol
    .replace(/vbscript\s*:/gi, '')
    // Remove expression() in CSS
    .replace(/expression\s*\([^)]*\)/gi, '');

  // Second pass: Use DOMPurify for comprehensive sanitization
  sanitized = DOMPurify.sanitize(sanitized, {
    ALLOWED_TAGS: SANITIZE_CONFIG.ALLOWED_TAGS,
    ALLOWED_ATTR: SANITIZE_CONFIG.ALLOWED_ATTR,
    FORBID_TAGS: SANITIZE_CONFIG.FORBID_TAGS,
    FORBID_ATTR: SANITIZE_CONFIG.FORBID_ATTR,
    ALLOWED_URI_REGEXP: SANITIZE_CONFIG.ALLOWED_URI_REGEXP,
    // Convert to text content only for form inputs
    KEEP_CONTENT: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });

  // Third pass: Additional security measures
  sanitized = sanitized
    // Remove any remaining HTML tags for form inputs
    .replace(/<[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    // Trim whitespace
    .trim();

  return sanitized;
}

/**
 * Sanitize an object with string values
 * Recursively sanitizes all string properties
 */
export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validate email format and sanitize
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Basic email sanitization
  const sanitized = email
    .trim()
    .toLowerCase()
    // Remove any HTML
    .replace(/<[^>]*>/g, '')
    // Remove dangerous characters
    .replace(/[<>'"]/g, '');

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(sanitized) ? sanitized : '';
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  // Keep only digits, spaces, +, -, (, )
  return phone
    .replace(/[^0-9\s\+\-\(\)]/g, '')
    .trim();
}

/**
 * Check if a string contains potential XSS patterns
 */
export function containsXSS(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /data:\s*text\/html/i,
    /expression\s*\(/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i,
    /<style/i,
    /src\s*=\s*['"]\s*javascript:/i,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Log potential XSS attempts for security monitoring
 */
export function logXSSAttempt(input: string, userIP?: string): void {
  console.warn('🚨 SECURITY ALERT: Potential XSS attempt detected', {
    input: input.substring(0, 100) + (input.length > 100 ? '...' : ''),
    userIP: userIP || 'unknown',
    timestamp: new Date().toISOString(),
    patterns: containsXSS(input)
  });
}