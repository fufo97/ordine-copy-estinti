import { useState, useEffect, useRef } from "react";
import MorphingCard from "./MorphingCard";
import GlowingText from "./GlowingText";
import TabletFrame from "./TabletFrame";
import { EditableText } from "./EditableWrapper";

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

  const typewriterText = `Caro Imprenditore e Cara Imprenditrice, prova a pensarci bene:\n\nPer un problema al ginocchio, ti affidi ad un ortopedico, o a un tuttologo?\n\nMolto bene… Nella comunicazione vale esattamente lo stesso principio.\n\nPer massimizzare il tuo ritorno d'investimento e trasformare le tue liste in vere e proprie miniere d'oro personali…\n\n …l'Email Marketing, (ossia lo strumento più rapido, economico e potente che potresti mai utilizzare per comunicare quotidianamente) necessita di un 'medico' specializzato.\n\nEcco perché l'Ordine dei Copywriter Estinti NON è una semplice agenzia di comunicazione, ma una vera e propria élite di maestri nell'arte del coinvolgimento, dell’intrattenimento e della persuasione,\n\n…in grado di trasformare il tuo Email Marketing in un potente strumento di comunicazione capace di rafforzare il tuo legame con la community, nonché di canalizzare messaggi impattanti per condurre rapidamente gli utenti verso un’azione desiderata.\n\nInsomma, siamo gli “ortopedici” dell'Email Marketing:\n\nNoi analizziamo, eseguiamo diagnosi e mettiamo a punto con precisione chirurgica, strategie verticali di Email Marketing, con l’unico scopo di rendere le tue liste di contatti, flussi inesauribili di conversione.`;

  return (
    <section className="relative py-12 overflow-hidden">
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
              <EditableText contentKey="philosophy_title" className="responsive-section-title font-black text-white mb-4">
                <GlowingText 
                  glowColor="#C4A76D"
                  intensity="high"
                  animated
                >
                  La Nostra Filosofia
                </GlowingText>
              </EditableText>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-8" />
              <EditableText contentKey="philosophy_description" className="responsive-body-text text-gray-300 max-w-3xl mx-auto mb-12">
                Scopri perché siamo gli unici specialisti che possono trasformare 
                il tuo Email Marketing in una vera <span className="text-yellow-400 font-bold">macchina da guerra commerciale</span>
              </EditableText>
            </div>

            <TabletFrame 
              text={typewriterText}
              isVisible={visibleSections.includes(0)}
              className="transform hover:scale-105 transition-transform duration-500"
            />

            <div className="text-center mt-12">
              <EditableText contentKey="philosophy_quote" className="responsive-card-text text-gray-400 italic max-w-2xl mx-auto">
                "Ogni parola è studiata con precisione chirurgica per trasformare 
                i tuoi contatti in clienti fedeli e profittevoli"
              </EditableText>
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
              <EditableText contentKey="snobbare_title" className="responsive-section-title font-black mb-8">
                <GlowingText 
                  className="text-gray-800"
                  glowColor="#C4A76D"
                  intensity="medium"
                >
                  ECCO QUANTO TI COSTA IGNORARE L'EMAIL MARKETING
                </GlowingText>
              </EditableText>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Problem Side */}
              <MorphingCard className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-l-8 border-red-500 h-96">
                <h3 className="responsive-subtitle font-bold text-red-700 mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <EditableText contentKey="problem_card_title" className="font-bold text-red-700">Il rischio di "snobbare" l'Email Marketing</EditableText>
                </h3>
                <div className="h-64 overflow-y-auto pr-2 space-y-4">
                  <EditableText contentKey="problem_card_desc1" className="responsive-card-text text-gray-800 leading-relaxed">
                    Perché ignorare l'Email Marketing equivale letteralmente a <span className="font-bold text-red-600">bruciare denaro contante</span> davanti ai tuoi occhi?
                  </EditableText>
                  <EditableText contentKey="problem_card_desc2" className="responsive-card-text text-gray-800 leading-relaxed">
                    Ogni contatto inattivo nella tua lista rappresenta un potenziale cliente che sta scivolando silenziosamente verso i tuoi concorrenti – portando con sé profitti che avrebbero potuto essere tuoi.
                  </EditableText>
                  <EditableText contentKey="problem_card_desc3" className="responsive-card-text text-gray-800 leading-relaxed">
                    Le email sporadiche e generiche non sono sufficienti in un'era digitale sovraccarica di messaggi. È come sussurrare in un concerto rock e aspettarsi di essere sentiti.
                  </EditableText>
                  <EditableText contentKey="problem_card_desc4" className="responsive-card-text text-gray-800 leading-relaxed">
                    I tuoi contatti sono un patrimonio prezioso che si deprezza ogni giorno senza una comunicazione costante, strategica e personale.
                  </EditableText>
                </div>
              </MorphingCard>

              {/* Solution Side */}
              <MorphingCard className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border-l-8 border-emerald-500 h-96">
                <h3 className="responsive-subtitle font-bold text-emerald-700 mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <EditableText contentKey="solution_card_title" className="font-bold text-emerald-700">La Nostra Soluzione</EditableText>
                </h3>
                <div className="h-64 overflow-y-auto pr-2 space-y-4">
                  <EditableText contentKey="solution_card_desc1" className="responsive-card-text text-gray-800 leading-relaxed">
                    L'<span className="font-bold text-emerald-600">Ordine dei Copywriter Estinti</span> trasforma le tue liste di contatti in veri e propri asset produttivi attraverso il nostro metodo esclusivo di <span className="font-bold text-purple-600">"Chirurgia Email"</span> in tre fasi: diagnosi approfondita, strategia di riattivazione personalizzata e implementazione quotidiana.
                  </EditableText>
                  <EditableText contentKey="solution_card_desc2" className="responsive-card-text text-gray-800 leading-relaxed">
                    Non siamo generalisti, ma <span className="font-bold text-emerald-600">specialisti verticali</span> che applicano una precisione chirurgica ad ogni campagna, creando email artigianali scritte a mano che parlano direttamente al cuore e alla mente dei tuoi contatti.
                  </EditableText>
                  <EditableText contentKey="solution_card_desc3" className="responsive-card-text text-gray-800 leading-relaxed">
                    Le tue newsletter diventano il canale più diretto e immediato per entrare nella mente dei tuoi potenziali clienti – senza filtri e senza interferenze, atterrando direttamente sullo schermo del loro telefono.
                  </EditableText>
                  <EditableText contentKey="solution_card_desc4" className="responsive-card-text text-gray-800 leading-relaxed">
                    Questo approccio meticoloso crea lo strumento più economico ma al contempo più chirurgico e intimo per comunicare, intrattenere e persuadere un contatto giorno dopo giorno, trasformandolo gradualmente in un cliente entusiasta e fedele.
                  </EditableText>
                </div>
              </MorphingCard>
            </div>
          </MorphingCard>
        </div>

        {/* Section 3: Newsletter Power */}
        <div 
          ref={(el) => sectionRefs.current[2] = el}
          data-section="2"
          className={`mb-6 transition-all duration-1500 ${
            visibleSections.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <MorphingCard className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-12 border border-yellow-400/30">
            <div className="text-center mb-12">
              <EditableText contentKey="newsletter_power_title" className="responsive-section-title font-black text-white mb-6">
                <GlowingText 
                  glowColor="#FFD700"
                  intensity="high"
                  animated
                >
                  Il Potere delle Newsletter
                </GlowingText>
              </EditableText>
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
                  <EditableText contentKey={`newsletter_card_title_${index}`} className="responsive-subtitle font-bold mb-4 text-center">{item.title}</EditableText>
                  <EditableText contentKey={`newsletter_card_content_${index}`} className="responsive-card-text leading-relaxed text-center opacity-90">{item.content}</EditableText>
                </MorphingCard>
              ))}
            </div>
          </MorphingCard>
        </div>
      </div>
    </section>
  );
}