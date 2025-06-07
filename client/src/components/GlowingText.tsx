import { useEffect, useState } from "react";

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
}

export default function GlowingText({ 
  children, 
  className = "", 
  glowColor = "#C4A76D", 
  intensity = "medium",
  animated = false 
}: GlowingTextProps) {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, [animated]);

  const getIntensityValue = () => {
    switch (intensity) {
      case "low": return 10;
      case "medium": return 20;
      case "high": return 30;
      default: return 20;
    }
  };

  const baseGlow = getIntensityValue();
  const pulseMultiplier = animated ? 1 + Math.sin(pulsePhase * 0.1) * 0.3 : 1;
  const currentGlow = baseGlow * pulseMultiplier;

  return (
    <span
      className={className}
      style={{
        textShadow: `
          0 0 ${currentGlow}px ${glowColor},
          0 0 ${currentGlow * 2}px ${glowColor},
          0 0 ${currentGlow * 3}px ${glowColor}
        `,
        transition: animated ? 'none' : 'text-shadow 0.3s ease'
      }}
    >
      {children}
    </span>
  );
}