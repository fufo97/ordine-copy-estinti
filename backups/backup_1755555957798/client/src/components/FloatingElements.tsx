import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  shape: 'circle' | 'triangle' | 'square';
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Create floating elements
    const newElements: FloatingElement[] = [];
    for (let i = 0; i < 20; i++) {
      newElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? '#C4A76D' : '#4B0082',
        shape: ['circle', 'triangle', 'square'][Math.floor(Math.random() * 3)] as 'circle' | 'triangle' | 'square'
      });
    }
    setElements(newElements);

    // Animate elements
    const interval = setInterval(() => {
      setElements(prev => prev.map(element => ({
        ...element,
        y: element.y > window.innerHeight + element.size 
          ? -element.size 
          : element.y + element.speed,
        x: element.x + Math.sin(Date.now() * 0.001 + element.id) * 0.5
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const renderShape = (element: FloatingElement) => {
    const style = {
      position: 'absolute' as const,
      left: element.x,
      top: element.y,
      width: element.size,
      height: element.size,
      opacity: element.opacity,
      pointerEvents: 'none' as const
    };

    switch (element.shape) {
      case 'circle':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.color,
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`,
              filter: 'blur(1px)'
            }}
          />
        );
      case 'square':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.color,
              transform: `rotate(${Date.now() * 0.001 + element.id}rad)`,
              filter: 'blur(1px)'
            }}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {elements.map(renderShape)}
    </div>
  );
}