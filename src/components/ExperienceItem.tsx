import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  desc: string;
  type: string;
  index: number;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ role, company, period, desc, type, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center mb-24 last:mb-0 w-full group">
      {/* Central Node */}
      <motion.div 
        className="absolute left-0 md:left-1/2 top-0 md:top-8 w-4 h-4 bg-white border-2 border-deep-black rounded-full z-20 -translate-x-1/2 transition-all duration-500 group-hover:bg-neon-orange group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(255,77,0,0.5)]"
        whileInView={{ 
          backgroundColor: ["#ffffff", "#FF4D00", "#FF4D00"],
          scale: [1, 1.5, 1.2],
          boxShadow: ["0 0 0px rgba(255,77,0,0)", "0 0 20px rgba(255,77,0,0.6)", "0 0 10px rgba(255,77,0,0.3)"]
        }}
        viewport={{ margin: "-45% 0px -45% 0px" }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Content Container */}
      <div className={cn(
        "w-full md:w-[42%] flex flex-col",
        isEven ? "md:mr-auto pl-12 md:pl-0 md:text-right md:items-end" : "md:ml-auto pl-12 md:items-start"
      )}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="bg-white border-2 border-deep-black p-6 md:p-8 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 relative group/card"
        >
          {/* Tag */}
          <div className={cn(
            "absolute -top-3 bg-deep-black text-white px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest z-10",
            isEven ? "right-6 md:right-8" : "left-6 md:left-8"
          )}>
            {type}
          </div>

          <span className="font-mono text-[10px] text-deep-black/30 uppercase tracking-[0.3em] font-bold block mb-2">{period}</span>
          
          <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-1 group-hover/card:text-neon-orange transition-colors">
            {role}
          </h3>
          
          <p className="font-display text-lg font-bold uppercase tracking-tight text-deep-black/40 mb-4 italic">
            @ {company}
          </p>
          
          <p className={cn(
            "text-sm font-medium leading-relaxed text-deep-black/60 max-w-sm",
            isEven ? "md:text-right" : "text-left"
          )}>
            {desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
