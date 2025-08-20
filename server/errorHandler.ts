import type { Request, Response } from "express";
import { z } from "zod";

// Secure error codes for different types of errors
const ERROR_CODES = {
  VALIDATION_ERROR: 'ERR_VALIDATION',
  SERVER_ERROR: 'ERR_SERVER',
  NOT_FOUND: 'ERR_NOT_FOUND', 
  AUTH_ERROR: 'ERR_AUTH',
  UPLOAD_ERROR: 'ERR_UPLOAD',
  RATE_LIMIT: 'ERR_RATE_LIMIT'
} as const;

// Generic error messages that don't expose internal details
const GENERIC_MESSAGES = {
  [ERROR_CODES.VALIDATION_ERROR]: "I dati forniti non sono corretti",
  [ERROR_CODES.SERVER_ERROR]: "Si è verificato un errore interno",
  [ERROR_CODES.NOT_FOUND]: "La risorsa richiesta non è stata trovata",
  [ERROR_CODES.AUTH_ERROR]: "Accesso non autorizzato",
  [ERROR_CODES.UPLOAD_ERROR]: "Errore durante il caricamento del file",
  [ERROR_CODES.RATE_LIMIT]: "Troppe richieste, riprova più tardi"
} as const;

/**
 * Generate a secure error ID for tracking purposes
 */
function generateErrorId(): string {
  return `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Log error details securely for internal debugging
 */
function logSecureError(errorId: string, error: unknown, context: string, req?: Request): void {
  const logData = {
    errorId,
    context,
    timestamp: new Date().toISOString(),
    userAgent: req?.get('User-Agent')?.substring(0, 100),
    ip: req?.ip,
    url: req?.originalUrl,
    method: req?.method,
    // Only log error type and basic info, not full stack traces
    errorType: error instanceof Error ? error.constructor.name : typeof error,
    errorMessage: error instanceof Error ? error.message.substring(0, 200) : 'Unknown error'
  };

  // Internal logging only - never expose this to users
  console.error('🔒 SECURE ERROR LOG:', JSON.stringify(logData, null, 2));
}

/**
 * Handle Zod validation errors securely
 */
export function handleValidationError(error: z.ZodError, req: Request, res: Response): void {
  const errorId = generateErrorId();
  
  // Log detailed validation errors internally
  logSecureError(errorId, error, 'Validation Error', req);
  
  // Return only generic validation errors to user
  const sanitizedErrors = error.errors.map(err => ({
    field: err.path.join('.'),
    message: "Campo non valido" // Generic message instead of detailed Zod message
  }));

  res.status(400).json({
    success: false,
    message: GENERIC_MESSAGES[ERROR_CODES.VALIDATION_ERROR],
    errors: sanitizedErrors,
    errorId // For support purposes only
  });
}

/**
 * Handle server errors securely 
 */
export function handleServerError(error: unknown, context: string, req: Request, res: Response): void {
  const errorId = generateErrorId();
  
  // Log detailed error internally
  logSecureError(errorId, error, context, req);
  
  // Return generic error message to user
  res.status(500).json({
    success: false,
    message: GENERIC_MESSAGES[ERROR_CODES.SERVER_ERROR],
    errorId // For support purposes only
  });
}

/**
 * Handle authentication errors securely
 */
export function handleAuthError(error: unknown, req: Request, res: Response): void {
  const errorId = generateErrorId();
  
  // Log auth failure internally without sensitive details
  logSecureError(errorId, error, 'Authentication Error', req);
  
  // Return generic auth error
  res.status(401).json({
    success: false,
    message: GENERIC_MESSAGES[ERROR_CODES.AUTH_ERROR],
    errorId
  });
}

/**
 * Handle not found errors securely
 */
export function handleNotFoundError(resource: string, req: Request, res: Response): void {
  const errorId = generateErrorId();
  
  // Log resource access attempt
  logSecureError(errorId, new Error(`Resource not found: ${resource}`), 'Not Found', req);
  
  // Return generic not found message
  res.status(404).json({
    success: false,
    message: GENERIC_MESSAGES[ERROR_CODES.NOT_FOUND],
    errorId
  });
}

/**
 * Handle upload errors securely
 */
export function handleUploadError(error: unknown, req: Request, res: Response): void {
  const errorId = generateErrorId();
  
  // Log upload error internally
  logSecureError(errorId, error, 'Upload Error', req);
  
  // Return generic upload error
  res.status(400).json({
    success: false,
    message: GENERIC_MESSAGES[ERROR_CODES.UPLOAD_ERROR],
    errorId
  });
}

/**
 * Handle rate limiting errors securely
 */
export function handleRateLimitError(req: Request, res: Response): void {
  const errorId = generateErrorId();
  
  // Log rate limit hit
  logSecureError(errorId, new Error('Rate limit exceeded'), 'Rate Limit', req);
  
  // Return generic rate limit message
  res.status(429).json({
    success: false,
    message: GENERIC_MESSAGES[ERROR_CODES.RATE_LIMIT],
    errorId
  });
}

/**
 * Sanitize error message to remove sensitive information
 */
export function sanitizeErrorMessage(message: string): string {
  // Remove common sensitive patterns
  return message
    .replace(/password/gi, '[REDACTED]')
    .replace(/token/gi, '[REDACTED]')
    .replace(/key/gi, '[REDACTED]')
    .replace(/secret/gi, '[REDACTED]')
    .replace(/\.env/gi, '[CONFIG]')
    .replace(/database/gi, 'storage')
    .replace(/sql/gi, 'query')
    .replace(/localhost:\d+/gi, '[SERVER]')
    .replace(/\/[a-zA-Z0-9_\-\.\/]+\.js/gi, '[MODULE]')
    .replace(/Error: /gi, '')
    .substring(0, 100); // Limit length
}