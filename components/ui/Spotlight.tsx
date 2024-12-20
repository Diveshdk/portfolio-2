"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export const Spotlight = ({ className = "", fill = "white" }: SpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = divRef.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
      };
      mouseX.current = e.clientX - left;
      mouseY.current = e.clientY - top;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={divRef}
      className={`pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 ${className}`}
      style={{
        background: `radial-gradient(600px circle at ${mouseX.current}px ${mouseY.current}px, ${fill}/0.1, transparent 40%)`,
      }}
    />
  );
};
