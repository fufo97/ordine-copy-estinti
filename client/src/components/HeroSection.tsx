import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ParticleBackground from "./ParticleBackground";
import GlowingText from "./GlowingText";
import FloatingElements from "./FloatingElements";
import { EditableText } from "./EditableWrapper";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [textPhase, setTextPhase] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setTextPhase(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const heroTexts = [
    "ESTRAI TUTTO IL POTENZIALE DEI TUOI CONTATTI",
    "RISVEGLIA LE TUE LISTE CON STRATEGIA E PERSUASIONE", 
    "CHIRURGIA EMAIL MARKETING AVANZATA"
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-20"
             style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Particle Effects */}
      <ParticleBackground />
      <FloatingElements />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-10">
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

        {/* Professional Subtitle */}
        <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <EditableText contentKey="hero_question" className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Hai mai considerato <span className="font-bold text-yellow-300">quanto vale realmente</span> ogni contatto nella tua lista email?
            <br /><br />
            Ogni contatto in target delle tue liste possiede un <GlowingText className="text-yellow-400 font-black" glowColor="#FFD700">potenziale commerciale</GlowingText> che potrebbe generare un <span className="font-bold text-yellow-300">flusso costante di opportunità</span> attraverso una comunicazione strategica. 
            <br /><br />
            L'<span className="text-purple-400 font-bold">Ordine dei Copywriter Estinti</span> trasforma l'Email Marketing in uno <span className="font-bold text-yellow-300">strumento di crescita efficace</span> per il tuo business.
          </EditableText>
        </div>

        {/* Highlighted Agency Statement */}
        <div className={`transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-80' : 'translate-y-100 opacity-10'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border-2 border-white/30 backdrop-blur-sm mb-12 max-w-6xl mx-auto bg-white/95">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-3xl opacity-95" />
            <div className="relative z-10 text-center">
              <EditableText contentKey="hero_agency_statement" className="italic text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black leading-tight text-gray-900">
                <span className="text-purple-600 font-black">La Prima Ed Unica Agenzia in Italia</span> Interamente Focalizzata sul <span className="text-red-600 font-black">Potenziamento del tuo Business </span> Attraverso <span className="text-purple-600 font-black">Il Solo Email Marketing</span>
              </EditableText>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => setLocation('/servizi')}
              className="group relative px-12 py-6 text-lg md:text-xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 border border-yellow-400/50"
            >
              <EditableText contentKey="hero_button_services" className="relative z-10">
                SCOPRI LA CHIRURGIA EMAIL
              </EditableText>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
            
            <button 
              onClick={() => setLocation('/diagnosi')}
              className="group relative px-12 py-6 text-lg md:text-xl font-bold text-white border-2 border-purple-500 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 bg-gradient-to-r from-purple-900/30 to-purple-800/30 backdrop-blur-sm"
            >
              <EditableText contentKey="hero_button_diagnosis" className="relative z-10">
                DIAGNOSI GRATUITA
              </EditableText>
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