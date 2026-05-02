import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { soundService } from '../services/soundService';

export const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fluid spring configuration
  const springX = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 });
  
  const trailX = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 1 });
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isPickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('data-hover') === 'true';

      if (isPickable) {
        if (!isHovering) {
          setIsHovering(true);
          soundService.playHover(); // Technical blip
        }
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      soundService.playClick();
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHovering]);

  return (
    <>
      {/* Primary Cursor - Sharp */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference pointer-events-none z-[10000] rounded-full hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
        }}
      />
      
      {/* Fluid Trail Layer */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />

      {/* Kinetic Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-t-2 border-neon-orange pointer-events-none z-[9998] rounded-full hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1.2 : 0.8,
        }}
        animate={isHovering ? { rotate: 360 } : { rotate: 0 }}
        transition={isHovering ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
      />
    </>
  );
};

