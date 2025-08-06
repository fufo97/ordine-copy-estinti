import { useState } from "react";
import { Link, useLocation } from "wouter";
import { EditableText } from "./EditableWrapper";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Check if we're in admin mode
  const isAdminMode = location.startsWith('/admin');

  const isActive = (path: string) => {
    if (path === '/blog' || path === '/admin/blog') {
      return location === path || location.startsWith(path + '/');
    }
    return location === path;
  };

  const getAdminSession = () => {
    const sessionData = localStorage.getItem('adminSession');
    if (!sessionData) return null;
    
    try {
      const session = JSON.parse(sessionData);
      if (new Date(session.expiresAt) > new Date()) {
        return session;
      } else {
        localStorage.removeItem('adminSession');
        return null;
      }
    } catch {
      localStorage.removeItem('adminSession');
      return null;
    }
  };

  const handleExitAdminMode = () => {
    // Extract the current path without /admin prefix
    const currentPath = location.replace('/admin', '') || '/';
    window.location.href = currentPath;
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm border-b shadow-2xl" 
         style={{ 
           background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(30, 30, 30, 0.92) 50%, rgba(75, 0, 130, 0.1) 100%)',
           borderBottomColor: 'rgba(255, 215, 0, 0.3)',
           borderBottomWidth: '1px',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)'
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Hamburger menu button - Always on left */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none transition-all duration-300 p-3 rounded-lg relative overflow-hidden group hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-yellow-600/10"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#ffd700';
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#ffffff';
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when menu is closed
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Agency Name - Always centered */}
          <div className="flex-1 flex justify-center">
            <Link href={isAdminMode ? "/admin/home" : "/"}>
              <div
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight cursor-pointer transition-all duration-300 text-center" 
                style={{ 
                  fontFamily: 'MedievalSharp, serif',
                  color: '#ffffff',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#ffd700';
                  (e.target as HTMLElement).style.textShadow = '0 0 30px rgba(255, 215, 0, 0.6)';
                  (e.target as HTMLElement).style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#ffffff';
                  (e.target as HTMLElement).style.textShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                <EditableText contentKey="nav_title">
                  ORDINE DEI COPYWRITER ESTINTI
                </EditableText>
              </div>
            </Link>
          </div>
          
          {/* Right side spacer to balance the hamburger menu */}
          <div className="flex-shrink-0 w-10"></div>
        </div>
        
        {/* Navigation Menu - Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t shadow-2xl menu-slide-enter" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(20, 20, 20, 0.95) 50%, rgba(75, 0, 130, 0.1) 100%)',
                 borderTopColor: 'rgba(255, 215, 0, 0.4)',
                 borderTopWidth: '1px',
                 backdropFilter: 'blur(20px)'
               }}>
            <div className="px-4 py-6 space-y-1">
              {/* Exit Admin Mode Button - Only visible in admin mode */}
              {isAdminMode && getAdminSession() && (
                <button 
                  onClick={handleExitAdminMode}
                  className="w-full block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group border border-red-500/30 bg-red-500/10 mb-4"
                  style={{ 
                    color: '#ff6b6b',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(255, 107, 107, 0.5)';
                    (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                  }}
                >
                  🚪 Esci dalla modalità admin
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/5 via-red-500/10 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
              
              <Link href={isAdminMode ? "/admin/home" : "/"}>
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive(isAdminMode ? '/admin/home' : '/') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive(isAdminMode ? '/admin/home' : '/') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive(isAdminMode ? '/admin/home' : '/') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(isAdminMode ? '/admin/home' : '/')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(isAdminMode ? '/admin/home' : '/')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                      (e.target as HTMLElement).style.color = '#ffffff';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_home">Home</EditableText>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              <Link href={isAdminMode ? "/admin/diagnosi" : "/diagnosi"}>
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive(isAdminMode ? '/admin/diagnosi' : '/diagnosi') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive(isAdminMode ? '/admin/diagnosi' : '/diagnosi') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive(isAdminMode ? '/admin/diagnosi' : '/diagnosi') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(isAdminMode ? '/admin/diagnosi' : '/diagnosi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(isAdminMode ? '/admin/diagnosi' : '/diagnosi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                      (e.target as HTMLElement).style.color = '#ffffff';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_diagnosi">Diagnosi Chirurgica</EditableText>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              <Link href={isAdminMode ? "/admin/servizi" : "/servizi"}>
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive(isAdminMode ? '/admin/servizi' : '/servizi') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive(isAdminMode ? '/admin/servizi' : '/servizi') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive(isAdminMode ? '/admin/servizi' : '/servizi') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(isAdminMode ? '/admin/servizi' : '/servizi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(isAdminMode ? '/admin/servizi' : '/servizi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                      (e.target as HTMLElement).style.color = '#ffffff';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_servizi">Servizi</EditableText>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              <Link href={isAdminMode ? "/admin/contatti" : "/contatti"}>
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive(isAdminMode ? '/admin/contatti' : '/contatti') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive(isAdminMode ? '/admin/contatti' : '/contatti') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive(isAdminMode ? '/admin/contatti' : '/contatti') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(isAdminMode ? '/admin/contatti' : '/contatti')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(isAdminMode ? '/admin/contatti' : '/contatti')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                      (e.target as HTMLElement).style.color = '#ffffff';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_contatti">Contatti</EditableText>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              {/* Blog link - different for admin and public */}
              {isAdminMode ? (
                <Link href="/admin/blog">
                  <span 
                    className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                    style={{ 
                      color: isActive('/admin/blog') ? '#ffd700' : '#ffffff',
                      backgroundColor: isActive('/admin/blog') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                      border: isActive('/admin/blog') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/admin/blog')) {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                        (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                        (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                        (e.target as HTMLElement).style.color = '#ffd700';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/admin/blog')) {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.borderColor = 'transparent';
                        (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                        (e.target as HTMLElement).style.color = '#ffffff';
                      }
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <EditableText contentKey="nav_blog_admin">📝 Gestisci Blog</EditableText>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </span>
                </Link>
              ) : (
                <Link href="/blog">
                  <span 
                    className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                    style={{ 
                      color: isActive('/blog') ? '#ffd700' : '#ffffff',
                      backgroundColor: isActive('/blog') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                      border: isActive('/blog') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/blog')) {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                        (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                        (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                        (e.target as HTMLElement).style.color = '#ffd700';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/blog')) {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.borderColor = 'transparent';
                        (e.target as HTMLElement).style.transform = 'translateX(0) scale(1)';
                        (e.target as HTMLElement).style.color = '#ffffff';
                      }
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <EditableText contentKey="nav_blog">Blog</EditableText>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/5 via-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
