import { useState, useEffect } from "react";
import { EditableText } from "./EditableWrapper";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const headlines = [
    "ORDINE DEI COPYWRITERS",
    "EMAIL MARKETING PROFESSIONALE", 
    "STRATEGIE VINCENTI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-yellow-900/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse">
              {headlines[currentIndex]}
            </span>
          </h1>
          
          <EditableText contentKey="hero_agency_statement" className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            I maestri del copywriting che trasformano le tue email in vere macchine da vendita
          </EditableText>

          <EditableText contentKey="hero_question" className="text-lg md:text-xl text-yellow-400 mb-12 font-semibold">
            Pronto a rivoluzionare il tuo business con l'email marketing?
          </EditableText>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30">
            <span className="relative z-10">
              <EditableText contentKey="hero_button_services">SCOPRI I SERVIZI</EditableText>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="group relative px-8 py-4 text-lg font-bold text-white border-2 border-purple-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
            <span className="relative z-10">
              <EditableText contentKey="hero_button_diagnosis">DIAGNOSI GRATUITA</EditableText>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </section>
  );
}