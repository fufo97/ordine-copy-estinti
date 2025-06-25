import { useState, useEffect } from "react";
import { Link } from "wouter";
import ParticleBackground from "@/components/ParticleBackground";
import GlowingText from "@/components/GlowingText";
import FloatingElements from "@/components/FloatingElements";

export default function Servizi() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden" 
         style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}>
      
      {/* Dynamic Background Effects */}
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        
        {/* Hero Title Section */}
        <div className={`text-center mb-20 transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h1 className="responsive-hero-title font-black mb-8 leading-tight">
            <GlowingText 
              className="block text-white"
              glowColor="#C4A76D"
              intensity="high"
              animated
            >
              CHIRURGIA EMAIL MARKETING
            </GlowingText>
          </h1>
        </div>

        {/* Opening Section */}
        <div className={`max-w-5xl mx-auto mb-16 transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-yellow-400/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-purple-500/5 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-bold text-white mb-8 text-center">
                <span className="text-yellow-400">Caro Professionista, Consulente o Imprenditore</span>
              </h2>
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-6">
                Hai mai considerato quanto vale realmente ogni contatto nella tua lista email?
              </p>
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-6">
                Non stiamo parlando di un semplice indirizzo a cui inviare sporadicamente qualche promozione.
              </p>
              <p className="responsive-body-text text-gray-300 leading-relaxed">
                Ogni contatto nella tua lista rappresenta una <GlowingText className="text-yellow-400 font-bold" glowColor="#FFD700">potenziale miniera d'oro dormiente</GlowingText>, un asset che potrebbe generare un flusso costante di opportunità, se solo sapessi come "risvegliarlo" attraverso una comunicazione strategica.
              </p>
            </div>
          </div>
        </div>

        {/* Email Value Proposition */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-2xl blur-lg" />
              <div className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30">
                <h3 className="responsive-section-title font-bold text-yellow-400 mb-6">Il Potere delle Email</h3>
                <p className="responsive-body-text text-gray-300 leading-relaxed mb-4">
                  Le Email rappresentano di fatto il mezzo più rapido, più economico e più intimo che hai a tua disposizione per poter instaurare una vera e propria relazione con i tuoi utenti.
                </p>
                <p className="responsive-body-text text-gray-300 leading-relaxed">
                  I quali pian piano inizieranno ad abituarsi all'idea di ricevere da parte tua quella newsletter, che non solo gli propone, secondo angoli e visioni differenti, la tua soluzione, ma che sa anche intrattenerli e condurli a generare risposte ed interazioni di valore.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-yellow-400/20 rounded-2xl blur-lg" />
              <div className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/30">
                <h3 className="responsive-section-title font-bold text-purple-400 mb-6">Il Risultato</h3>
                <p className="responsive-body-text text-gray-300 leading-relaxed">
                  Questo processo oltre ad aumentare la tua autorità, ti permetterà di estrarre il reale valore commerciale delle tue liste, ottimizzando il ritorno di investimento pubblicitario (che probabilmente hai già investito tramite paid advertising - o la realizzazione di un blog)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-red-500/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black text-center mb-12">
                <GlowingText 
                  className="text-red-400"
                  glowColor="#EF4444"
                  intensity="high"
                >
                  IL PROBLEMA DEI "TESORI SEPOLTI"
                </GlowingText>
              </h2>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-8 text-center">
                Se sei come la maggior parte degli imprenditori che offrono servizi ad alto valore o che possiedono ecommerce avviati (ma stagnanti), probabilmente ti riconosci in questa situazione:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "📊",
                    title: "Liste Sottoutilizzate",
                    desc: "Hai costruito una lista di contatti significativa (2.000+ indirizzi) attraverso anni di networking, eventi, lead magnet o campagne pubblicitarie."
                  },
                  {
                    icon: "📧",
                    title: "Comunicazione Sporadica", 
                    desc: "Invii email alla tua lista solo occasionalmente, forse una newsletter mensile o qualche annuncio di nuovi servizi."
                  },
                  {
                    icon: "📉",
                    title: "Risultati Deludenti",
                    desc: "I risultati sono deludenti: tassi di apertura bassi, pochi click, coinvolgimento minimo."
                  },
                  {
                    icon: "❓",
                    title: "Dubbi e Frustrazione",
                    desc: "Ti chiedi se l'email marketing funzioni davvero nel tuo settore o se sia solo una perdita di tempo."
                  }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative p-6 bg-gradient-to-br from-red-900/20 to-black/40 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 h-full">
                      <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h4 className="responsive-subtitle font-bold text-red-400 mb-3 text-center">
                        {item.title}
                      </h4>
                      <p className="responsive-card-text text-gray-400 leading-relaxed text-center">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="responsive-section-title font-bold text-red-400">
                  Il risultato? Una lista di contatti che rappresenta un <GlowingText className="text-yellow-400" glowColor="#FFD700">enorme potenziale inutilizzato.</GlowingText>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`max-w-4xl mx-auto mb-16 text-center transform transition-all duration-1500 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-yellow-400/50 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.2) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black mb-8">
                <GlowingText 
                  className="text-yellow-400"
                  glowColor="#FFD700"
                  intensity="high"
                >
                  PRENOTA ORA LA TUA DIAGNOSI CHIRURGICA GRATUITA
                </GlowingText>
              </h2>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-8">
                Scopri se il tuo business può beneficiare dell'approccio esclusivo dell'Ordine dei Copywriter Estinti. La nostra Diagnosi Chirurgica gratuita ti mostrerà esattamente dove si nascondono le opportunità nella tua lista e come possiamo aiutarti a sbloccarle.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="responsive-subtitle font-bold text-yellow-400 mb-4">Durante questa analisi approfondita:</h4>
                  <ul className="space-y-3 text-left">
                    {[
                      "Esamineremo la tua attuale strategia di email marketing",
                      "Identificheremo le opportunità nascoste nella tua lista",
                      "Creeremo un piano d'azione personalizzato",
                      "Stimeremo il potenziale di miglioramento delle performance",
                      "Risponderemo a tutte le tue domande e preoccupazioni"
                    ].map((item, index) => (
                      <li key={index} className="responsive-card-text text-gray-300 flex items-start">
                        <span className="text-yellow-400 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💎</div>
                    <p className="responsive-subtitle font-bold text-yellow-400 mb-2">
                      Valore di mercato: €497
                    </p>
                    <p className="responsive-body-text text-green-400 font-bold">
                      Completamente GRATUITA
                    </p>
                    <p className="responsive-card-text text-gray-400">
                      per i business qualificati
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/diagnosi">
                <button className="group relative px-12 py-6 responsive-button-text font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/30">
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    RICHIEDI LA TUA DIAGNOSI CHIRURGICA GRATUITA
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-25 animate-pulse delay-500" />
      </div>
    </div>
  );
}