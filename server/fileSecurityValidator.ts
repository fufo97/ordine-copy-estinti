import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

/**
 * Comprehensive file security validation system
 * Goes beyond MIME type checking to prevent malicious file uploads
 */

// File type definitions with magic numbers (file signatures)
const FILE_SIGNATURES = {
  // Images
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF], // JPEG
    [0xFF, 0xD8, 0xFF, 0xE0], // JPEG/JFIF
    [0xFF, 0xD8, 0xFF, 0xE1] // JPEG/EXIF
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] // PNG
  ],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61] // GIF89a
  ],
  'image/webp': [
    [0x52, 0x49, 0x46, 0x46] // RIFF (WebP container)
  ],
  'image/bmp': [
    [0x42, 0x4D] // BM
  ],
  'image/svg+xml': [
    [0x3C, 0x3F, 0x78, 0x6D, 0x6C], // <?xml
    [0x3C, 0x73, 0x76, 0x67] // <svg
  ],
  // Archives
  'application/zip': [
    [0x50, 0x4B, 0x03, 0x04], // ZIP local file header
    [0x50, 0x4B, 0x05, 0x06], // ZIP central directory
    [0x50, 0x4B, 0x07, 0x08] // ZIP data descriptor
  ]
} as const;

// Dangerous file extensions that should never be allowed
const DANGEROUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.com', '.scr', '.pif', '.vbs', '.js', '.jse',
  '.ws', '.wsf', '.wsc', '.wsh', '.ps1', '.ps1xml', '.ps2', '.ps2xml',
  '.psc1', '.psc2', '.msh', '.msh1', '.msh2', '.mshxml', '.msh1xml',
  '.msh2xml', '.scf', '.lnk', '.inf', '.reg', '.msi', '.msp', '.mst',
  '.docm', '.dotm', '.xlsm', '.xltm', '.xlam', '.pptm', '.potm', '.ppam',
  '.ppsm', '.sldm', '.jar', '.class', '.dex', '.apk', '.app', '.dmg',
  '.pkg', '.rpm', '.deb', '.so', '.dll', '.dylib'
];

// Malicious content patterns
const MALICIOUS_PATTERNS = [
  // Script tags
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  // PHP code
  /<\?php[\s\S]*?\?>/gi,
  // ASP code
  /<%[\s\S]*?%>/gi,
  // JavaScript events
  /on\w+\s*=\s*[^>\s]+/gi,
  // Base64 encoded suspicious content
  /data\s*:\s*[^>\s]*base64/gi,
  // Executable signatures in text
  /4d5a90/gi, // MZ header (PE executable)
  /7f454c46/gi, // ELF header (Linux executable)
];

/**
 * Interface for file validation result
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
  fileInfo?: {
    realType: string;
    size: number;
    hash: string;
    isExecutable: boolean;
    containsSuspiciousContent: boolean;
  };
}

/**
 * Validate file signature against known good signatures
 */
function validateFileSignature(filePath: string, expectedMimeType: string): boolean {
  try {
    const buffer = fs.readFileSync(filePath);
    const signatures = FILE_SIGNATURES[expectedMimeType as keyof typeof FILE_SIGNATURES];
    
    if (!signatures) {
      return false;
    }
    
    return signatures.some(signature => {
      return signature.every((byte, index) => buffer[index] === byte);
    });
  } catch (error) {
    return false;
  }
}

/**
 * Detect real file type based on file signature
 */
