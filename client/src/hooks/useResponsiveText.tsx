import { useState, useEffect, useRef } from 'react';

interface ResponsiveTextOptions {
  minFontSize?: number;
  maxFontSize?: number;
  baseViewportWidth?: number;
  scaleFactor?: number;
  textLength?: number;
  containerWidth?: number;
  containerHeight?: number;
}

export function useResponsiveText(options: ResponsiveTextOptions = {}) {
  const {
    minFontSize = 12,
    maxFontSize = 40,
    baseViewportWidth = 1200,
    scaleFactor = 0.8,
    textLength = 0,
    containerWidth,
    containerHeight
  } = options;

  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.4);
  const elementRef = useRef<HTMLDivElement>(null);

  const calculateOptimalFontSize = () => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Base calculation using viewport width ratio
    let calculatedSize = (viewport.width / baseViewportWidth) * maxFontSize;

    // Adjust for device categories
    if (viewport.width <= 599) {
      // Mobile: more conservative scaling
      calculatedSize = Math.min(calculatedSize, 18);
      calculatedSize = Math.max(calculatedSize, 12);
    } else if (viewport.width <= 899) {
      // Tablet: moderate scaling
      calculatedSize = Math.min(calculatedSize, 24);
      calculatedSize = Math.max(calculatedSize, 16);
    } else if (viewport.width <= 1200) {
      // Small desktop: balanced scaling
      calculatedSize = Math.min(calculatedSize, 30);
      calculatedSize = Math.max(calculatedSize, 20);
    }

    // Text density adjustment
    if (textLength > 0) {
      const densityFactor = Math.max(0.7, Math.min(1.2, 1000 / textLength));
      calculatedSize *= densityFactor;
    }

    // Container constraints
    if (containerWidth && containerHeight) {
      const containerRatio = containerWidth / containerHeight;
      const aspectAdjustment = Math.min(1.2, Math.max(0.8, containerRatio));
      calculatedSize *= aspectAdjustment;
    }

    // Apply scale factor and bounds
    calculatedSize *= scaleFactor;
    calculatedSize = Math.max(minFontSize, Math.min(maxFontSize, calculatedSize));

    return Math.round(calculatedSize);
  };

  const calculateLineHeight = (fontSize: number) => {
    // Dynamic line height based on font size and device
    const baseLineHeight = 1.4;
    const viewport = window.innerWidth;
    
    if (viewport <= 599) {
      return Math.max(1.3, baseLineHeight - (fontSize - 12) * 0.01);
    } else if (viewport <= 899) {
      return Math.max(1.35, baseLineHeight - (fontSize - 16) * 0.008);
    }
    
    return baseLineHeight;
  };

  useEffect(() => {
    const updateFontSize = () => {
      const newFontSize = calculateOptimalFontSize();
      const newLineHeight = calculateLineHeight(newFontSize);
      
      setFontSize(newFontSize);
      setLineHeight(newLineHeight);
    };

    updateFontSize();

    const handleResize = () => {
      setTimeout(updateFontSize, 100); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [textLength, containerWidth, containerHeight]);

  // Advanced text fitting algorithm with container optimization
  const fitTextToContainer = () => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const container = element.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    
    // Skip if container is not visible
    if (containerRect.width === 0 || containerRect.height === 0) return;
    
    // Create a temporary element to measure text
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.width = `${containerRect.width - 20}px`; // Account for padding
    tempElement.style.fontFamily = getComputedStyle(element).fontFamily;
    tempElement.style.padding = getComputedStyle(element).padding;
    tempElement.innerHTML = element.innerHTML;
    document.body.appendChild(tempElement);

    // Binary search for optimal font size
    let low = minFontSize;
    let high = Math.min(maxFontSize, Math.floor(containerRect.width / 10)); // Reasonable upper bound
    let bestFit = fontSize;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const testLineHeight = calculateLineHeight(mid);
      
      tempElement.style.fontSize = `${mid}px`;
      tempElement.style.lineHeight = `${testLineHeight}`;
      
      const textHeight = tempElement.scrollHeight;
      const availableHeight = containerRect.height * 0.85; // 85% of container height for safety
      
      if (textHeight <= availableHeight) {
        bestFit = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    document.body.removeChild(tempElement);
    
    // Only update if there's a significant change
    if (Math.abs(bestFit - fontSize) > 1) {
      setFontSize(bestFit);
      setLineHeight(calculateLineHeight(bestFit));
    }
  };

  // Smart viewport-based scaling with content awareness
  const getSmartFontSize = () => {
    const viewport = window.innerWidth;
    const textDensity = textLength / 100; // Characters per 100 units
    
    // Device-specific base sizes with content scaling
    let baseFontSize;
    if (viewport <= 480) {
      baseFontSize = Math.max(12, 16 - textDensity * 0.5);
    } else if (viewport <= 768) {
      baseFontSize = Math.max(14, 20 - textDensity * 0.4);
    } else if (viewport <= 1024) {
      baseFontSize = Math.max(16, 24 - textDensity * 0.3);
    } else {
      baseFontSize = Math.max(18, 30 - textDensity * 0.2);
    }
    
    return Math.min(maxFontSize, baseFontSize);
  };

  return {
    fontSize,
    lineHeight,
    elementRef,
    fitTextToContainer,
    recalculate: () => {
      const newFontSize = calculateOptimalFontSize();
      const newLineHeight = calculateLineHeight(newFontSize);
      setFontSize(newFontSize);
      setLineHeight(newLineHeight);
    }
  };
}

export default useResponsiveText;