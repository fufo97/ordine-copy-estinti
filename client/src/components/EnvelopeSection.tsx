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
    <section className="py-24 relative overflow-hidden bg-editorial-white">
      <div className="container-elegant">
        {/* Sophisticated Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-editorial-purple/10 border border-editorial-purple/20 mb-8">
            <span className="text-editorial-purple font-medium">La Nostra Filosofia</span>
          </div>
          
          <h2 className="editorial-title text-4xl md:text-6xl text-editorial-black mb-6">
            Perché l'Email Marketing
            <br />
            <span className="sophisticated-accent">È la Chiave del Successo</span>
          </h2>
          
          <p className="body-serif text-xl text-editorial-gray max-w-3xl mx-auto leading-relaxed">
            Scopri come trasformiamo ogni contatto in una relazione duratura e profittevole attraverso strategie di comunicazione mirate e scientificamente provate.
          </p>
        </div>

        {/* Revolutionary Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Visual Element */}
          <div className="relative">
            <div className={`editorial-card p-12 hover-lift elegant-transition ${isEnvelopeOpen ? 'scale-105' : 'scale-100'}`}>
              <div className="space-y-8">
                {/* Sophisticated Icon */}
                <div className="w-20 h-20 bg-sophisticated-coral/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-sophisticated-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-editorial-black mb-4">Email Marketing Strategico</h3>
                  <p className="body-serif text-lg text-editorial-gray leading-relaxed">
                    Ogni messaggio è un'opportunità per rafforzare la relazione con il tuo pubblico e guidarlo verso un'azione desiderata.
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-editorial-light-gray">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sophisticated-coral">40:1</div>
                    <div className="text-sm text-editorial-gray">ROI Medio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-editorial-purple">85%</div>
                    <div className="text-sm text-editorial-gray">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-editorial-black">24h</div>
                    <div className="text-sm text-editorial-gray">Risposta</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-sophisticated-coral text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
              Risultati Garantiti
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h3 className="editorial-title text-3xl text-editorial-black">
              La Differenza tra Email Marketing e Spam
            </h3>
            
            <div className="space-y-6 body-serif text-lg text-editorial-gray leading-relaxed">
              <p>
                <strong className="text-editorial-black">Email Marketing strategico</strong> significa creare connessioni autentiche che trasformano lettori occasionali in clienti fedeli.
              </p>
              
              <p>
                Non si tratta di inviare messaggi a caso, ma di costruire <em className="text-sophisticated-coral not-italic font-semibold">relazioni durature</em> attraverso contenuti di valore, timing perfetto e personalizzazione profonda.
              </p>
              
              <p>
                Ogni newsletter diventa un tassello che edifica la consapevolezza e il desiderio di risolvere un problema attraverso la tua soluzione.
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <div className="w-16 h-16 bg-editorial-purple/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-editorial-purple" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-editorial-black">Approccio Scientifico</div>
                <div className="text-editorial-gray">Basato su dati e psicologia comportamentale</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Revolutionary Content Sections */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Why Email Marketing Matters */}
          <div ref={scrollElements} className="editorial-card p-10 reveal-on-scroll hover-lift">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-sophisticated-coral/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-sophisticated-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              <h3 className="editorial-title text-2xl text-editorial-black">
                Il Potere del Canale Diretto
              </h3>

              <div className="body-serif text-lg text-editorial-gray leading-relaxed space-y-4">
                <p>
                  Le newsletter rappresentano l'<strong className="text-editorial-purple">UNICO canale diretto</strong> per comparire senza filtri sullo schermo del tuo cliente.
                </p>
                <p>
                  È il mezzo più <em className="text-sophisticated-coral not-italic font-semibold">chirurgico e intimo</em> per comunicare, intrattenere e persuadere, giorno dopo giorno.
                </p>
              </div>

              <div className="pt-4 border-t border-editorial-light-gray">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-editorial-gray">Efficacia</span>
                  <span className="font-semibold text-sophisticated-coral">40x più efficace dei social</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Journey Reality */}
          <div ref={scrollElements} className="editorial-card p-10 reveal-on-scroll hover-lift">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-editorial-purple/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-editorial-purple" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              <h3 className="editorial-title text-2xl text-editorial-black">
                Dal Mondo delle Favole alla Realtà
              </h3>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-editorial-black mb-3">Nel Mondo Reale il cliente deve:</h4>
                  <div className="space-y-3">
                    {[
                      "Prestare Attenzione",
                      "Sviluppare Interesse", 
                      "Desiderare la soluzione",
                      "Agire con fiducia"
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-sophisticated-coral/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-sophisticated-coral">{index + 1}</span>
                        </div>
                        <span className="body-serif text-editorial-gray">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="body-serif text-editorial-gray leading-relaxed">
                  <strong className="text-editorial-black">Ogni newsletter</strong> è un tassello che edifica consapevolezza e desiderio, guidando il cliente lungo questo percorso naturale.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Loyalty Transformation */}
          <div ref={scrollElements} className="editorial-card p-10 reveal-on-scroll hover-lift">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-subtle-green/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-subtle-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="editorial-title text-2xl text-editorial-black">
                Trasformazione in Clienti Fedeli
              </h3>

              <div className="body-serif text-lg text-editorial-gray leading-relaxed space-y-4">
                <p>
                  Le newsletter coinvolgenti non risvegliano solo il potenziale di nuovi lead, ma <strong className="text-sophisticated-coral">moltiplicano</strong> quello dei clienti esistenti.
                </p>
                <p>
                  Creiamo un gruppo di <em className="text-editorial-purple not-italic font-semibold">fedelissimi</em> che conoscono la tua storia e non vedono l'ora di acquistare regolarmente.
                </p>
              </div>

              <div className="bg-sophisticated-coral/5 p-6 rounded-xl border border-sophisticated-coral/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-sophisticated-coral/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-sophisticated-coral" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sophisticated-coral">Risultato Garantito</span>
                </div>
                <p className="text-sm text-editorial-gray">Community di clienti che pendono dalle tue labbra</p>
              </div>
            </div>
          </div>

          {/* Strategic Approach */}
          <div ref={scrollElements} className="editorial-card p-10 reveal-on-scroll hover-lift">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-warm-gold/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-warm-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              <h3 className="editorial-title text-2xl text-editorial-black">
                Strategia vs. Improvvisazione
              </h3>

              <div className="body-serif text-lg text-editorial-gray leading-relaxed space-y-4">
                <p>
                  Ogni invio deve <strong className="text-editorial-black">"parlare" direttamente alla mente</strong> del tuo utente e inserirsi in una strategia coerente e mirata.
                </p>
                <p>
                  Altrimenti il tuo pubblico si dileguerà. <em className="text-sophisticated-coral not-italic font-semibold">E lo farà in un lampo.</em>
                </p>
              </div>

              <div className="pt-4 border-t border-editorial-light-gray">
                <div className="text-center">
                  <div className="text-3xl font-bold text-editorial-purple mb-1">72h</div>
                  <div className="text-sm text-editorial-gray">Tempo medio per perdere un subscriber non coinvolto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
