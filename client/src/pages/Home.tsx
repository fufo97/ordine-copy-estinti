import TypewriterAnimation from "@/components/TypewriterAnimation";
import EnvelopeSection from "@/components/EnvelopeSection";
import { Link } from "wouter";

export default function Home() {
  const typewriterText = `Caro Imprenditore e Cara Imprenditrice, prova a pensarci bene:

Per un problema al ginocchio, ti affidi ad un ortopedico, o a un tuttologo?

Molto bene… Nella comunicazione vale esattamente lo stesso principio.

Per massimizzare il tuo ritorno d'investimento e trasformare le tue liste in vere e proprie miniere d'oro personali…

…l'Email Marketing, (ossia lo strumento più rapido, economico e potente che potresti mai utilizzare per comunicare quotidianamente) necessita di un 'medico' specializzato.

Ecco perché l'Ordine dei Copywriter Estinti NON è una semplice agenzia di comunicazione, ma una vera e propria élite di maestri nell'arte del coinvolgimento, dell'intrattenimento e della persuasione,

…in grado di trasformare il tuo Email Marketing in un potente strumento capace di rafforzare il tuo legame con la community, nonché di canalizzare messaggi impattanti per condurre rapidamente gli utenti verso un'azione desiderata.

Insomma, siamo gli "ortopedici" dell'Email Marketing:

Noi analizziamo, eseguiamo diagnosi e mettiamo a punto con precisione chirurgica, strategie verticali di Email Marketing, con l'unico scopo di rendere le tue liste di contatti, flussi inesauribili di conversione.`;

  return (
    <div className="bg-[rgb(28,28,28)] text-white">
      {/* Hero Section with Typewriter */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(28,28,28)] via-[rgb(63,63,63)] to-[rgb(28,28,28)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">

          
          {/* Giant Typewriter Container */}
          <div className="relative bg-gradient-to-b from-[rgb(63,63,63)] to-[rgb(28,28,28)] rounded-3xl p-6 md:p-8 shadow-2xl border border-[rgb(196,167,109)]/30">
            {/* Typewriter Paper */}
            <div className="bg-[rgb(245,245,245)] rounded-lg p-6 md:p-12 relative min-h-[500px] md:min-h-[600px] shadow-inner typewriter-paper">
              {/* Paper holes */}
              <div className="absolute left-4 top-8 bottom-8 w-6 flex flex-col justify-between">
                <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-gray-300"></div>
              </div>
              
              {/* Notebook blue margin line */}
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-[rgb(173,216,230)] opacity-70"></div>
              
              {/* Typewriter Text */}
              <div className="ml-8 md:ml-12 pt-4">
                <TypewriterAnimation text={typewriterText} speed={30} delay={2000} />
              </div>
            </div>
            
            {/* Typewriter Keys Decoration */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-white text-xs">Q</div>
              <div className="w-8 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-white text-xs">W</div>
              <div className="w-8 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-white text-xs">E</div>
              <div className="w-8 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-white text-xs">R</div>
              <div className="w-8 h-8 bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-white text-xs">T</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[rgb(196,167,109)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Main Headline Section */}
      <section className="py-20 bg-gradient-to-b from-[rgb(28,28,28)] to-[rgb(63,63,63)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(196,167,109)] mb-8 leading-tight">
            IL Primo e Unico Gruppo di Copywriter in Italia interamente focalizzato sul<br/>
            <span className="text-white">Potenziamento del tuo business attraverso</span><br/>
            <span className="text-[rgb(75,0,130)]">Il Solo Email Marketing.</span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed">
            Insomma… NON facciamo altro: L'Email Marketing è il nostro culto…<br/>
            È il nostro ieri, il nostro oggi e il nostro domani.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosi">
              <button className="bg-[rgb(139,0,0)] text-white font-bold py-4 px-8 rounded-lg hover:bg-[rgb(159,20,20)] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Richiedi Diagnosi Gratuita
              </button>
            </Link>
            <Link href="/servizi">
              <button className="bg-transparent border-2 border-[rgb(75,0,130)] text-[rgb(75,0,130)] font-bold py-4 px-8 rounded-lg hover:bg-[rgb(75,0,130)] hover:text-white transition-all duration-300">
                Scopri i Nostri Servizi
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Envelope Opening Section */}
      <EnvelopeSection />

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
