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
      <Section id="competitions-hero" backgroundColor="bg-white" textColor="text-deep-black" className="pt-48 pb-24">
        <div className="space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-deep-black/40 font-bold italic">04 / Performance Data</span>
          <h1 className="font-display text-7xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] mix-blend-multiply">
            Competitions <br /> <span className="italic text-neon-orange">Hackathons.</span>
          </h1>
        </div>
      </Section>

      <Section id="competitions-list" backgroundColor="bg-white" textColor="text-deep-black" className="py-24">
        <div className="flex flex-col gap-12">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-deep-black/5 animate-pulse" />
            ))
          ) : (
            awards.map((award, i) => (
              <motion.div 
                key={award.id || award.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 border-b-2 border-deep-black/5 hover:bg-deep-black hover:text-white transition-all duration-500"
                data-hover="true"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-24">
                  <span className="font-mono text-xs opacity-30 font-bold">{award.year}</span>
                  <div className="space-y-1">
                     <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter group-hover:italic transition-all">{award.name}</h2>
                     <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">{award.category}</span>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0 flex flex-col md:items-end">
                  <span className="font-display text-2xl md:text-3xl font-bold uppercase text-neon-orange group-hover:text-white transition-colors underline underline-offset-4 decoration-2">{award.rank}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Section>
    </PageTransition>
  );
};
