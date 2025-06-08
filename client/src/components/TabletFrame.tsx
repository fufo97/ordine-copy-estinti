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

  // Pure typewriter effect - no scrolling logic here
  useEffect(() => {
    if (!showTypewriter) return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [showTypewriter, text]);

  // Autoscroll that follows the typing cursor precisely
  useEffect(() => {
    if (!autoScroll || isUserInteracting || !displayedText || !showTypewriter) return;
    
    const container = scrollContainerRef.current;
    const textElement = textElementRef.current;
    
    if (!container || !textElement) return;

    const keepCursorVisible = () => {
      // Count actual line breaks plus estimated wrapped lines
      const lineHeight = 42; // Based on font size 30px * 1.4 line-height
      const actualLineBreaks = (displayedText.match(/\n/g) || []).length;
      const charsPerLine = 40; // Conservative estimate for tablet width
      const wrappedLines = Math.floor(displayedText.replace(/\n/g, '').length / charsPerLine);
      const totalLines = actualLineBreaks + wrappedLines;
      
      // Calculate cursor position from top
      const cursorTopPosition = totalLines * lineHeight;
      
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const currentScrollTop = container.scrollTop;
      const visibleBottom = currentScrollTop + containerHeight;
      
      // Always keep cursor in the visible area, preferably in bottom half
      const targetVisiblePosition = containerHeight * 0.6; // 60% down from top
      const targetScrollTop = cursorTopPosition - targetVisiblePosition;
      
      // Only scroll if cursor would be outside visible area or needs repositioning
      if (cursorTopPosition > visibleBottom - lineHeight || 
          targetScrollTop > currentScrollTop + 20) {
        const maxScroll = scrollHeight - containerHeight;
        const newScrollTop = Math.min(maxScroll, Math.max(0, targetScrollTop));
        
        container.scrollTop = newScrollTop;
      }
    };

    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(keepCursorVisible);
  }, [displayedText.length, autoScroll, isUserInteracting, showTypewriter]);

  // Detect user scroll intervention
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isUserInteracting) {
        const currentScrollPos = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        // If user scrolled away from the bottom, disable auto-scroll
        if (currentScrollPos < maxScroll - 50) {
          setAutoScroll(false);
          setIsUserInteracting(true);
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isUserInteracting]);

  // Monitor scroll position to re-enable auto-scroll when appropriate
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || autoScroll) return;

    const handleScrollPosition = () => {
      const currentScrollPos = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      
      // If user scrolled to bottom area, re-enable auto-scroll
      if (maxScroll <= 5 || currentScrollPos >= maxScroll - 15) {
        setAutoScroll(true);
        setIsUserInteracting(false);
      }
    };

    const interval = setInterval(handleScrollPosition, 300);
    return () => clearInterval(interval);
  }, [autoScroll]);

  const handleMouseEnter = () => {
    // When cursor enters the text area, switch to manual mode
    setIsUserInteracting(true);
    setAutoScroll(false);
  };

  const handleMouseLeave = () => {
    // When cursor leaves, immediately check if we should resume auto-scroll
    setIsUserInteracting(false);
    
    const container = scrollContainerRef.current;
    if (container) {
      const currentScrollPos = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      
      // If user is near the bottom when leaving, resume auto-scroll
      if (maxScroll <= 10 || currentScrollPos >= maxScroll - 20) {
        setAutoScroll(true);
      }
    }
  };

  const handleUserScroll = () => {
    // Immediate response to manual scrolling
    setIsUserInteracting(true);
    setAutoScroll(false);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative max-w-4xl w-full">
        {/* Tablet SVG Frame */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-auto drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
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
        
        {/* Text Content Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            top: '15%',
            left: '11.25%',
            width: '77.5%',
            height: '70%'
          }}
        >
          <div className="w-full h-full p-4 overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className={`h-full overflow-y-auto tablet-scrollbar ${autoScroll ? 'auto-scroll' : 'manual-scroll'}`}
              onScroll={handleUserScroll}
              onWheel={handleUserScroll}
              onTouchStart={handleUserScroll}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {showTypewriter && (
                <div 
                  ref={textElementRef}
                  className="text-gray-800 font-serif leading-relaxed px-2" 
                  style={{ fontSize: '30px', lineHeight: '1.4' }}
                >
                  {displayedText}
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