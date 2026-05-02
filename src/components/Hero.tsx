import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Download, Code2, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const MagneticElement = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("relative z-20", className)}
    >
      {children}
    </motion.div>
  );
};

const CharacterAssembly = ({ 
  char, 
  index, 
  total,
  baseDelay = 0,
  isItalic = false,
  scrollYProgress
}: { 
  char: string, 
  index: number,
  total: number,
  baseDelay?: number,
  isItalic?: boolean,
  scrollYProgress: any,
  key?: React.Key
}) => {
  // Entry animation parameters
  // Randomize some directions
  const randomDir = useMemo(() => {
    const dirs = [
      { x: -200, y: -100, rotate: -15 },
      { x: 200, y: -200, rotate: 15 },
      { x: -150, y: 300, rotate: 10 },
      { x: 300, y: 150, rotate: -20 },
    ];
    return dirs[index % dirs.length];
  }, [index]);

  // Scroll transforms
  const scrollY = useTransform(scrollYProgress, [0, 0.4], [0, index % 2 === 0 ? -50 : 50]);
  const scrollRotate = useTransform(scrollYProgress, [0, 0.4], [0, index % 2 === 0 ? -5 : 5]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const ghostX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const ghostY = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <div className="relative group/char">
      {/* Ghost Layer (Mid-layer) */}
      <motion.span
        style={{ 
          x: ghostX, 
          y: ghostY,
          opacity: useTransform(scrollYProgress, [0, 0.3], [0.1, 0.3])
        }}
        className={cn(
          "absolute inset-0 pointer-events-none select-none text-white/20 blur-[1px]",
          isItalic ? "italic" : "font-black"
        )}
      >
        {char}
      </motion.span>

      {/* Main Layer */}
      <motion.div
        initial={{ 
          opacity: 0, 
          x: randomDir.x, 
          y: randomDir.y, 
          rotate: randomDir.rotate,
          scale: 0.8
        }}
        animate={{ 
          opacity: [0, 1, 0.8, 1], 
          x: 0, 
          y: 0, 
          rotate: 0,
          scale: [0.8, 1.05, 1]
        }}
        transition={{
          delay: baseDelay + (index * 0.04),
          duration: 1.2,
          type: "spring",
          stiffness: 70,
          damping: 15
        }}
        style={{
          y: scrollY,
          rotate: scrollRotate,
          scale: scrollScale,
        }}
        className={cn(
          "relative cursor-default select-none transition-colors duration-500 hover:text-neon-orange",
          isItalic ? "italic" : "font-black"
        )}
      >
        <span>{char}</span>
        
        {/* Interaction: Distortion on hover */}
        <motion.div 
          className="absolute inset-0 bg-acid-green/10 opacity-0 group-hover/char:opacity-100 blur-xl transition-opacity pointer-events-none"
        />
      </motion.div>

      {/* Wireframe Accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ delay: baseDelay + (index * 0.05), duration: 1 }}
        className="absolute inset-0 border border-white/10 pointer-events-none"
      />
    </div>
  );
};

const IdentityAssembly = ({ 
  firstName, 
  lastName, 
  scrollYProgress 
}: { 
  firstName: string, 
  lastName: string, 
  scrollYProgress: any 
}) => {
  const tracking = useTransform(scrollYProgress, [0, 0.5], ["-0.05em", "0.05em"]);
  
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 lg:gap-6">
      {/* First Name - Italic */}
      <motion.div 
        style={{ letterSpacing: tracking }}
        className="flex text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] leading-[0.8] uppercase tracking-tighter text-white"
      >
        {firstName.split("").map((c, i) => (
          <CharacterAssembly 
            key={`first-${i}`}
            char={c}
            index={i}
            total={firstName.length}
            baseDelay={0.2}
            isItalic
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>

      {/* Last Name - Bold/Accent */}
      <motion.div 
        style={{ letterSpacing: tracking }}
        className="flex text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] leading-[0.8] uppercase tracking-tighter text-neon-orange"
      >
        {lastName.split("").map((c, i) => (
          <CharacterAssembly 
            key={`last-${i}`}
            char={c}
            index={i}
            total={lastName.length}
            baseDelay={0.6}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ lat: 19.0760, lon: 72.8777});
  const [ping, setPing] = useState(12);

  // Simulate real-time HUD updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lon: prev.lon + (Math.random() - 0.5) * 0.0001
      }));
      setPing(Math.floor(Math.random() * 5) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen md:min-h-screen w-full bg-deep-black flex flex-col items-center justify-center overflow-hidden py-12 md:py-20"
    >
      {/* BACKGROUND SYSTEM */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0.05]) }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:5rem_5rem]"
        >
          {/* Subtle grid intersection labels */}
          <div className="absolute top-[5rem] left-[5rem] font-mono text-[6px] md:text-[8px] opacity-30 text-white">X-007</div>
          <div className="absolute top-[15rem] right-[10rem] font-mono text-[6px] md:text-[8px] opacity-30 text-neon-orange">Y-007</div>
        </motion.div>
        
        {/* Decorative corner borders - Simplified for Mobile */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12 w-16 h-16 md:w-32 md:h-32 border-t border-l md:border-t-2 md:border-l-2 border-neon-orange/40" />
        <div className="absolute top-6 right-6 md:top-12 md:right-12 w-16 h-16 md:w-32 md:h-32 border-t border-r md:border-t-2 md:border-r-2 border-electric-blue/40" />
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-16 h-16 md:w-32 md:h-32 border-b border-l md:border-b-2 md:border-l-2 border-acid-green/40" />
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-16 h-16 md:w-32 md:h-32 border-b border-r md:border-b-2 md:border-r-2 border-white/20" />

        {/* System Identifier 007 - Hidden on ultra small screens */}
        <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 hidden sm:flex flex-col gap-1 items-start">
          <span className="font-mono text-[8px] md:text-[10px] text-neon-orange uppercase tracking-widest">System Identifier</span>
          <motion.span 
            animate={{ opacity: [0.1, 0.2, 0.15] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-4xl md:text-6xl font-black italic text-transparent outline-text"
          >
            007
          </motion.span>
        </div>
        
        {/* Technical HUD Sidebar - Dynamic & Responsive */}
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-8 items-end pointer-events-none opacity-40">
          <div className="flex flex-col items-end gap-1 font-mono text-[6px] md:text-[8px] text-white/40">
            <span className="uppercase tracking-widest text-acid-green">Buffer Overflow: 0%</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 md:w-2 h-1 bg-acid-green" 
                />
              ))}
            </div>
          </div>
          
          <div className="w-[2px] bg-white/10 h-32 md:h-64 relative">
             <motion.div 
               animate={{ height: ["10%", "90%", "30%", "100%", "10%"] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 left-0 w-full bg-neon-orange shadow-[0_0_10px_#FF4D00]" 
             />
          </div>
          <div className="flex flex-col gap-1 md:gap-2 text-right font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-white/60">
            <span className="animate-pulse">Lat: {coords.lat.toFixed(4)}° N</span>
            <span className="animate-pulse">Lon: {coords.lon.toFixed(4)}° E</span>
            <span className="text-acid-green">Ping: {ping}ms</span>
            <span className="text-electric-blue">Sync: Active</span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="text-neon-orange"
            >
              MEM: {(Math.random() * 10 + 40).toFixed(1)}GB
            </motion.span>
          </div>
        </div>

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }} 
        />

        {/* Scanlines effect (faint) */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
      </div>

      {/* KINETIC TYPOGRAPHY */}
      <motion.div 
        style={{ scale, y, opacity }}
        className="relative z-10 font-display flex flex-col items-center gap-6 text-center px-4"
      >
        <div className="relative">
          <div className="absolute -top-6 md:-top-12 left-0 font-mono text-[6px] md:text-[10px] text-electric-blue flex gap-4 whitespace-nowrap z-20">
            <span>[ REG: 007 ]</span>
            <span className="hidden sm:inline">[ MODE: AGENT ]</span>
          </div>
          <div className="absolute -bottom-4 md:-bottom-8 right-0 font-mono text-[6px] md:text-[10px] text-acid-green flex gap-4 whitespace-nowrap z-20">
            <span>STATUS: ONLINE</span>
            <span className="hidden sm:inline">CORE: STABLE</span>
          </div>
          
          <IdentityAssembly 
            firstName="DIVESH" 
            lastName="KANKANI" 
            scrollYProgress={scrollYProgress} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col gap-4 text-sm md:text-2xl font-medium tracking-tight text-white/50 max-w-xl px-6 leading-relaxed"
        >
          <p className="uppercase tracking-tighter">
            SYSTEM INITIALIZED. <span className="text-white italic">FROM LOGIC TO EXECUTION.</span>
          </p>
          <p className="text-xs md:text-base italic text-white/30 font-mono tracking-normal leading-relaxed border-l border-white/10 pl-6 sm:pl-8 text-left max-w-2xl">
            “On weekends, I’m either solving problems at tech competitions <br className="hidden md:block" /> or chasing summits — I build, I explore, I figure things out.”
          </p>
        </motion.div>
      </motion.div>

      {/* CTA SECTION */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
        className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center relative z-20 w-full px-6"
      >
        <MagneticElement className="w-full sm:w-auto">
          <Link 
            to="/projects"
            className="group relative overflow-hidden px-8 md:px-10 py-4 md:py-5 bg-white text-deep-black font-display font-black uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors duration-500 w-full flex items-center justify-center gap-3 transition-transform active:scale-95"
            data-hover="true"
          >
            <div className="absolute inset-0 bg-neon-orange translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10">Explore Projects</span>
            <Code2 size={18} className="relative z-10" />
          </Link>
        </MagneticElement>

        <MagneticElement className="w-full sm:w-auto">
          <button 
            className="group relative px-8 md:px-10 py-4 md:py-5 border border-white/20 text-white font-display font-black uppercase tracking-widest text-xs md:text-sm hover:border-white transition-all flex items-center justify-center gap-3 overflow-hidden w-full transition-transform active:scale-95"
            data-hover="true"
          >
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Fetch Resume</span>
            <Download size={16} className="relative z-10 group-hover:translate-y-1 transition-transform" />
          </button>
        </MagneticElement>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0.5, 0]) }}
        className="absolute bottom-6 md:bottom-12 flex flex-col items-center gap-2 md:gap-4 pointer-events-none"
      >
        <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] rotate-90 mb-2 md:mb-4 block">Scroll</span>
        <div className="w-[1px] h-12 md:h-24 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};
