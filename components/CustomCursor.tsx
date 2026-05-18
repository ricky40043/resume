import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Direct movement for the main dot (instant)
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      // Slightly delayed movement for the ring (fluidity)
      if (followerRef.current) {
        followerRef.current.animate({
            transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        }, { duration: 500, fill: "forwards", easing: "ease-out" });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isLink = target.closest('a') || target.closest('button') || target.tagName === 'INPUT';
        setIsHovered(!!isLink);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 1. Core Dot: High precision, always white/bright */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference transition-all duration-200 ease-out
            ${isClicking ? 'w-2 h-2 bg-amber-400' : 'w-2.5 h-2.5 bg-white'}
        `}
      />

      {/* 2. Magnetic Field Ring: Fluid, transparent, expands on hover */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-all duration-300 ease-out flex items-center justify-center
            ${isHovered ? 'w-16 h-16 border-amber-400/60 bg-amber-400/5 backdrop-blur-[1px]' : 'w-8 h-8 opacity-50'}
            ${isClicking ? 'scale-75 border-amber-500' : 'scale-100'}
        `}
      >
        {/* Inner ripple for click */}
        <div className={`absolute inset-0 rounded-full bg-amber-400/20 transition-all duration-300
             ${isClicking ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}
        `}></div>
      </div>
    </>
  );
};

export default CustomCursor;