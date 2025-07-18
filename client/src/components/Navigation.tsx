import { useState } from "react";
import { Link, useLocation } from "wouter";
import { EditableText } from "./EditableWrapper";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
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
            <Link href="/">
              <EditableText 
                contentKey="nav_title" 
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
                ORDINE DEI COPYWRITER ESTINTI
              </EditableText>
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
              <Link href="/">
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive('/') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive('/') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive('/') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/')) {
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
              <Link href="/diagnosi">
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive('/diagnosi') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive('/diagnosi') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive('/diagnosi') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/diagnosi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/diagnosi')) {
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
              <Link href="/servizi">
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive('/servizi') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive('/servizi') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive('/servizi') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/servizi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/servizi')) {
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
              <Link href="/contatti">
                <span 
                  className="block px-6 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer rounded-xl relative overflow-hidden group"
                  style={{ 
                    color: isActive('/contatti') ? '#ffd700' : '#ffffff',
                    backgroundColor: isActive('/contatti') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    border: isActive('/contatti') ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid transparent',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/contatti')) {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px) scale(1.02)';
                      (e.target as HTMLElement).style.color = '#ffd700';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/contatti')) {
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
