import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-editorial-light-gray/30" 
         style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.95)' }}>
      <div className="container-elegant">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus-elegant text-editorial-black hover:text-sophisticated-coral transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Agency Name */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/">
              <h1 className="medieval-title text-xl md:text-2xl font-bold cursor-pointer text-editorial-black hover:text-sophisticated-coral elegant-transition">
                ORDINE DEI COPYWRITER ESTINTI
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className={`nav-elegant font-medium px-4 py-2 cursor-pointer elegant-transition ${
                isActive('/') ? 'text-sophisticated-coral' : 'text-editorial-black hover:text-sophisticated-coral'
              }`}>
                Home
              </span>
            </Link>
            <Link href="/diagnosi">
              <span className={`nav-elegant font-medium px-4 py-2 cursor-pointer elegant-transition ${
                isActive('/diagnosi') ? 'text-sophisticated-coral' : 'text-editorial-black hover:text-sophisticated-coral'
              }`}>
                Diagnosi Chirurgica
              </span>
            </Link>
            <Link href="/servizi">
              <span className={`nav-elegant font-medium px-4 py-2 cursor-pointer elegant-transition ${
                isActive('/servizi') ? 'text-sophisticated-coral' : 'text-editorial-black hover:text-sophisticated-coral'
              }`}>
                Servizi
              </span>
            </Link>
            <Link href="/contatti">
              <span className={`nav-elegant font-medium px-4 py-2 cursor-pointer elegant-transition ${
                isActive('/contatti') ? 'text-sophisticated-coral' : 'text-editorial-black hover:text-sophisticated-coral'
              }`}>
                Contatti
              </span>
            </Link>
          </div>
          
          {/* Mobile spacer */}
          <div className="md:hidden w-6"></div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-editorial-light-gray/30 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-4">
              <Link href="/">
                <span 
                  className={`block px-4 py-3 rounded-lg font-medium cursor-pointer elegant-transition ${
                    isActive('/') ? 'text-sophisticated-coral bg-sophisticated-coral/10' : 'text-editorial-black hover:text-sophisticated-coral hover:bg-sophisticated-coral/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </span>
              </Link>
              <Link href="/diagnosi">
                <span 
                  className={`block px-4 py-3 rounded-lg font-medium cursor-pointer elegant-transition ${
                    isActive('/diagnosi') ? 'text-sophisticated-coral bg-sophisticated-coral/10' : 'text-editorial-black hover:text-sophisticated-coral hover:bg-sophisticated-coral/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diagnosi Chirurgica
                </span>
              </Link>
              <Link href="/servizi">
                <span 
                  className={`block px-4 py-3 rounded-lg font-medium cursor-pointer elegant-transition ${
                    isActive('/servizi') ? 'text-sophisticated-coral bg-sophisticated-coral/10' : 'text-editorial-black hover:text-sophisticated-coral hover:bg-sophisticated-coral/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servizi
                </span>
              </Link>
              <Link href="/contatti">
                <span 
                  className={`block px-4 py-3 rounded-lg font-medium cursor-pointer elegant-transition ${
                    isActive('/contatti') ? 'text-sophisticated-coral bg-sophisticated-coral/10' : 'text-editorial-black hover:text-sophisticated-coral hover:bg-sophisticated-coral/5'
                  }`}
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
