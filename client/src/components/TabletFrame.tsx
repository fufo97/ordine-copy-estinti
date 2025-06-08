import { useState, useEffect, useRef } from "react";

interface TabletFrameProps {
  text: string;
  isVisible?: boolean;
  className?: string;
}

export default function TabletFrame({ text, isVisible = false, className = "" }: TabletFrameProps) {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Typewriter effect with autoscroll exactly like the provided example
  useEffect(() => {
    if (!showTypewriter) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        
        // Autoscroll exactly like the example: scroll to bottom if not manually scrolling
        if (!isUserInteracting && scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
        
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); // Match the example timing

    return () => clearInterval(typeInterval);
  }, [showTypewriter, text, isUserInteracting]);



  const handleUserInteraction = () => {
    // Set manual scrolling mode like in the example
    setIsUserInteracting(true);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4">
        {/* Phone SVG Frame */}
        <svg
          viewBox="0 0 500 750"
          className="w-full h-auto drop-shadow-2xl"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            minHeight: '450px'
          }}
        >
          <defs>
            {/* Gradients for realistic tablet appearance */}
            <linearGradient id="tabletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D3748" />
              <stop offset="50%" stopColor="#1A202C" />
              <stop offset="100%" stopColor="#171923" />
            </linearGradient>
            
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F7FAFC" />
              <stop offset="100%" stopColor="#EDF2F7" />
            </linearGradient>
            
            <linearGradient id="bezelsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A5568" />
              <stop offset="50%" stopColor="#2D3748" />
              <stop offset="100%" stopColor="#1A202C" />
            </linearGradient>

            {/* Glow effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Screen reflection */}
            <linearGradient id="reflection" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          
          {/* Phone Body */}
          <rect
            x="50"
            y="50"
            width="400"
            height="650"
            rx="40"
            ry="40"
            fill="url(#tabletGradient)"
            stroke="#C4A76D"
            strokeWidth="3"
            filter="url(#glow)"
          />
          
          {/* Inner Bezel */}
          <rect
            x="70"
            y="70"
            width="360"
            height="610"
            rx="25"
            ry="25"
            fill="url(#bezelsGradient)"
            stroke="#C4A76D"
            strokeWidth="1"
            opacity="0.8"
          />
          
          {/* Screen */}
          <rect
            x="90"
            y="90"
            width="320"
            height="570"
            rx="15"
            ry="15"
            fill="url(#screenGradient)"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          
          {/* Screen Reflection */}
          <rect
            x="90"
            y="90"
            width="320"
            height="570"
            rx="15"
            ry="15"
            fill="url(#reflection)"
            opacity="0.6"
          />
          
          {/* Home Button */}
          <circle
            cx="250"
            cy="720"
            r="15"
            fill="url(#bezelsGradient)"
            stroke="#C4A76D"
            strokeWidth="2"
          />
          
          {/* Power/Volume Buttons */}
          <rect x="45" y="200" width="8" height="40" rx="4" fill="url(#bezelsGradient)" />
          <rect x="45" y="250" width="8" height="25" rx="4" fill="url(#bezelsGradient)" />
          <rect x="45" y="285" width="8" height="25" rx="4" fill="url(#bezelsGradient)" />
          
          {/* Camera */}
          <circle cx="250" cy="75" r="4" fill="#1A202C" opacity="0.8" />
          
          {/* Brand glow effect */}
          <circle
            cx="250"
            cy="375"
            r="150"
            fill="none"
            stroke="#C4A76D"
            strokeWidth="1"
            opacity="0.1"
            className="animate-pulse"
          />
        </svg>
        
        {/* Text Content Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            top: '12%',
            left: '18%',
            width: '64%',
            height: '76%'
          }}
        >
          <div className="w-full h-full p-3 sm:p-4 md:p-6 overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className={`h-full overflow-y-auto tablet-scrollbar ${autoScroll ? 'auto-scroll' : 'manual-scroll'}`}
              onWheel={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              onMouseDown={handleUserInteraction}
            >
              {showTypewriter && (
                <div 
                  ref={textElementRef}
                  className="text-gray-800 font-serif leading-relaxed px-2 sm:px-3 tablet-text-responsive" 
                  style={{ lineHeight: '1.6' }}
                >
                  {displayedText.split('\n').map((line, index, array) => (
                    <span key={index}>
                      {line}
                      {index < array.length - 1 && <br />}
                    </span>
                  ))}
                  {displayedText.length < text.length && (
                    <span className="typewriter-cursor text-gray-600">|</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Loading indicator before typewriter starts */}
        {isVisible && !showTypewriter && (
          <div 
            className="absolute flex items-center justify-center"
            style={{
              top: '12%',
              left: '18%',
              width: '64%',
              height: '76%'
            }}
          >
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="ml-3 text-sm font-medium">Caricamento...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}