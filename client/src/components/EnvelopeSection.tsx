import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function EnvelopeSection() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const scrollElements = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 1.5;
      
      if (scrollY > triggerPoint && !isEnvelopeOpen) {
        setIsEnvelopeOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEnvelopeOpen]);

  return (
    <section className="py-20 bg-gradient-to-b from-[hsl(0,0%,10%)] to-[hsl(0,0%,18%)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated Envelope */}
        <div className="relative mb-16">
          <div className={`mx-auto w-64 h-40 relative transition-all duration-1000 ${isEnvelopeOpen ? 'scale-110' : 'scale-100'}`}>
            <div className="w-full h-full bg-gradient-to-br from-[hsl(47,85%,55%)] to-[hsl(47,85%,65%)] rounded-lg shadow-2xl relative overflow-hidden">
              <div className="absolute inset-2 bg-white rounded opacity-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              {/* Envelope opening animation */}
              <div className={`absolute top-0 left-0 w-full h-1/2 bg-[hsl(47,85%,55%)] transform-origin-bottom transition-transform duration-1000 ${isEnvelopeOpen ? 'rotate-x-180' : 'rotate-x-0'}`}
                   style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          {/* Section 1: Why Email Marketing */}
          <div ref={scrollElements} className="scroll-reveal bg-gradient-to-r from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20">
            <h3 className="text-3xl md:text-4xl font-bold text-[hsl(47,85%,55%)] mb-6">
              Perché "snobbare" l'Email Marketing?
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Perché "snobbare" l'Email Marketing equivale letteralmente a gettare nel fuoco una quantità mostruosa di conversioni (e quindi di profitti)?
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Oppure, all'opposto, come mai implementare campagne quotidiane di newsletter (e DEM) folgoranti e coinvolgenti può sprigionare l'autentico valore economico di ogni singolo contatto in target?
            </p>
          </div>

          {/* Section 2: Newsletter Power */}
          <div ref={scrollElements} className="scroll-reveal bg-gradient-to-l from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20">
            <h3 className="text-3xl md:text-4xl font-bold text-[hsl(47,85%,55%)] mb-6">
              Il Potere delle Newsletter
            </h3>
            <div className="space-y-4 text-lg md:text-xl text-gray-300 leading-relaxed">
              <p>Le Newsletter con un copy esplosivo e ammaliante rappresentano l'UNICO canale diretto e fulmineo per aumentare la consapevolezza dei tuoi utenti nei confronti del tuo prodotto/servizio.</p>
              <p>Pensa un attimo: oggi come oggi, le newsletter (se redatte e inviate seguendo regole precise) sono lo strumento più incisivo che hai per comparire senza filtri sullo schermo del telefono del tuo utente.</p>
              <p>Sono il mezzo più economico ma al contempo più chirurgico e intimo per comunicare, intrattenere, conquistare e persuadere un contatto giorno dopo giorno, con l'obiettivo di liberare tutto il suo potenziale economico.</p>
            </div>
          </div>

          {/* Section 3: The Real World */}
          <div ref={scrollElements} className="scroll-reveal bg-gradient-to-r from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20">
            <h3 className="text-3xl md:text-4xl font-bold text-[hsl(47,85%,55%)] mb-6">
              Facciamo un gioco:
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-semibold text-white mb-4">Nel "Mondo delle Favole"</h4>
                <p className="text-gray-300 leading-relaxed">
                  ogni lead che acquisci dovrebbe capire all'istante il valore del tuo prodotto/servizio più costoso, accettando con il sorriso la cifra che gli proponi.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-white mb-4">Nel "Mondo Reale"</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full"></div>
                    <span className="text-gray-300">Prestare Attenzione.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full"></div>
                    <span className="text-gray-300">Sviluppare Interesse.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full"></div>
                    <span className="text-gray-300">Desiderare ciò che proponi, acquisendo fiducia in te o nella tua attività.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full"></div>
                    <span className="text-gray-300">Infine, ovviamente, Agire.</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mt-6">
              Se pensi che un contatto svolga autonomamente questo percorso, senza che tu lo nutra costantemente... beh, lasciacelo dire: sei un povero illuso.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Ogni newsletter è in realtà un tassello che edifica la consapevolezza e il desiderio di risolvere un problema (o appagare un bisogno) tramite il tuo prodotto.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Ovviamente, a patto che ogni invio "parli" direttamente alla mente del tuo utente e sia inserito in una Strategia coerente e mirata. Altrimenti, fidati, il tuo pubblico si dileguerà.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4 font-semibold">
              E lo farà in un lampo.
            </p>
          </div>

          {/* Section 4: Customer Loyalty */}
          <div ref={scrollElements} className="scroll-reveal bg-gradient-to-l from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20">
            <h3 className="text-3xl md:text-4xl font-bold text-[hsl(47,85%,55%)] mb-6">
              Trasforma i tuoi clienti attuali in una schiera di fanatici pronti a pendere dalle tue labbra
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Perché le newsletter folgoranti e coinvolgenti non risvegliano solo il potenziale commerciale di una singola lead, ma moltiplicano quello di chi è già tuo cliente.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Tradotto: significa per te creare un gruppo di fedelissimi che, conoscendo la tua trama e i tuoi valori, non vedono l'ora di acquistare da te regolarmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
