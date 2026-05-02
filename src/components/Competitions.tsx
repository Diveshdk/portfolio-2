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
    <Section id="competitions" backgroundColor="bg-white" textColor="text-deep-black" className="py-32 border-y border-deep-black/10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-deep-black/10 pb-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-deep-black/40 font-bold">04 / Performance</span>
            <h2 className="font-display text-4xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-deep-black/10">
            {homeAwards.map((award, i) => (
              <motion.div 
                key={award.id || award.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', zIndex: 10, scale: 1.05 }}
                whileTap={{ scale: 0.95, backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
                className="p-12 flex flex-col items-center justify-center bg-white border border-transparent transition-all duration-300 relative group"
                data-hover="true"
              >
                <span className="font-display text-2xl font-black uppercase tracking-tighter italic block transform group-hover:scale-110 transition-transform mb-2">{award.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF4D00] font-bold">{award.rank}</span>
                <div className="absolute top-2 left-2 w-1 h-1 bg-deep-black/10" />
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-deep-black/10" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
