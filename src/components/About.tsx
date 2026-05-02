import React from 'react';
import { motion } from 'motion/react';
import { Section } from './Section';

export const About: React.FC = () => {
  return (
    <Section id="about" backgroundColor="bg-white" textColor="text-deep-black" className="py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {/* Main Title Block */}
        <div className="lg:col-span-8 flex flex-col justify-end space-y-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] uppercase tracking-[0.5em] text-neon-orange font-bold flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-neon-orange/30"></span>
              01 / About Me
            </motion.span>
            <h2 className="font-display text-7xl md:text-[9rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-deep-black">
              About Me
            </h2>
          </div>
          
          <div className="max-w-2xl space-y-8">
            <p className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-none text-deep-black/90">
              If Engineering is a <span className="italic underline decoration-neon-orange decoration-[4px] underline-offset-8">Magic</span>, I am a <span className="italic underline decoration-neon-orange decoration-[4px] underline-offset-8">Magician.</span>
            </p>
            <div className="text-lg md:text-xl font-medium leading-relaxed text-deep-black/50 space-y-6">
              <p>I’m Divesh Kankani, a Computer Science & Engineering graduate (2026) specializing in IoT, Cybersecurity, and Blockchain.</p>
              <p>I have 2+ years of experience in blockchain, worked as freelancer and done internship at IMD, Mumbai—I’ve built systems for real-world use.</p>
              <p>I think in systems and build secure, reliable solutions that scale. I focus on understanding problems deeply and turning them into meaningful products.</p>
              <p>I treat AI as a layer, not a feature—integrating it wherever it adds value.</p>
            </div>
          </div>
        </div>

        {/* Technical Data Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8 lg:pt-24">
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="p-8 border border-deep-black bg-deep-black text-white relative group"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-orange" />
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">DNA_SEQUENCING</span>
                <div className="w-2 h-2 bg-acid-green animate-pulse rounded-full" />
              </div>
              <div className="space-y-4">
                {[
                  { label: 'C++ for DSA', val: '90%' },
                  { label: 'Frontend', val: '80%' },
                  { label: 'Backend', val: '85%' },
                  { label: 'Designing', val: '90%' },
                  { label: 'Building Architecture', val: '90%' }
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between font-mono text-[10px] uppercase">
                      <span>{stat.label}</span>
                      <span>{stat.val}</span>
                    </div>
                    <div className="h-1 bg-white/10 w-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: stat.val }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute top-0 left-0 h-full bg-neon-orange"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 border border-deep-black flex flex-col justify-between hover:bg-neon-orange hover:text-white transition-colors group">
              <span className="font-mono text-[9px] uppercase opacity-40">Leetcode Competitive</span>
              <span className="font-display text-4xl md:text-5xl font-black italic">top 2.48%</span>
            </div>
            <div className="p-6 border border-deep-black flex flex-col justify-between hover:bg-electric-blue hover:text-white transition-colors">
              <span className="font-mono text-[9px] uppercase opacity-40">Projects Done</span>
              <span className="font-display text-4xl md:text-5xl font-black italic">20+</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
