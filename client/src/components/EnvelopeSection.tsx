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
    <section className="py-20 relative overflow-hidden"
             style={{ 
               background: `linear-gradient(to bottom, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 11%) 100%)` 
             }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Animated Envelope */}
        <div className="relative mb-16">
          <div className={`mx-auto w-64 h-40 relative transition-all duration-1000 ${isEnvelopeOpen ? 'scale-110' : 'scale-100'}`}>
            <div className="w-full h-full rounded-lg shadow-2xl relative overflow-hidden"
                 style={{ 
                   background: `linear-gradient(135deg, hsl(42, 36%, 56%) 0%, hsl(42, 46%, 66%) 100%)` 
                 }}>
              <div className="absolute inset-2 rounded opacity-10" 
                   style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"
                     style={{ color: 'hsl(0, 0%, 96%, 0.8)' }}>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              {/* Envelope opening animation */}
              <div className={`absolute top-0 left-0 w-full h-1/2 transform-origin-bottom transition-transform duration-1000 ${isEnvelopeOpen ? 'rotate-x-180' : 'rotate-x-0'}`}
                   style={{ 
                     backgroundColor: 'hsl(42, 36%, 56%)',
                     clipPath: 'polygon(0 0, 100% 0, 50% 100%)' 
                   }}>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          {/* Section 1: Why Email Marketing */}
          <div ref={scrollElements} className="scroll-reveal rounded-2xl p-8 md:p-12 border"
               style={{
                 backgroundColor: 'hsl(0, 0%, 96%)', /* Antique White */
                 borderColor: 'hsl(42, 36%, 56%, 0.2)'
               }}>
            <h3 className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: 'hsl(42, 36%, 56%)' }}>
              Perché "snobbare" l'Email Marketing?
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-6"
               style={{ color: 'hsl(0, 0%, 11%)' }}> {/* Graphite Black */}
              Perché "snobbare" l'Email Marketing equivale letteralmente a gettare nel fuoco una quantità mostruosa di conversioni (e quindi di profitti)?
            </p>
            <p className="text-lg md:text-xl leading-relaxed"
               style={{ color: 'hsl(0, 0%, 11%)' }}> {/* Graphite Black */}
              Oppure, all'opposto, come mai implementare campagne quotidiane di newsletter (e DEM) folgoranti e coinvolgenti può sprigionare l'autentico valore economico di ogni singolo contatto in target?
            </p>
          </div>

          {/* Section 2: Newsletter Power */}
          <div ref={scrollElements} className="scroll-reveal rounded-2xl p-8 md:p-12 border"
               style={{
                 background: `linear-gradient(to left, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 11%) 100%)`,
                 borderColor: 'hsl(42, 36%, 56%, 0.2)'
               }}>
            <h3 className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: 'hsl(42, 36%, 56%)' }}>
              Il Potere delle Newsletter
            </h3>
            <div className="space-y-4 text-lg md:text-xl leading-relaxed"
                 style={{ color: 'hsl(0, 0%, 80%)' }}>
              <p>Le Newsletter con un copy esplosivo e ammaliante rappresentano l'<span className="font-semibold" style={{ color: 'hsl(276, 100%, 25%)' }}>UNICO canale diretto</span> e fulmineo per aumentare la consapevolezza dei tuoi utenti nei confronti del tuo prodotto/servizio.</p>
              <p>Pensa un attimo: oggi come oggi, le newsletter (se redatte e inviate seguendo regole precise) sono lo strumento più incisivo che hai per comparire senza filtri sullo schermo del telefono del tuo utente.</p>
              <p>Sono il mezzo più economico ma al contempo più <span className="font-semibold" style={{ color: 'hsl(0, 100%, 27%)' }}>chirurgico e intimo</span> per comunicare, intrattenere, conquistare e persuadere un contatto giorno dopo giorno, con l'obiettivo di liberare tutto il suo potenziale economico.</p>
            </div>
          </div>

          {/* Section 3: The Real World */}
          <div ref={scrollElements} className="scroll-reveal rounded-2xl p-8 md:p-12 border"
               style={{
                 background: `linear-gradient(to right, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 11%) 100%)`,
                 borderColor: 'hsl(42, 36%, 56%, 0.2)'
               }}>
            <h3 className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: 'hsl(42, 36%, 56%)' }}>
              Facciamo un gioco:
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-semibold mb-4" 
                    style={{ color: 'hsl(0, 0%, 96%)' }}>Nel "Mondo delle Favole"</h4>
                <p className="leading-relaxed"
                   style={{ color: 'hsl(0, 0%, 80%)' }}>
                  ogni lead che acquisci dovrebbe capire all'istante il valore del tuo prodotto/servizio più costoso, accettando con il sorriso la cifra che gli proponi.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold mb-4"
                    style={{ color: 'hsl(0, 0%, 96%)' }}>Nel "Mondo Reale"</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" 
                         style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}></div>
                    <span style={{ color: 'hsl(0, 0%, 80%)' }}>Prestare Attenzione.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" 
                         style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}></div>
                    <span style={{ color: 'hsl(0, 0%, 80%)' }}>Sviluppare Interesse.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" 
                         style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}></div>
                    <span style={{ color: 'hsl(0, 0%, 80%)' }}>Desiderare ciò che proponi, acquisendo fiducia in te o nella tua attività.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" 
                         style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}></div>
                    <span style={{ color: 'hsl(0, 0%, 80%)' }}>Infine, ovviamente, Agire.</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed mt-6"
               style={{ color: 'hsl(0, 0%, 80%)' }}>
              Se pensi che un contatto svolga autonomamente questo percorso, senza che tu lo nutra costantemente... beh, lasciacelo dire: sei un povero illuso.
            </p>
            <p className="text-lg leading-relaxed mt-4"
               style={{ color: 'hsl(0, 0%, 80%)' }}>
              Ogni newsletter è in realtà un tassello che edifica la consapevolezza e il desiderio di risolvere un problema (o appagare un bisogno) tramite il tuo prodotto.
            </p>
            <p className="text-lg leading-relaxed mt-4"
               style={{ color: 'hsl(0, 0%, 80%)' }}>
              Ovviamente, a patto che ogni invio "parli" direttamente alla mente del tuo utente e sia inserito in una Strategia coerente e mirata. Altrimenti, fidati, il tuo pubblico si dileguerà.
            </p>
            <p className="text-lg leading-relaxed mt-4 font-semibold"
               style={{ color: 'hsl(0, 0%, 80%)' }}>
              E lo farà in un lampo.
            </p>
          </div>

          {/* Section 4: Customer Loyalty */}
          <div ref={scrollElements} className="scroll-reveal rounded-2xl p-8 md:p-12 border"
               style={{
                 background: `linear-gradient(to left, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 11%) 100%)`,
                 borderColor: 'hsl(42, 36%, 56%, 0.2)'
               }}>
            <h3 className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: 'hsl(42, 36%, 56%)' }}>
              Trasforma i tuoi clienti attuali in una schiera di fanatici pronti a pendere dalle tue labbra
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-6"
               style={{ color: 'hsl(0, 0%, 80%)' }}>
              Perché le newsletter folgoranti e coinvolgenti non risvegliano solo il potenziale commerciale di una singola lead, ma <span className="font-semibold" style={{ color: 'hsl(0, 100%, 27%)' }}>moltiplicano</span> quello di chi è già tuo cliente.
            </p>
            <p className="text-lg md:text-xl leading-relaxed"
               style={{ color: 'hsl(0, 0%, 80%)' }}>
              Tradotto: significa per te creare un gruppo di <span className="font-semibold" style={{ color: 'hsl(276, 100%, 25%)' }}>fedelissimi</span> che, conoscendo la tua trama e i tuoi valori, non vedono l'ora di acquistare da te regolarmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