function detectRealFileType(filePath: string): string | null {
  try {
    const buffer = fs.readFileSync(filePath, { encoding: null });
    
    for (const [mimeType, signatures] of Object.entries(FILE_SIGNATURES)) {
      for (const signature of signatures) {
        if (signature.every((byte, index) => buffer[index] === byte)) {
          return mimeType;
        }
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Check if file extension is dangerous
 */
function isDangerousExtension(filename: string): boolean {
  const extension = path.extname(filename).toLowerCase();
  return DANGEROUS_EXTENSIONS.includes(extension);
}

/**
 * Check file content for malicious patterns
 */
function containsMaliciousContent(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    return MALICIOUS_PATTERNS.some(pattern => pattern.test(content));
  } catch (error) {
    // If we can't read as text, check for binary executable signatures
    try {
      const buffer = fs.readFileSync(filePath);
      const hex = buffer.toString('hex').toLowerCase();
      
      // Check for PE executable signature (Windows .exe)
      if (hex.startsWith('4d5a')) return true;
      
      // Check for ELF executable signature (Linux)
      if (hex.startsWith('7f454c46')) return true;
      
      // Check for Mach-O executable signature (macOS)
      if (hex.startsWith('feedface') || hex.startsWith('feedfacf')) return true;
      
      return false;
    } catch (binaryError) {
      return false;
    }
  }
}

/**
 * Calculate file hash for integrity verification
 */
function calculateFileHash(filePath: string): string {
  const buffer = fs.readFileSync(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

/**
 * Check if file appears to be executable
 */
function isExecutableFile(filePath: string): boolean {
  try {
    const stats = fs.statSync(filePath);
    
    // Check file permissions (Unix-like systems)
    if (stats.mode & 0o111) {
      return true;
    }
    
    // Check file extension
    const extension = path.extname(filePath).toLowerCase();
    const executableExtensions = ['.exe', '.bat', '.cmd', '.com', '.scr', '.app', '.dmg'];
    if (executableExtensions.includes(extension)) {
      return true;
    }
    
    // Check file signature
    const buffer = fs.readFileSync(filePath);
    const hex = buffer.toString('hex').toLowerCase();
    
    // PE executable (Windows)
    if (hex.startsWith('4d5a')) return true;
    // ELF executable (Linux)
    if (hex.startsWith('7f454c46')) return true;
    // Mach-O executable (macOS)
    if (hex.startsWith('feedface') || hex.startsWith('feedfacf')) return true;
    
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Main file validation function
 */
export async function validateUploadedFile(
  filePath: string,
  originalName: string,
  mimeType: string,
  maxSizeBytes: number = 5 * 1024 * 1024 // 5MB default
): Promise<FileValidationResult> {
  
  const warnings: string[] = [];
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return {
        isValid: false,
        error: 'File non trovato'
      };
    }
    
    // Get file stats
    const stats = fs.statSync(filePath);
    
    // Check file size
    if (stats.size > maxSizeBytes) {
      return {
        isValid: false,
        error: `File troppo grande: ${stats.size} bytes (limite: ${maxSizeBytes} bytes)`
      };
    }
    
    if (stats.size === 0) {
      return {
        isValid: false,
        error: 'File vuoto'
      };
    }
    
    // Check dangerous extension
    if (isDangerousExtension(originalName)) {
      return {
        isValid: false,
        error: `Estensione file pericolosa: ${path.extname(originalName)}`
      };
    }
    
    // Detect real file type
    const realType = detectRealFileType(filePath);
    if (!realType) {
      return {
        isValid: false,
        error: 'Tipo di file non riconosciuto o non supportato'
      };
    }
    
    // Verify file signature matches claimed MIME type
    if (!validateFileSignature(filePath, mimeType)) {
      return {
        isValid: false,
        error: `Tipo di file non corrispondente: dichiarato ${mimeType}, rilevato ${realType || 'sconosciuto'}`
      };
    }
    
    // Check for executable content
    const isExecutable = isExecutableFile(filePath);
    if (isExecutable) {
      return {
        isValid: false,
        error: 'File eseguibile rilevato - non consentito per motivi di sicurezza'
      };
    }
    
    // Check for malicious content
    const hasMaliciousContent = containsMaliciousContent(filePath);
    if (hasMaliciousContent) {
      return {
        isValid: false,
        error: 'Contenuto potenzialmente pericoloso rilevato nel file'
      };
    }
    
    // Calculate file hash for integrity
    const fileHash = calculateFileHash(filePath);
    
    // Additional checks for images
    if (mimeType.startsWith('image/')) {
      // Check if image file is suspiciously large for its type
      if (mimeType === 'image/png' && stats.size > 10 * 1024 * 1024) {
        warnings.push('File PNG insolitamente grande');
      }
      
      if (mimeType === 'image/jpeg' && stats.size > 8 * 1024 * 1024) {
        warnings.push('File JPEG insolitamente grande');
      }
    }
    
    return {
      isValid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
      fileInfo: {
        realType,
        size: stats.size,
        hash: fileHash,
        isExecutable: false,
        containsSuspiciousContent: false
      }
    };
    
  } catch (error) {
    return {
      isValid: false,
      error: `Errore durante la validazione del file: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`
    };
  }
}

/**
 * Additional validation for ZIP files
 */
export async function validateZipFile(filePath: string): Promise<FileValidationResult> {
  const baseValidation = await validateUploadedFile(
    filePath,
    path.basename(filePath),
    'application/zip',
    50 * 1024 * 1024 // 50MB for ZIP files
  );
  
  if (!baseValidation.isValid) {
    return baseValidation;
  }
  
  // Additional ZIP-specific checks could be added here
  // For now, rely on the existing ZIP extraction security in routes.ts
  
  return baseValidation;
}

/**
 * Log security events for monitoring
 */
export function logSecurityEvent(event: string, details: any): void {
  console.warn('🔒 FILE SECURITY EVENT:', {
    event,
    details,
    timestamp: new Date().toISOString()
  });
}