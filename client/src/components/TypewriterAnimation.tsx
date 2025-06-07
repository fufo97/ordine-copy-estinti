import { useEffect, useState } from "react";

interface TypewriterAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function TypewriterAnimation({ text, speed = 50, delay = 1000 }: TypewriterAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let index = 0;

    const typeWriter = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeWriter, speed);
      } else {
        setIsComplete(true);
        setShowCursor(false);
      }
    };

    // Start typing after delay
    const startTimeout = setTimeout(() => {
      typeWriter();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startTimeout);
    };
  }, [text, speed, delay]);

  // Cursor blinking effect
  useEffect(() => {
    if (!isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);

      return () => clearInterval(cursorInterval);
    }
  }, [isComplete]);

  return (
    <div className="font-mono text-xs leading-tight h-full overflow-hidden" 
         style={{ color: 'hsl(0, 0%, 11%)' }}>
      <span className="whitespace-pre-line">{displayedText}</span>
      {!isComplete && (
        <span className={`border-r-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}
              style={{ borderColor: 'hsl(0, 0%, 11%)' }}>
          &nbsp;
        </span>
      )}
    </div>
  );
}
