import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm border-b" 
         style={{ 
           backgroundColor: 'hsl(0, 0%, 11%, 0.95)', 
           borderBottomColor: 'hsl(42, 36%, 56%, 0.2)' 
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button - Left side */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none transition-colors duration-300"
              style={{ color: 'hsl(0, 0%, 96%)' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'hsl(42, 36%, 56%)'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'hsl(0, 0%, 96%)'}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Agency Name - Center */}
          <div className="flex-1 flex justify-center md:justify-center">
            <Link href="/">
              <h1 className="responsive-nav-text font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity" 
                  style={{ 
                    fontFamily: 'MedievalSharp, serif',
                    color: 'hsl(0, 0%, 96%)'
                  }}>
                ORDINE DEI COPYWRITER ESTINTI
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-baseline space-x-8">
            <Link href="/">
              <span className="nav-link transition-colors duration-300 font-medium px-3 py-2 cursor-pointer"
                    style={{ 
                      color: isActive('/') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'hsl(42, 36%, 56%)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = isActive('/') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'}>
                Home
              </span>
            </Link>
            <Link href="/diagnosi">
              <span className="nav-link transition-colors duration-300 font-medium px-3 py-2 cursor-pointer"
                    style={{ 
                      color: isActive('/diagnosi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'hsl(42, 36%, 56%)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = isActive('/diagnosi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'}>
                Diagnosi Chirurgica
              </span>
            </Link>
            <Link href="/servizi">
              <span className="nav-link transition-colors duration-300 font-medium px-3 py-2 cursor-pointer"
                    style={{ 
                      color: isActive('/servizi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'hsl(42, 36%, 56%)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = isActive('/servizi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'}>
                Servizi
              </span>
            </Link>
            <Link href="/contatti">
              <span className="nav-link transition-colors duration-300 font-medium px-3 py-2 cursor-pointer"
                    style={{ 
                      color: isActive('/contatti') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'hsl(42, 36%, 56%)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = isActive('/contatti') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'}>
                Contatti
              </span>
            </Link>
          </div>
          
          {/* Right side spacer for mobile */}
          <div className="md:hidden w-6"></div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t" 
               style={{ 
                 backgroundColor: 'hsl(0, 0%, 11%)', 
                 borderTopColor: 'hsl(42, 36%, 56%, 0.2)' 
               }}>
            <div className="px-2 py-3 space-y-1">
              <Link href="/">
                <span 
                  className="block px-3 py-2 transition-colors duration-300 cursor-pointer"
                  style={{ 
                    color: isActive('/') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </span>
              </Link>
              <Link href="/diagnosi">
                <span 
                  className="block px-3 py-2 transition-colors duration-300 cursor-pointer"
                  style={{ 
                    color: isActive('/diagnosi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diagnosi Chirurgica
                </span>
              </Link>
              <Link href="/servizi">
                <span 
                  className="block px-3 py-2 transition-colors duration-300 cursor-pointer"
                  style={{ 
                    color: isActive('/servizi') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servizi
                </span>
              </Link>
              <Link href="/contatti">
                <span 
                  className="block px-3 py-2 transition-colors duration-300 cursor-pointer"
                  style={{ 
                    color: isActive('/contatti') ? 'hsl(42, 36%, 56%)' : 'hsl(0, 0%, 96%)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contatti
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
