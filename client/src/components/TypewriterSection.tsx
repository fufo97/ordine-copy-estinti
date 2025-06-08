import { useState, useEffect, useRef } from "react";
import TypewriterAnimation from "./TypewriterAnimation";

export default function TypewriterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  let scrollInterval: number;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2 && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && scrollRef.current && autoScroll) {
      scrollInterval = window.setInterval(() => {
        const el = scrollRef.current!;
        if (el.scrollTop + el.clientHeight < el.scrollHeight) {
          el.scrollBy({ top: 1, behavior: "smooth" });
        } else {
          clearInterval(scrollInterval);
        }
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [isVisible, autoScroll]);

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
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, hsl(0,0%,11%) 0%, hsl(0,0%,8%) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative flex justify-center mb-8">
          {/* Typewriter SVG */}
          <svg
            width="600"
            height="450"
            viewBox="0 0 600 450"
            className="max-w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Typewriter Base */}
            <rect x="50" y="280" width="500" height="120" rx="15" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="2"/>
            
            {/* Typewriter Body */}
            <rect x="80" y="200" width="440" height="100" rx="10" fill="#333" stroke="#222" strokeWidth="2"/>
            
            {/* Paper Roller */}
            <rect x="100" y="120" width="400" height="80" rx="40" fill="#444" stroke="#333" strokeWidth="2"/>
            
            {/* Paper */}
            <rect x="150" y="80" width="300" height="160" rx="5" fill="#f8f8f8" stroke="#ddd" strokeWidth="1"/>
            
            {/* Paper Lines */}
            <line x1="170" y1="110" x2="430" y2="110" stroke="#e0e0e0" strokeWidth="1"/>
            <line x1="170" y1="130" x2="430" y2="130" stroke="#e0e0e0" strokeWidth="1"/>
            <line x1="170" y1="150" x2="430" y2="150" stroke="#e0e0e0" strokeWidth="1"/>
            <line x1="170" y1="170" x2="430" y2="170" stroke="#e0e0e0" strokeWidth="1"/>
            <line x1="170" y1="190" x2="430" y2="190" stroke="#e0e0e0" strokeWidth="1"/>
            <line x1="170" y1="210" x2="430" y2="210" stroke="#e0e0e0" strokeWidth="1"/>
            
            {/* Keyboard Keys */}
            <g fill="#555" stroke="#333" strokeWidth="1">
              {/* First row */}
              <rect x="120" y="320" width="25" height="20" rx="3"/>
              <rect x="150" y="320" width="25" height="20" rx="3"/>
              <rect x="180" y="320" width="25" height="20" rx="3"/>
              <rect x="210" y="320" width="25" height="20" rx="3"/>
              <rect x="240" y="320" width="25" height="20" rx="3"/>
              <rect x="270" y="320" width="25" height="20" rx="3"/>
              <rect x="300" y="320" width="25" height="20" rx="3"/>
              <rect x="330" y="320" width="25" height="20" rx="3"/>
              <rect x="360" y="320" width="25" height="20" rx="3"/>
              <rect x="390" y="320" width="25" height="20" rx="3"/>
              <rect x="420" y="320" width="25" height="20" rx="3"/>
              <rect x="450" y="320" width="25" height="20" rx="3"/>
              
              {/* Second row */}
              <rect x="135" y="345" width="25" height="20" rx="3"/>
              <rect x="165" y="345" width="25" height="20" rx="3"/>
              <rect x="195" y="345" width="25" height="20" rx="3"/>
              <rect x="225" y="345" width="25" height="20" rx="3"/>
              <rect x="255" y="345" width="25" height="20" rx="3"/>
              <rect x="285" y="345" width="25" height="20" rx="3"/>
              <rect x="315" y="345" width="25" height="20" rx="3"/>
              <rect x="345" y="345" width="25" height="20" rx="3"/>
              <rect x="375" y="345" width="25" height="20" rx="3"/>
              <rect x="405" y="345" width="25" height="20" rx="3"/>
              <rect x="435" y="345" width="25" height="20" rx="3"/>
              
              {/* Third row */}
              <rect x="150" y="370" width="25" height="20" rx="3"/>
              <rect x="180" y="370" width="25" height="20" rx="3"/>
              <rect x="210" y="370" width="25" height="20" rx="3"/>
              <rect x="240" y="370" width="25" height="20" rx="3"/>
              <rect x="270" y="370" width="25" height="20" rx="3"/>
              <rect x="300" y="370" width="25" height="20" rx="3"/>
              <rect x="330" y="370" width="25" height="20" rx="3"/>
              <rect x="360" y="370" width="25" height="20" rx="3"/>
              <rect x="390" y="370" width="25" height="20" rx="3"/>
              <rect x="420" y="370" width="25" height="20" rx="3"/>
              
              {/* Space bar */}
              <rect x="200" y="395" width="200" height="15" rx="3"/>
            </g>
            
            {/* Type bars */}
            <g fill="#666" stroke="#555" strokeWidth="1">
              <circle cx="200" cy="250" r="3"/>
              <circle cx="220" cy="248" r="3"/>
              <circle cx="240" cy="246" r="3"/>
              <circle cx="260" cy="244" r="3"/>
              <circle cx="280" cy="242" r="3"/>
              <circle cx="300" cy="240" r="3"/>
              <circle cx="320" cy="242" r="3"/>
              <circle cx="340" cy="244" r="3"/>
              <circle cx="360" cy="246" r="3"/>
              <circle cx="380" cy="248" r="3"/>
              <circle cx="400" cy="250" r="3"/>
            </g>
            
            {/* Brand label */}
            <text x="300" y="380" textAnchor="middle" fill="#999" fontSize="12" fontFamily="serif">COPYWRITER</text>
          </svg>

          {/* Text overlay */}
          <div
            className="absolute"
            style={{
              top: "18%",
              left: "25%",
              width: "50%",
              height: "52%",
              zIndex: 10,
            }}
          >
            <div
              ref={scrollRef}
              className="w-full h-full overflow-y-auto p-4
                         text-[30px] md:text-[30px] leading-relaxed"
              onWheel={() => setAutoScroll(false)}
              onTouchStart={() => setAutoScroll(false)}
            >
              {isVisible && (
                <TypewriterAnimation
                  text={typewriterText}
                  speed={30}
                  delay={500}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}