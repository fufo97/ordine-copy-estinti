import { useState, useEffect, useRef } from "react";
import MorphingCard from "./MorphingCard";
import GlowingText from "./GlowingText";
import TabletFrame from "./TabletFrame";

export default function ProfessionalContentSection() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [isTypewriterVisible, setIsTypewriterVisible] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-section') || '0');
          if (entry.isIntersecting) {
            setVisibleSections(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
            if (index === 1) {
              setTimeout(() => setIsTypewriterVisible(true), 500);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const typewriterText = `Caro Imprenditore e Cara Imprenditrice, prova a pensarci bene:

Per un problema al ginocchio, ti affidi ad un ortopedico, o a un tuttologo?

Molto bene… Nella comunicazione vale esattamente lo stesso principio.

Per massimizzare il tuo ritorno d'investimento e trasformare le tue liste in vere e proprie miniere d'oro personali…

…l'Email Marketing, (ossia lo strumento più rapido, economico e potente che potresti mai utilizzare per comunicare quotidianamente) necessita di un 'medico' specializzato.

Ecco perché l'Ordine dei Copywriter Estinti NON è una semplice agenzia di comunicazione, ma una vera e propria élite di maestri nell'arte del coinvolgimento, dell'intrattenimento e della persuasione,

…in grado di trasformare il tuo Email Marketing in un potente strumento di comunicazione capace di rafforzare il tuo legame con la community, nonché di canalizzare messaggi impattanti per condurre rapidamente gli utenti verso un'azione desiderata.

Insomma, siamo gli "ortopedici" dell'Email Marketing:

Noi analizziamo, eseguiamo diagnosi e mettiamo a punto con precisione chirurgica, strategie verticali di Email Marketing, con l'unico scopo di rendere le tue liste di contatti, flussi inesauribili di conversione.`;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #C4A76D 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
              animation: 'float 10s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section 1: Tablet with Typewriter (La Nostra Filosofia) */}
        <div 
          ref={(el) => sectionRefs.current[0] = el}
          data-section="0"
          className={`mb-20 transition-all duration-1500 ${
            visibleSections.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <MorphingCard className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-12 border border-yellow-400/30">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                <GlowingText 
                  glowColor="#C4A76D"
                  intensity="high"
                  animated
                >
                  La Nostra Filosofia
                </GlowingText>
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-8" />
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Scopri perché siamo gli unici specialisti che possono trasformare 
                il tuo Email Marketing in una vera <span className="text-yellow-400 font-bold">macchina da guerra commerciale</span>
              </p>
            </div>
            
            <TabletFrame 
              text={typewriterText}
              isVisible={visibleSections.includes(0)}
              className="transform hover:scale-105 transition-transform duration-500"
            />
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-400 italic max-w-2xl mx-auto">
                "Ogni parola è studiata con precisione chirurgica per trasformare 
                i tuoi contatti in clienti fedeli e profittevoli"
              </p>
            </div>
          </MorphingCard>
        </div>

        {/* Section 2: Main Question (Perché "snobbare") */}
        <div 
          ref={(el) => sectionRefs.current[1] = el}
          data-section="1"
          className={`mb-20 transition-all duration-1000 ${
            visibleSections.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <MorphingCard className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 border-4 border-yellow-400/30">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-black mb-8">
                <GlowingText 
                  className="text-gray-800"
                  glowColor="#C4A76D"
                  intensity="medium"
                >
                  Perché{" "}
                  <span className="text-purple-600 italic">"snobbare"</span>{" "}
                  l'Email Marketing?
                </GlowingText>
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Problem Side */}
              <MorphingCard className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-l-8 border-red-500 h-96">
                <h3 className="text-3xl font-bold text-red-700 mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Il Rischio dello "Snobbare"
                </h3>
                <div className="h-64 overflow-y-auto pr-2 space-y-4">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Perché <span className="font-bold text-red-600">"snobbare"</span> l'Email Marketing equivale letteralmente a 
                    <span className="font-bold text-purple-600 italic"> gettare nel fuoco</span> una quantità 
                    <span className="font-bold text-red-600"> mostruosa</span> di conversioni?
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Per un problema al ginocchio, ti affidi ad un ortopedico, o a un tuttologo? 
                    Nella comunicazione vale esattamente lo stesso principio.
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    L'Email Marketing necessita di un <span className="font-bold text-purple-600">'medico' specializzato</span> 
                    per trasformare le tue liste in vere miniere d'oro.
                  </p>
                </div>
              </MorphingCard>

              {/* Solution Side */}
              <MorphingCard className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border-l-8 border-emerald-500 h-96">
                <h3 className="text-3xl font-bold text-emerald-700 mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  La Nostra Soluzione
                </h3>
                <div className="h-64 overflow-y-auto pr-2 space-y-4">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    L'<span className="font-bold text-emerald-600">Ordine dei Copywriter Estinti</span> NON è una semplice agenzia 
                    di comunicazione, ma una vera <span className="font-bold text-purple-600">élite di maestri</span> nell'arte del 
                    coinvolgimento e della persuasione.
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Siamo gli <span className="font-bold text-emerald-600">"ortopedici"</span> dell'Email Marketing: 
                    analizziamo, eseguiamo diagnosi e mettiamo a punto con 
                    <span className="font-bold text-purple-600"> precisione chirurgica</span> strategie verticali.
                  </p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Il nostro unico scopo: rendere le tue liste di contatti 
                    <span className="font-bold text-emerald-600"> flussi inesauribili di conversione</span>.
                  </p>
                </div>
              </MorphingCard>
            </div>
          </MorphingCard>
        </div>

        {/* Section 3: Newsletter Power */}
        <div 
          ref={(el) => sectionRefs.current[2] = el}
          data-section="2"
          className={`mb-20 transition-all duration-1500 ${
            visibleSections.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <MorphingCard className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-12 border border-yellow-400/30">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                <GlowingText 
                  glowColor="#FFD700"
                  intensity="high"
                  animated
                >
                  Il Potere delle Newsletter
                </GlowingText>
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Canale Diretto",
                  content: "Le Newsletter rappresentano l'UNICO canale diretto e fulmineo per aumentare la consapevolezza dei tuoi utenti.",
                  color: "from-blue-600 to-cyan-600",
                  icon: "📧"
                },
                {
                  title: "Massima Incisività", 
                  content: "Lo strumento più incisivo per comparire senza filtri sullo schermo del telefono del tuo utente.",
                  color: "from-purple-600 to-pink-600",
                  icon: "🎯"
                },
                {
                  title: "Persuasione Chirurgica",
                  content: "Il mezzo più economico ma chirurgico per comunicare, intrattenere, conquistare e persuadere.",
                  color: "from-emerald-600 to-teal-600", 
                  icon: "⚡"
                }
              ].map((item, index) => (
                <MorphingCard 
                  key={index}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 text-white h-80`}
                  glowColor="#FFD700"
                >
                  <div className="text-6xl mb-6 text-center">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-center opacity-90">{item.content}</p>
                </MorphingCard>
              ))}
            </div>
          </MorphingCard>
        </div>
      </div>
    </section>
  );
}