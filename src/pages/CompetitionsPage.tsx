import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Section } from '../components/Section';
import { getAwards } from '../services/dataService';
import { Award } from '../data';
import { PageTransition } from '../components/PageTransition';

export const CompetitionsPage: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAwards().then((data) => {
      setAwards(data);
      setLoading(false);
    });
  }, []);

  return (
    <PageTransition>
      <Section id="competitions-hero" backgroundColor="bg-white" textColor="text-deep-black" className="pt-32 md:pt-48 pb-12 md:pb-24">
        <div className="space-y-6">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-deep-black/40 font-bold italic">04 / Performance Data</span>
          <h1 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mix-blend-multiply">
            Competitions <br /> <span className="italic text-neon-orange">Hackathons.</span>
          </h1>
        </div>
      </Section>

      <Section id="competitions-list" backgroundColor="bg-white" textColor="text-deep-black" className="py-12 md:py-24">
        <div className="flex flex-col gap-6 md:gap-0 relative">
          {/* Mobile Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-deep-black/5 md:hidden" />

          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-32 md:h-24 bg-deep-black/5 animate-pulse rounded-sm" />
            ))
          ) : (
            awards.map((award, i) => (
              <motion.div 
                key={award.id || award.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: i * 0.05,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative pl-10 md:pl-0"
                data-hover="true"
              >
                {/* Mobile Timeline Dot */}
                <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-deep-black/10 border-2 border-white group-active:bg-neon-orange group-active:scale-150 transition-all md:hidden" />

                {/* Mobile Card Design (Archive Style) */}
                <div className="md:hidden flex flex-col p-6 bg-white border border-deep-black/5 rounded-sm shadow-[0_4px_30px_-10px_rgba(0,0,0,0.08)] overflow-hidden relative mb-4">
                  {/* Grain/Noise Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[10px] text-deep-black/30 font-bold">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="px-2 py-1 bg-neon-orange/10 text-neon-orange font-mono text-[8px] uppercase tracking-widest font-bold border border-neon-orange/20 rounded-full">
                      {award.rank.toLowerCase().includes('winner') || award.rank.toLowerCase().includes('1st') ? 'Winner' : award.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase tracking-tighter italic leading-tight mb-2 group-active:text-neon-orange transition-colors">
                    {award.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-deep-black/60 font-bold">
                      {award.rank}
                    </span>
                    <div className="h-px flex-1 bg-deep-black/10" />
                    <span className="font-mono text-[10px] text-deep-black/40">
                      {award.year}
                    </span>
                  </div>
                </div>

                {/* Desktop Archive Row */}
                <div className="hidden md:flex flex-row items-center justify-between p-8 md:p-12 border-b-2 border-deep-black/5 hover:bg-deep-black hover:text-white transition-all duration-500 relative overflow-hidden">
                  <div className="flex flex-row items-center gap-24 relative z-10">
                    <span className="font-mono text-xs opacity-30 font-bold group-hover:opacity-60 transition-opacity">{award.year}</span>
                    <div className="space-y-1">
                       <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:italic transition-all">{award.name}</h2>
                       <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40 group-hover:opacity-60">{award.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end relative z-10">
                    <span className="font-display text-xl md:text-2xl font-bold uppercase text-neon-orange group-hover:text-white transition-colors underline underline-offset-4 decoration-2">{award.rank}</span>
                  </div>

                  {/* Desktop Hover Glow */}
                  <div className="absolute inset-0 bg-neon-orange/0 group-hover:bg-neon-orange/5 transition-colors duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Section>
    </PageTransition>
  );
};
