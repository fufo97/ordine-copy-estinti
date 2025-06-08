import { useState, useEffect, useRef } from "react";
import TypewriterAnimation from "./TypewriterAnimation";

export default function TypewriterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLElement>(null);
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

  const typewriterText = `...your full copy here...`;

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
