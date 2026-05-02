import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { Section } from './Section';
import { ExperienceItem } from './ExperienceItem';

const experiences = [
  { 
    period: "DEC 2025 — PRESENT",
    role: "Software Engineer Intern",
    company: "Indian Meterorogical Department",
    type: "Internship",
    desc: "Engineering advanced computational frameworks in the Research Section. Developing high-fidelity data processing pipelines and visualization tools for meteorological pattern analysis."
  },
  { 
    period: "APRIL 2025 — PRESENT",
    role: "Freelancing",
    company: "Rushikesh Sutar & Associates",
    type: "Freelance",
    desc: "Consulting on technical architecture and digital systems. Optimizing project management workflows and implementing specialized technical solutions."
  },
  { 
    period: "AUG 2025 — NOV 2025",
    role: "Freelancing",
    company: "Hariom Jangid Architects",
    type: "Freelance",
    desc: "Executed technical infrastructure and sophisticated digital asset systems. Streamlined architectural visualization and data workflows."
  }
];

export const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  return (
    <Section id="experience" backgroundColor="bg-white" textColor="text-deep-black" className="py-32">
      <div className="flex flex-col space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-deep-black/10 pb-12">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-deep-black/40 font-bold">02 / Building experience over time</span>
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Work <span className="italic text-neon-orange">Experiences.</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-6 text-deep-black/40 max-w-xs font-medium italic text-lg">
            <p className="md:text-right font-mono text-[10px] uppercase tracking-[0.2em] mb-4">From foundation to real-world systems</p>
          </div>
        </div>
        
        <div ref={timelineRef} className="relative max-w-6xl mx-auto w-full px-4 md:px-0">
          {/* Main Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-deep-black/5 -translate-x-1/2 z-0" />
          
          {/* Progress Fill Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-neon-orange -translate-x-1/2 z-10 origin-top"
            style={{ scaleY: timelineProgress }}
          />

          <div className="flex flex-col relative z-20">
            {experiences.map((exp, idx) => (
              <ExperienceItem 
                key={idx}
                index={idx}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                desc={exp.desc}
                type={exp.type}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
