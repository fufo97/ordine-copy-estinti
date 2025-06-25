import { useState, useEffect, useRef } from "react";

interface TabletFrameProps {
  text: string;
  isVisible?: boolean;
  className?: string;
}

export default function TabletFrame({ text, isVisible = false, className = "" }: TabletFrameProps) {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);
  const tabletScrollContainerRef = useRef<HTMLDivElement>(null);
  const textElementRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Typewriter effect using the approach from the attached code
  useEffect(() => {
    if (!showTypewriter) return;

    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentIndexRef.current < text.length) {
        const newText = text.slice(0, currentIndexRef.current + 1);
        setDisplayedText(newText);
        
        // Auto-scroll only if user hasn't manually scrolled
        if (!isManualScrollingRef.current) {
          if (mobileScrollContainerRef.current) {
            mobileScrollContainerRef.current.scrollTop = mobileScrollContainerRef.current.scrollHeight;
          }
          if (tabletScrollContainerRef.current) {
            tabletScrollContainerRef.current.scrollTop = tabletScrollContainerRef.current.scrollHeight;
          }
        }
        
        currentIndexRef.current++;
        timeoutId = setTimeout(typeWriter, 50);
      }
    };

    // Start typing
    timeoutId = setTimeout(typeWriter, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showTypewriter, text]);

  const enableManualScroll = () => {
    isManualScrollingRef.current = true;
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4">
        {/* Mobile Phone SVG Frame */}
        <svg
          viewBox="0 0 520 780"
          className="w-full h-auto drop-shadow-2xl block md:hidden"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            minHeight: '500px'
          }}
        >
          <defs>
            {/* Gradients for realistic phone appearance */}
            <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D3748" />
              <stop offset="50%" stopColor="#1A202C" />
              <stop offset="100%" stopColor="#171923" />
            </linearGradient>
            
            <linearGradient id="phoneScreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F7FAFC" />
              <stop offset="100%" stopColor="#EDF2F7" />
            </linearGradient>
            
            <linearGradient id="phoneBezelsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A5568" />
              <stop offset="50%" stopColor="#2D3748" />
              <stop offset="100%" stopColor="#1A202C" />
            </linearGradient>

            {/* Glow effect */}
            <filter id="phoneGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Screen reflection */}
            <linearGradient id="phoneReflection" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          
          {/* Phone Body */}
          <rect
            x="40"
            y="40"
            width="450"
            height="700"
            rx="40"
            ry="40"
            fill="url(#phoneGradient)"
            stroke="#C4A76D"
            strokeWidth="3"
            filter="url(#phoneGlow)"
          />
          
          {/* Inner Bezel */}
          <rect
            x="60"
            y="60"
            width="400"
            height="660"
            rx="25"
            ry="25"
            fill="url(#phoneBezelsGradient)"
            stroke="#C4A76D"
            strokeWidth="1"
            opacity="0.8"
          />
          
          {/* Screen */}
          <rect
            x="80"
            y="80"
            width="360"
            height="620"
            rx="15"
            ry="15"
            fill="url(#phoneScreenGradient)"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          
          {/* Screen Reflection */}
          <rect
            x="80"
            y="80"
            width="360"
            height="620"
            rx="15"
            ry="15"
            fill="url(#phoneReflection)"
            opacity="0.6"
          />
          
          {/* Home Button */}
          <circle
            cx="260"
            cy="760"
            r="15"
            fill="url(#phoneBezelsGradient)"
            stroke="#C4A76D"
            strokeWidth="2"
          />
          
          {/* Power/Volume Buttons */}
          <rect x="35" y="200" width="8" height="40" rx="4" fill="url(#phoneBezelsGradient)" />
          <rect x="35" y="250" width="8" height="25" rx="4" fill="url(#phoneBezelsGradient)" />
          <rect x="35" y="285" width="8" height="25" rx="4" fill="url(#phoneBezelsGradient)" />
          
          {/* Camera */}
          <circle cx="260" cy="65" r="4" fill="#1A202C" opacity="0.8" />
          
          {/* Brand glow effect */}
          <circle
            cx="260"
            cy="390"
            r="160"
            fill="none"
            stroke="#C4A76D"
            strokeWidth="1"
            opacity="0.1"
            className="animate-pulse"
          />
        </svg>

        {/* Tablet SVG Frame (for MD and above) */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-auto drop-shadow-2xl hidden md:block"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            minHeight: '350px'
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
          
          {/* Tablet Body */}
          <rect
            x="50"
            y="50"
            width="700"
            height="500"
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
            width="660"
            height="460"
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
            width="620"
            height="420"
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
            width="620"
            height="420"
            rx="15"
            ry="15"
            fill="url(#reflection)"
            opacity="0.6"
          />
          
          {/* Home Button */}
          <circle
            cx="400"
            cy="545"
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
          <circle cx="400" cy="75" r="4" fill="#1A202C" opacity="0.8" />
          
          {/* Brand glow effect */}
          <circle
            cx="400"
            cy="300"
            r="200"
            fill="none"
            stroke="#C4A76D"
            strokeWidth="1"
            opacity="0.1"
            className="animate-pulse"
          />
        </svg>
        
        {/* Text Content Overlay - Mobile Phone */}
        <div 
          className="absolute inset-0 flex items-center justify-center md:hidden"
          style={{
            top: '25%',
            left: '15.5%',
            width: '71%',
            height: '50%'
          }}
        >
          <div className="w-full h-full p-1 overflow-hidden">
            <div 
              ref={mobileScrollContainerRef}
              className="h-full w-full overflow-y-auto tablet-scrollbar"
              onWheel={enableManualScroll}
              onTouchStart={enableManualScroll}
              onMouseDown={enableManualScroll}
              style={{ 
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              {showTypewriter && (
                <div 
                  ref={textElementRef}
                  className="text-gray-800 font-serif leading-relaxed p-1 tablet-text-responsive" 
                  style={{ 
                    lineHeight: '1.4',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto',
                    maxWidth: '100%'
                  }}
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

        {/* Text Content Overlay - Tablet/PC */}
        <div 
          className="absolute inset-0 hidden md:flex items-center justify-center"
          style={{
            top: '15%',
            left: '11.25%',
            width: '77.5%',
            height: '70%'
          }}
        >
          <div className="w-full h-full p-3 sm:p-4 md:p-6 overflow-hidden">
            <div 
              ref={tabletScrollContainerRef}
              className="h-full overflow-y-auto tablet-scrollbar"
              onWheel={enableManualScroll}
              onTouchStart={enableManualScroll}
              onMouseDown={enableManualScroll}
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
        
        {/* Loading indicator before typewriter starts - Mobile */}
        {isVisible && !showTypewriter && (
          <div 
            className="absolute flex items-center justify-center md:hidden"
            style={{
              top: '10.5%',
              left: '15.5%',
              width: '69%',
              height: '79%'
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
        
        {/* Loading indicator before typewriter starts - Tablet/PC */}
        {isVisible && !showTypewriter && (
          <div 
            className="absolute hidden md:flex items-center justify-center"
            style={{
              top: '15%',
              left: '11.25%',
              width: '77.5%',
              height: '70%'
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