import { useEffect, useState, useRef } from "react";

interface TypewriterAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function TypewriterAnimation({
  text,
  speed = 50,
  delay = 1000,
}: TypewriterAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);  // guard to start typing only once

  // Reset state when text changes
  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setShowCursor(true);
    hasStartedRef.current = false;
  }, [text]);

  // 1️⃣ Typing effect (runs only once per text)
  useEffect(() => {
    if (hasStartedRef.current || !text) return;
    hasStartedRef.current = true;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const typeChar = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeChar, speed);
      } else {
        setIsComplete(true);
        setShowCursor(false);
      }
    };

    const start = setTimeout(typeChar, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  // 2️⃣ Cursor blink
  useEffect(() => {
    if (!isComplete) {
      const blink = setInterval(() => {
        setShowCursor((v) => !v);
      }, 530);
      return () => clearInterval(blink);
    }
  }, [isComplete]);

  // 3️⃣ Auto-scroll on every new character, unless user intervened
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      const el = containerRef.current;
      // jump to bottom
      el.scrollTop = el.scrollHeight;
    }
  }, [displayedText, autoScroll]);

  return (
    <div
      ref={containerRef}
      className="font-mono text-[30px] leading-relaxed h-full overflow-y-auto p-4"
      style={{ color: "hsl(0,0%,11%)" }}
      onWheel={() => setAutoScroll(false)}
      onTouchStart={() => setAutoScroll(false)}
    >
      <span className="whitespace-pre-line">{displayedText}</span>
      {!isComplete && (
        <span
          className={`border-r-2 ${
            showCursor ? "opacity-100" : "opacity-0"
          } inline-block transition-opacity`}
          style={{ borderColor: "hsl(0,0%,11%)" }}
        />
      )}
    </div>
  );
} 