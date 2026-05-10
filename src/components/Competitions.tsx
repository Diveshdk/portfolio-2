import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { getAwards } from '../services/dataService';
import { Award } from '../data';

export const Competitions: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAwards().then((data) => {
      setAwards(data);
      setLoading(false);
    });
  }, []);

  const homeAwards = awards.slice(0, 4);

  return (
    <Section id="competitions" backgroundColor="bg-white" textColor="text-deep-black" className="py-20 md:py-32 border-y border-deep-black/10">
      <div className="flex flex-col space-y-12 md:space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 border-b border-deep-black/10 pb-8 md:pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-deep-black/40 font-bold">04 / Performance</span>
            <h2 className="font-display text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
              Competitions
            </h2>
          </div>
          <Link 
            to="/competitions" 
            className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-electric-blue hover:text-deep-black transition-colors flex items-center gap-2 group/cta"
            data-hover="true"
          >
            VIEW JOURNEY <span className="text-lg transition-transform group-hover/cta:translate-x-2">→</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-deep-black/10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-px md:bg-deep-black/10 relative">
            {/* Mobile Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-deep-black/5 md:hidden" />
            
            {homeAwards.map((award, i) => (
              <motion.div 
                key={award.id || award.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative pl-10 md:pl-0"
                data-hover="true"
              >
                {/* Mobile Timeline Dot */}
                <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-deep-black/10 border-2 border-white group-active:bg-neon-orange group-active:scale-150 transition-all md:hidden" />

                {/* Mobile Card Design */}
                <div className="md:hidden flex flex-col p-8 bg-white border border-deep-black/5 rounded-sm shadow-[0_4px_30px_-10px_rgba(0,0,0,0.08)] overflow-hidden relative">
                  {/* Grain/Noise Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-orange/5 blur-3xl rounded-full" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-[10px] text-deep-black/30 font-bold">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="px-2 py-1 bg-neon-orange/10 text-neon-orange font-mono text-[8px] uppercase tracking-widest font-bold border border-neon-orange/20 rounded-full">
                      {award.rank.includes('Winner') || award.rank.includes('1st') ? 'Winner' : 'Participation'}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase tracking-tighter italic leading-tight mb-2 group-active:text-neon-orange transition-colors">
                    {award.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-deep-black/60 font-bold">
                      {award.rank}
                    </span>
                    <div className="h-px flex-1 bg-deep-black/10" />
                    <span className="font-mono text-[10px] text-deep-black/40">
                      {award.year}
                    </span>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 opacity-10">
                    <div className="absolute bottom-2 right-2 w-4 h-[1px] bg-deep-black" />
                    <div className="absolute bottom-2 right-2 w-[1px] h-4 bg-deep-black" />
                  </div>
                </div>

                {/* Desktop Card Design (Kept similar to original but refined) */}
                <div className="hidden md:flex p-12 flex-col items-center justify-center bg-white border border-transparent transition-all duration-500 relative group-hover:bg-deep-black group-hover:text-white h-full min-h-[250px]">
                  <span className="font-display text-2xl font-black uppercase tracking-tighter italic block transform group-hover:scale-110 transition-transform mb-2 text-center leading-tight">
                    {award.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neon-orange font-bold">
                    {award.rank}
                  </span>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-1 h-1 bg-deep-black/10 group-hover:bg-white/20 transition-colors" />
                  <div className="absolute bottom-4 right-4 w-1 h-1 bg-deep-black/10 group-hover:bg-white/20 transition-colors" />
                  <div className="absolute top-4 right-4 w-1 h-1 bg-deep-black/10 group-hover:bg-white/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-deep-black/10 group-hover:bg-white/20 transition-colors" />
                  
                  {/* Subtle Hover Glow */}
                  <div className="absolute inset-0 bg-neon-orange/0 group-hover:bg-neon-orange/5 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
