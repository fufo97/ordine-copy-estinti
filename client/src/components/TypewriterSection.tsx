import { useState, useEffect } from "react";
import TypewriterAnimation from "./TypewriterAnimation";

export default function TypewriterSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 2;
      
      if (scrollY > triggerPoint && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

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
    <section className="py-20 relative overflow-hidden"
             style={{ 
               background: `linear-gradient(to bottom, hsl(0, 0%, 11%) 0%, hsl(0, 0%, 8%) 100%)` 
             }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Typewriter SVG */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg
                width="600"
                height="450"
                viewBox="0 0 600 450"
                className="max-w-full h-auto"
                style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}
              >
                {/* Typewriter Base */}
                <rect x="50" y="300" width="500" height="120" rx="10" 
                      fill="url(#metalGradient)" stroke="#2a2a2a" strokeWidth="2"/>
                
                {/* Typewriter Body */}
                <rect x="80" y="200" width="440" height="120" rx="8" 
                      fill="url(#bodyGradient)" stroke="#333" strokeWidth="1"/>
                
                {/* Paper Feed */}
                <rect x="120" y="120" width="360" height="100" rx="5" 
                      fill="url(#paperFeedGradient)" stroke="#444" strokeWidth="1"/>
                
                {/* Paper Sheet */}
                <rect x="140" y="80" width="320" height="240" rx="3" 
                      fill="#f8f8f8" stroke="#ddd" strokeWidth="1" id="paperSheet"/>
                
                {/* Paper Lines */}
                <g stroke="#e0e0e0" strokeWidth="0.5" opacity="0.3">
                  {Array.from({length: 20}, (_, i) => (
                    <line key={i} x1="150" y1={100 + i * 12} x2="450" y2={100 + i * 12} />
                  ))}
                </g>
                
                {/* Left margin line */}
                <line x1="170" y1="90" x2="170" y2="310" stroke="#ff6b6b" strokeWidth="1" opacity="0.4"/>
                
                {/* Keyboard Keys */}
                <g fill="#2c2c2c" stroke="#1a1a1a" strokeWidth="0.5">
                  {/* First row */}
                  {Array.from({length: 10}, (_, i) => (
                    <circle key={`row1-${i}`} cx={120 + i * 36} cy={250} r="12" />
                  ))}
                  {/* Second row */}
                  {Array.from({length: 9}, (_, i) => (
                    <circle key={`row2-${i}`} cx={138 + i * 36} cy={280} r="12" />
                  ))}
                  {/* Third row */}
                  {Array.from({length: 8}, (_, i) => (
                    <circle key={`row3-${i}`} cx={156 + i * 36} cy={310} r="12" />
                  ))}
                </g>
                
                {/* Type bars */}
                <g stroke="#333" strokeWidth="2" fill="none">
                  {Array.from({length: 8}, (_, i) => (
                    <path key={`bar-${i}`} d={`M ${200 + i * 20} 180 L ${300 + i * 5} 140`} />
                  ))}
                </g>
                
                {/* Ribbon */}
                <ellipse cx="300" cy="160" rx="60" ry="8" fill="#1a1a1a"/>
                
                {/* Carriage */}
                <rect x="100" y="140" width="80" height="30" rx="5" 
                      fill="url(#carriageGradient)" stroke="#333" strokeWidth="1"/>
                <rect x="420" y="140" width="80" height="30" rx="5" 
                      fill="url(#carriageGradient)" stroke="#333" strokeWidth="1"/>
                
                {/* Brand name */}
                <text x="300" y="380" textAnchor="middle" fill="#666" fontSize="16" fontFamily="serif">
                  VINTAGE WRITER
                </text>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4a4a4a"/>
                    <stop offset="50%" stopColor="#2a2a2a"/>
                    <stop offset="100%" stopColor="#1a1a1a"/>
                  </linearGradient>
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3a3a3a"/>
                    <stop offset="100%" stopColor="#2a2a2a"/>
                  </linearGradient>
                  <linearGradient id="paperFeedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5a5a5a"/>
                    <stop offset="100%" stopColor="#3a3a3a"/>
                  </linearGradient>
                  <linearGradient id="carriageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4a4a4a"/>
                    <stop offset="100%" stopColor="#2a2a2a"/>
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Typewriter Text Overlay */}
              <div className="absolute" 
                   style={{
                     top: '18%',
                     left: '25%',
                     width: '50%',
                     height: '52%',
                     zIndex: 10
                   }}>
                <div className="w-full h-full overflow-hidden p-4">
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
        </div>
      </div>
    </section>
  );
}