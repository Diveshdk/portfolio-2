import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { getProjects } from '../services/dataService';
import { Project } from '../data';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const homeProjects = projects.slice(0, 4);

  return (
    <Section id="projects" backgroundColor="bg-deep-black" textColor="text-white" className="py-32">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-neon-orange font-bold">03 / Curated Projects</span>
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Recent <span className="italic text-transparent outline-text">Projects.</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-6 text-white/40 max-w-xs font-medium italic text-lg">
            <p className="md:text-right">Architecting high-stakes digital environments with logic and precision.</p>
            <Link 
              to="/projects" 
              className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-neon-orange hover:text-white transition-colors flex items-center gap-3 group/cta"
              data-hover="true"
            >
              EXPLORE ALL PROJECTS <span className="text-xl transition-transform group-hover/cta:translate-x-2">→</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {homeProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id}
                index={idx}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
      
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
    </Section>
  );
};
