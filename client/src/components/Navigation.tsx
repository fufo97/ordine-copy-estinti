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
                <a className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 ${isActive('/') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Home
                </a>
              </Link>
              <Link href="/diagnosi">
                <a className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 ${isActive('/diagnosi') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Diagnosi Chirurgica
                </a>
              </Link>
              <Link href="/servizi">
                <a className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 ${isActive('/servizi') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Servizi
                </a>
              </Link>
              <Link href="/contatti">
                <a className={`nav-link text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 font-medium px-3 py-2 ${isActive('/contatti') ? 'text-[hsl(47,85%,55%)]' : ''}`}>
                  Contatti
                </a>
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
                <a 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 ${isActive('/') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
              </Link>
              <Link href="/diagnosi">
                <a 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 ${isActive('/diagnosi') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diagnosi Chirurgica
                </a>
              </Link>
              <Link href="/servizi">
                <a 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 ${isActive('/servizi') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servizi
                </a>
              </Link>
              <Link href="/contatti">
                <a 
                  className={`block px-3 py-2 text-white hover:text-[hsl(47,85%,55%)] transition-colors duration-300 ${isActive('/contatti') ? 'text-[hsl(47,85%,55%)]' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contatti
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
