import { useState, useEffect, useRef } from "react";

export default function TypewriterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2 && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const enableManualScroll = () => {
    isManualScrollingRef.current = true;
  };

  const typewriterText = `ORDINE DEI COPYWRITER ESTINTI

L'Email Marketing è l'arte di trasformare semplici parole in conversioni concrete.

Ogni email che scriviamo è calibrata con precisione chirurgica per:
- Catturare l'attenzione immediata
- Creare coinvolgimento emotivo  
- Spingere all'azione decisiva

Non siamo una comune agenzia di comunicazione.
Siamo specialisti nell'arte della persuasione scritta.

Il nostro obiettivo: rendere ogni tua lista di contatti una miniera d'oro inesauribile.`;

  // Typewriter effect implementation
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentIndexRef.current < typewriterText.length) {
        const newText = typewriterText.slice(0, currentIndexRef.current + 1);
        setDisplayedText(newText);
        
        // Auto-scroll only if user hasn't manually scrolled
        if (!isManualScrollingRef.current && scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        
        currentIndexRef.current++;
        timeoutId = setTimeout(typeWriter, 30);
      }
    };

    // Start typing with a delay
    timeoutId = setTimeout(typeWriter, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, typewriterText]);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, hsl(0,0%,11%) 0%, hsl(0,0%,8%) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative flex justify-center mb-8">
          {/* Your SVG typewriter */}
          <svg
            width="600"
            height="450"
            viewBox="0 0 600 450"
            className="max-w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* …SVG contents… */}
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
              onWheel={enableManualScroll}
              onTouchStart={enableManualScroll}
              onMouseDown={enableManualScroll}
            >
              {isVisible && (
                <div className="text-white font-mono">
                  {displayedText.split('\n').map((line, index, array) => (
                    <span key={index}>
                      {line}
                      {index < array.length - 1 && <br />}
                    </span>
                  ))}
                  {displayedText.length < typewriterText.length && (
                    <span className="typewriter-cursor text-gray-400">|</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}