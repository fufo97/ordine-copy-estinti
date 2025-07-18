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
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b glass-effect shadow-lg" 
         style={{ 
           background: 'linear-gradient(135deg, hsl(0, 0%, 11%, 0.95) 0%, hsl(0, 0%, 25%, 0.9) 100%)',
           borderBottomColor: 'hsl(42, 36%, 56%, 0.4)',
           borderBottomWidth: '2px'
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Hamburger menu button - Always on left */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none transition-all duration-300 p-2 rounded-lg nav-link relative overflow-hidden group ${isMobileMenuOpen ? 'hamburger-open' : ''}`}
              style={{ color: 'hsl(0, 0%, 96%)' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'hsl(42, 36%, 56%)';
                (e.target as HTMLElement).style.backgroundColor = 'hsla(42, 36%, 56%, 0.1)';
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'hsl(0, 0%, 96%)';
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when menu is closed
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Agency Name - Always centered */}
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <EditableText 
                contentKey="nav_title" 
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity text-center" 
                style={{ 
                  fontFamily: 'MedievalSharp, serif',
                  color: 'hsl(0, 0%, 96%)'
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
          <div className="border-t glass-effect shadow-lg menu-slide-enter" 
               style={{ 
                 background: 'linear-gradient(135deg, hsl(0, 0%, 11%, 0.98) 0%, hsl(0, 0%, 25%, 0.95) 100%)',
                 borderTopColor: 'hsl(42, 36%, 56%, 0.5)',
                 borderTopWidth: '2px'
               }}>
            <div className="px-2 py-4 space-y-2">
              <Link href="/">
                <span 
                  className="block px-6 py-4 text-lg transition-all duration-300 cursor-pointer rounded-lg nav-link relative overflow-hidden group"
                  style={{ 
                    color: isActive('/') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)',
                    backgroundColor: isActive('/') ? 'hsla(42, 36%, 56%, 0.1)' : 'transparent',
                    border: isActive('/') ? '1px solid hsl(42, 36%, 56%, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/')) {
                      (e.target as HTMLElement).style.backgroundColor = 'hsla(42, 36%, 56%, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'hsl(42, 36%, 56%, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_home">Home</EditableText>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              <Link href="/diagnosi">
                <span 
                  className="block px-6 py-4 text-lg transition-all duration-300 cursor-pointer rounded-lg nav-link relative overflow-hidden group"
                  style={{ 
                    color: isActive('/diagnosi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)',
                    backgroundColor: isActive('/diagnosi') ? 'hsla(42, 36%, 56%, 0.1)' : 'transparent',
                    border: isActive('/diagnosi') ? '1px solid hsl(42, 36%, 56%, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/diagnosi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'hsla(42, 36%, 56%, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'hsl(42, 36%, 56%, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/diagnosi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_diagnosi">Diagnosi Chirurgica</EditableText>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              <Link href="/servizi">
                <span 
                  className="block px-6 py-4 text-lg transition-all duration-300 cursor-pointer rounded-lg nav-link relative overflow-hidden group"
                  style={{ 
                    color: isActive('/servizi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)',
                    backgroundColor: isActive('/servizi') ? 'hsla(42, 36%, 56%, 0.1)' : 'transparent',
                    border: isActive('/servizi') ? '1px solid hsl(42, 36%, 56%, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/servizi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'hsla(42, 36%, 56%, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'hsl(42, 36%, 56%, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/servizi')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_servizi">Servizi</EditableText>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
              <Link href="/contatti">
                <span 
                  className="block px-6 py-4 text-lg transition-all duration-300 cursor-pointer rounded-lg nav-link relative overflow-hidden group"
                  style={{ 
                    color: isActive('/contatti') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)',
                    backgroundColor: isActive('/contatti') ? 'hsla(42, 36%, 56%, 0.1)' : 'transparent',
                    border: isActive('/contatti') ? '1px solid hsl(42, 36%, 56%, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive('/contatti')) {
                      (e.target as HTMLElement).style.backgroundColor = 'hsla(42, 36%, 56%, 0.1)';
                      (e.target as HTMLElement).style.borderColor = 'hsl(42, 36%, 56%, 0.3)';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive('/contatti')) {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.borderColor = 'transparent';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <EditableText contentKey="nav_contatti">Contatti</EditableText>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
