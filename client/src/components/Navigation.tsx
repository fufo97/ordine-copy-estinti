import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgb(28,28,28)]/95 backdrop-blur-sm border-b border-[rgb(196,167,109)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button - Left side */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[rgb(196,167,109)] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Agency Name - Center */}
          <div className="flex-1 flex justify-center md:justify-center">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight cursor-pointer hover:opacity-80 transition-opacity" style={{ fontFamily: 'MedievalSharp, serif' }}>
                ORDINE DEI COPYWRITER ESTINTI
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-baseline space-x-8">
            <Link href="/">
              <span className={`nav-link text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/') ? 'text-[rgb(196,167,109)]' : ''}`}>
                Home
              </span>
            </Link>
            <Link href="/diagnosi">
              <span className={`nav-link text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/diagnosi') ? 'text-[rgb(196,167,109)]' : ''}`}>
                Diagnosi Chirurgica
              </span>
            </Link>
            <Link href="/servizi">
              <span className={`nav-link text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/servizi') ? 'text-[rgb(196,167,109)]' : ''}`}>
                Servizi
              </span>
            </Link>
            <Link href="/contatti">
              <span className={`nav-link text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/contatti') ? 'text-[rgb(196,167,109)]' : ''}`}>
                Contatti
              </span>
            </Link>
          </div>
          
          {/* Right side spacer for mobile */}
          <div className="md:hidden w-6"></div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[rgb(28,28,28)] border-t border-[rgb(196,167,109)]/20">
            <div className="px-2 py-3 space-y-1">
              <Link href="/">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 cursor-pointer ${isActive('/') ? 'text-[rgb(196,167,109)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </span>
              </Link>
              <Link href="/diagnosi">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 cursor-pointer ${isActive('/diagnosi') ? 'text-[rgb(196,167,109)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diagnosi Chirurgica
                </span>
              </Link>
              <Link href="/servizi">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 cursor-pointer ${isActive('/servizi') ? 'text-[rgb(196,167,109)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servizi
                </span>
              </Link>
              <Link href="/contatti">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[rgb(196,167,109)] transition-colors duration-300 cursor-pointer ${isActive('/contatti') ? 'text-[rgb(196,167,109)]' : ''}`}
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
