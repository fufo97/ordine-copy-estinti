import { Link } from "wouter";

export default function Servizi() {
  return (
    <div className="min-h-screen pt-20" 
         style={{ backgroundColor: 'hsl(0, 0%, 11%)', color: 'hsl(0, 0%, 96%)' }}>
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6"
              style={{ color: 'hsl(42, 36%, 56%)' }}>
            I Nostri Servizi
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed"
             style={{ color: 'hsl(0, 0%, 80%)' }}>
            Tre livelli di eccellenza per trasformare il tuo Email Marketing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Piano Base */}
          <div className="service-card rounded-2xl p-8 border transition-all duration-300 group"
               style={{
                 background: `linear-gradient(to bottom, hsl(0, 0%, 25%) 0%, hsl(0, 0%, 11%) 100%)`,
                 borderColor: 'hsl(42, 36%, 56%, 0.2)'
               }}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300"
                   style={{ 
                     backgroundColor: 'hsl(42, 36%, 56%, 0.2)'
                   }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                     style={{ color: 'hsl(42, 36%, 56%)' }}>
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2" 
                  style={{ color: 'hsl(0, 0%, 96%)' }}>Piano Base</h3>
              <p className="mb-4" style={{ color: 'hsl(0, 0%, 70%)' }}>Perfetto per iniziare</p>
              <div className="text-4xl font-bold mb-2" 
                   style={{ color: 'hsl(42, 36%, 56%)' }}>€ 1.200</div>
              <p style={{ color: 'hsl(0, 0%, 70%)' }}>al mese</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-[hsl(47,85%,55%)] font-semibold mb-4 text-lg">12 email strategiche mensili</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Copy professionale per ogni email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Design responsive ottimizzato</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Pianificazione strategica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Report mensili dettagliati</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Supporto email incluso</span>
                </div>
              </div>
            </div>
            
            <Link href="/contatti">
              <button className="w-full bg-[hsl(47,85%,55%)]/20 text-[hsl(47,85%,55%)] font-bold py-3 px-6 rounded-lg hover:bg-[hsl(47,85%,55%)] hover:text-[hsl(0,0%,6%)] transition-colors duration-300">
                Scegli Piano Base
              </button>
            </Link>
          </div>

          {/* Piano Avanzato - Featured */}
          <div className="bg-gradient-to-b from-[hsl(47,85%,55%)]/10 via-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 border-2 border-[hsl(47,85%,55%)] relative transform scale-105 group">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[hsl(47,85%,55%)] text-[hsl(0,0%,6%)] px-4 py-1 rounded-full text-sm font-bold">
                PIÙ POPOLARE
              </span>
            </div>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[hsl(47,85%,55%)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[hsl(0,0%,6%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Piano Avanzato</h3>
              <p className="text-gray-400 mb-4">Per business ambiziosi</p>
              <div className="text-4xl font-bold text-[hsl(47,85%,55%)] mb-2">€ 2.200</div>
              <p className="text-gray-400">al mese</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-[hsl(47,85%,55%)] font-semibold mb-4 text-lg">16 email strategiche mensili + segmentazione avanzata</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Tutto del Piano Base</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Segmentazione avanzata liste</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">A/B Testing ottimizzato</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Automazioni base incluse</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Consulenza strategica mensile</span>
                </div>
              </div>
            </div>
            
            <Link href="/contatti">
              <button className="w-full bg-[hsl(47,85%,55%)] text-[hsl(0,0%,6%)] font-bold py-3 px-6 rounded-lg hover:bg-[hsl(47,85%,65%)] transition-colors duration-300">
                Scegli Piano Avanzato
              </button>
            </Link>
          </div>

          {/* Piano Premium */}
          <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 border border-[hsl(47,85%,55%)]/20 hover:border-[hsl(47,85%,55%)]/50 transition-all duration-300 service-card group">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[hsl(47,85%,55%)]/30 transition-colors duration-300">
                <svg className="w-8 h-8 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Piano Premium</h3>
              <p className="text-gray-400 mb-4">Soluzione su misura</p>
              <div className="text-4xl font-bold text-[hsl(47,85%,55%)] mb-2">Custom</div>
              <p className="text-gray-400">su misura</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-[hsl(47,85%,55%)] font-semibold mb-4 text-lg">Copertura personalizzata + automazioni + consulenza strategica continua</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Tutto dei piani precedenti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Strategia completamente personalizzata</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Automazioni avanzate illimitate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Consulenza strategica settimanale</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Supporto prioritario 24/7</span>
                </div>
              </div>
            </div>
            
            <Link href="/contatti">
              <button className="w-full bg-[hsl(47,85%,55%)]/20 text-[hsl(47,85%,55%)] font-bold py-3 px-6 rounded-lg hover:bg-[hsl(47,85%,55%)] hover:text-[hsl(0,0%,6%)] transition-colors duration-300">
                Scegli Piano Premium
              </button>
            </Link>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-gradient-to-r from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20 mb-16">
          <h3 className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-8 text-center">
            Servizi Aggiuntivi Inclusi
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">List Building</h4>
              <p className="text-gray-300 text-sm">Strategie per far crescere la tua lista</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Deliverability</h4>
              <p className="text-gray-300 text-sm">Ottimizzazione della consegna</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Copy Persuasivo</h4>
              <p className="text-gray-300 text-sm">Testi che convertono davvero</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Analytics</h4>
              <p className="text-gray-300 text-sm">Monitoraggio e ottimizzazione</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-[hsl(47,85%,55%)] mb-8">
            Perché Scegliere l'Ordine dei Copywriter Estinti?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-xl p-6 border border-[hsl(47,85%,55%)]/20">
              <div className="w-16 h-16 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Specializzazione Totale</h4>
              <p className="text-gray-300">NON facciamo altro: l'Email Marketing è il nostro culto, la nostra ossessione quotidiana.</p>
            </div>
            <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-xl p-6 border border-[hsl(47,85%,55%)]/20">
              <div className="w-16 h-16 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Precisione Chirurgica</h4>
              <p className="text-gray-300">Strategie verticali su misura, con l'unico scopo di massimizzare le conversioni.</p>
            </div>
            <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-xl p-6 border border-[hsl(47,85%,55%)]/20">
              <div className="w-16 h-16 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Risultati Misurabili</h4>
              <p className="text-gray-300">Trasformiamo le liste in flussi inesauribili di conversione con ROI documentato.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[hsl(47,85%,55%)]/10 to-transparent rounded-2xl p-8 border border-[hsl(47,85%,55%)]/20">
            <h4 className="text-2xl md:text-3xl font-bold text-[hsl(47,85%,55%)] mb-4">
              Pronto a Trasformare il Tuo Email Marketing?
            </h4>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Non lasciare che le tue liste rimangano solo numeri. Inizia oggi il percorso verso l'eccellenza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diagnosi">
                <button className="bg-[hsl(47,85%,55%)] text-[hsl(0,0%,6%)] font-bold py-4 px-8 rounded-lg hover:bg-[hsl(47,85%,65%)] transition-all duration-300 transform hover:scale-105">
                  Richiedi Diagnosi Gratuita
                </button>
              </Link>
              <Link href="/contatti">
                <button className="bg-transparent border-2 border-[hsl(47,85%,55%)] text-[hsl(47,85%,55%)] font-bold py-4 px-8 rounded-lg hover:bg-[hsl(47,85%,55%)] hover:text-[hsl(0,0%,6%)] transition-all duration-300">
                  Parlaci del Tuo Progetto
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
