import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface BrutalistCardProps {
  title: string;
  description: string;
  tags?: string[];
  date?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const BrutalistCard = ({ 
  title, 
  description, 
  tags, 
  date, 
  className,
  children 
}: BrutalistCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        "group relative bg-white/5 border border-white/10 p-1",
        className
      )}
    >
      <div className="relative border border-white/10 rounded-[2rem] p-8 h-full bg-deep-black flex flex-col overflow-hidden">
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-neon-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {date && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 block">
            {date}
          </span>
        )}
        
        <h3 className="font-display text-3xl font-bold uppercase tracking-tighter mb-4 group-hover:text-neon-orange transition-colors">
          {title}
        </h3>
        
        <p className="text-white/60 font-medium leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        {children}

        {tags && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
              <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-white/20 bg-white/5">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
