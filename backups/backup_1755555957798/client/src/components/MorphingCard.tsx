import { useState, useRef, useEffect } from "react";

interface MorphingCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: string;
}

export default function MorphingCard({ 
  children, 
  className = "", 
  hoverEffect = true,
  glowColor = "#C4A76D"
}: MorphingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    if (hoverEffect && isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hoverEffect, isHovered]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-500 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered && hoverEffect ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${glowColor}40`
          : '0 10px 30px rgba(0,0,0,0.1)',
      }}
    >
      {/* Animated gradient overlay */}
      {hoverEffect && (
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovered ? 0.1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 50%)`
          }}
        />
      )}
      
      {/* Border glow effect */}
      {hoverEffect && (
        <div
          className="absolute inset-0 rounded-inherit transition-all duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, ${glowColor}40, transparent, ${glowColor}40)`,
            opacity: isHovered ? 1 : 0,
            filter: 'blur(1px)',
            zIndex: -1
          }}
        />
      )}
      
      {children}
    </div>
  );
}