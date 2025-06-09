import { useState, useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import GlowingText from "./GlowingText";
import FloatingElements from "./FloatingElements";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setTextPhase(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const heroTexts = [
    "RIVOLUZIONA IL TUO EMAIL MARKETING",
    "TRASFORMA I LEAD IN ORO LIQUIDO", 
    "CONQUISTA LA MENTE DEI TUOI CLIENTI"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      {/* Particle Effects */}
      <ParticleBackground />
      <FloatingElements />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196, 167, 109, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196, 167, 109, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title with Morphing Effect */}
        <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h1 className="responsive-hero-title font-black mb-8 leading-tight">
            <GlowingText 
              className="block text-white"
              glowColor="#C4A76D"
              intensity="high"
              animated
            >
              {heroTexts[textPhase]}
            </GlowingText>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="responsive-subtitle text-gray-300 mb-12 font-light max-w-4xl mx-auto leading-relaxed">
            L'<span className="text-purple-400 font-semibold">Ordine dei Copywriter Estinti</span> - 
            Gli unici specialisti in Italia che trasformano l'Email Marketing in una 
            <GlowingText className="text-yellow-400 font-bold" glowColor="#FFD700">
              macchina da guerra commerciale
            </GlowingText>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`transform transition-all duration-1500 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-12 py-6 responsive-button-text font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <span className="relative z-10">SCOPRI I NOSTRI SERVIZI</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
            
            <button className="group relative px-12 py-6 responsive-button-text font-bold text-white border-2 border-purple-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10">DIAGNOSI GRATUITA</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </div>


      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-25 animate-pulse delay-500" />
    </section>
  );
}