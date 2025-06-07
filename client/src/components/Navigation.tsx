import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[hsl(0,0%,6%)]/95 backdrop-blur-sm border-b border-[hsl(47,85%,55%)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold text-[hsl(47,85%,55%)] tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                ORDINE DEI COPYWRITER ESTINTI
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/">
                <span className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Home
                </span>
              </Link>
              <Link href="/diagnosi">
                <span className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/diagnosi') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Diagnosi Chirurgica
                </span>
              </Link>
              <Link href="/servizi">
                <span className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/servizi') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Servizi
                </span>
              </Link>
              <Link href="/contatti">
                <span className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 cursor-pointer ${isActive('/contatti') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Contatti
                </span>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[hsl(47,85%,55%)] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[hsl(0,0%,6%)] border-t border-[hsl(47,85%,55%)]/20">
            <div className="px-2 py-3 space-y-1">
              <Link href="/">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 cursor-pointer ${isActive('/') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </span>
              </Link>
              <Link href="/diagnosi">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 cursor-pointer ${isActive('/diagnosi') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diagnosi Chirurgica
                </span>
              </Link>
              <Link href="/servizi">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 cursor-pointer ${isActive('/servizi') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servizi
                </span>
              </Link>
              <Link href="/contatti">
                <span 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 cursor-pointer ${isActive('/contatti') ? 'text-[hsl(47,85%,55%)]' : ''}`}
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
