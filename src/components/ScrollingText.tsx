import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'motion/react';
import { wrap } from '@motionone/utils';
import { cn } from '../lib/utils';

interface ScrollingTextProps {
  baseVelocity: number;
  children: string;
  className?: string;
}

export const ScrollingText = ({ children, baseVelocity = 100, className }: ScrollingTextProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap flex flex-nowrap", className)}>
      <motion.div className="flex whitespace-nowrap flex-nowrap text-8xl md:text-[12rem] font-black uppercase tracking-tighter italic" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
};
