import TypewriterAnimation from "@/components/TypewriterAnimation";
import EnvelopeSection from "@/components/EnvelopeSection";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="bg-editorial-white text-editorial-black">
      {/* Revolutionary Hero Section */}
      <section className="min-h-screen relative overflow-hidden pt-20">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-editorial-white via-gray-50 to-editorial-white"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-sophisticated-coral/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-40 h-40 bg-editorial-purple/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10 container-elegant py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Column */}
            <div className="space-y-8">
              {/* Sophisticated Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-sophisticated-coral/10 border border-sophisticated-coral/20">
                <span className="text-sophisticated-coral font-medium">Elite Email Marketing Specialists</span>
              </div>

              {/* Revolutionary Headline */}
              <h1 className="editorial-title text-5xl md:text-7xl text-editorial-black leading-tight">
                Il Primo e Unico
                <br />
                <span className="sophisticated-accent">Gruppo di Copywriter</span>
                <br />
                in Italia
              </h1>

              {/* Elegant Subtitle */}
              <div className="body-serif text-xl md:text-2xl text-editorial-gray leading-relaxed">
                <p>Interamente focalizzato sul <em className="text-editorial-purple not-italic font-semibold">potenziamento del tuo business</em> attraverso</p>
                <p className="text-2xl md:text-3xl font-bold text-editorial-black mt-2">Il Solo Email Marketing.</p>
              </div>

              {/* Sophisticated Description */}
              <div className="space-y-4 body-serif text-lg text-editorial-gray leading-relaxed">
                <p>L'Email Marketing <strong className="text-editorial-black">è il nostro culto</strong>… È il nostro ieri, il nostro oggi e il nostro domani.</p>
                <p>Siamo gli <em className="text-sophisticated-coral not-italic font-semibold">"ortopedici"</em> dell'Email Marketing: analizziamo, diagnostichiamo e mettiamo a punto strategie verticali con precisione chirurgica.</p>
              </div>

              {/* Revolutionary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link href="/diagnosi">
                  <button className="coral-button px-8 py-4 rounded-xl font-semibold text-lg hover-lift focus-elegant">
                    Richiedi Diagnosi Gratuita
                  </button>
                </Link>
                <Link href="/servizi">
                  <button className="purple-button px-8 py-4 rounded-xl font-semibold text-lg hover-lift focus-elegant">
                    Scopri i Nostri Servizi
                  </button>
                </Link>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative">
              {/* Elegant Visual Element */}
              <div className="relative">
                {/* Main Card */}
                <div className="editorial-card p-8 md:p-12 hover-lift">
                  <div className="space-y-6">
                    {/* Quote Mark */}
                    <div className="text-6xl text-sophisticated-coral/30 font-serif leading-none">"</div>
                    
                    {/* Featured Quote */}
                    <blockquote className="body-serif text-xl text-editorial-gray leading-relaxed">
                      Per un problema al ginocchio, ti affidi ad un ortopedico, o a un tuttologo?
                      <br /><br />
                      Nella comunicazione vale esattamente lo stesso principio.
                    </blockquote>
                    
                    {/* Attribution */}
                    <div className="flex items-center space-x-4 pt-6 border-t border-editorial-light-gray">
                      <div className="w-12 h-12 bg-sophisticated-coral/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-sophisticated-coral" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-editorial-black">Ordine dei Copywriter Estinti</div>
                        <div className="text-sm text-editorial-gray">Elite Email Marketing</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-editorial-purple text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                  Specialisti Esclusivi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sophisticated-coral animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-[rgb(28,28,28)]"></div>

      {/* Envelope Opening Section */}
      <EnvelopeSection />

      {/* Spacer */}
      <div className="h-16 bg-[rgb(28,28,28)]"></div>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-t from-[rgb(28,28,28)] to-[rgb(63,63,63)] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl md:text-5xl font-bold text-[rgb(196,167,109)] mb-6">
            Pronto a Trasformare il Tuo Email Marketing?
          </h3>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Non lasciare che i tuoi contatti rimangano solo numeri. Trasformali in clienti fedeli e appassionati.
          </p>
          <Link href="/contatti">
            <button className="bg-[rgb(139,0,0)] text-white font-bold py-4 px-12 rounded-lg hover:bg-[rgb(159,20,20)] transition-all duration-300 transform hover:scale-105 shadow-xl">
              Inizia Ora il Tuo Percorso
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
