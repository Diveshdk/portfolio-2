import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { getProjects } from '../services/dataService';
import { Project } from '../data';
import { PageTransition } from '../components/PageTransition';
import { cn } from '../lib/utils';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  // Build categories dynamically from loaded projects
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const categories = ['All', ...allTags];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(filter));

  return (
    <PageTransition>
      <Section id="projects-hero" backgroundColor="bg-deep-black" textColor="text-white" className="pt-48 pb-24">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-neon-orange font-bold italic">03 / My Works</span>
            <h1 className="font-display text-7xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8]">
              Recent <br /> <span className="italic text-transparent outline-text">Projects.</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 border-2 border-white/10 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300",
                  filter === cat ? "bg-white text-deep-black border-white" : "hover:border-white text-white/50"
                )}
                data-hover="true"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section id="projects-grid" backgroundColor="bg-white" textColor="text-deep-black" className="py-24 min-h-screen">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-deep-black/5 border border-deep-black/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={idx}
                theme="light"
              />
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="col-span-full py-48 text-center">
                <p className="font-display text-4xl uppercase opacity-20 italic">No Projects found for this protocol.</p>
              </div>
            )}
          </div>
        )}
      </Section>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px white;
          }
        }
      `}</style>
    </PageTransition>
  );
};
