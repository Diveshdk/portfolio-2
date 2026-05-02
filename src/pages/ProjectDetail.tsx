import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { Section } from '../components/Section';
import { getProjectById } from '../services/dataService';
import { Project } from '../data';
import { PageTransition } from '../components/PageTransition';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProjectById(id).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-deep-black/10 border-t-neon-orange rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-deep-black/30">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <Section id="not-found" backgroundColor="bg-white" textColor="text-deep-black" className="h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="font-display text-9xl font-black italic opacity-10">404</h1>
          <p className="font-display text-4xl uppercase tracking-tighter">Project Data Corrupted</p>
          <Link to="/projects" className="inline-block px-12 py-4 bg-deep-black text-white font-mono uppercase tracking-widest hover:bg-neon-orange transition-colors">
            Return to Base
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full overflow-hidden bg-deep-black">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-24 z-10">
            <div className="max-w-7xl mx-auto space-y-8">
              <Link to="/projects" className="flex items-center gap-2 font-mono text-xs text-white/50 hover:text-neon-orange transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                RETURN TO PROJECTS
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex gap-4 items-center">
                   <span className="px-3 py-1 bg-neon-orange text-white font-mono text-[10px] uppercase font-bold tracking-widest">{project.date}</span>
                   <div className="flex gap-2">
                     {project.tags.map((t) => (
                       <span key={t} className="px-3 py-1 border border-white/20 text-white/60 font-mono text-[10px] uppercase">{t}</span>
                     ))}
                   </div>
                </div>
                <h1 className="font-display text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white">
                  {project.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <Section id="project-info" backgroundColor="bg-white" textColor="text-deep-black" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-8">
                <h2 className="font-display text-4xl uppercase font-black leading-none italic text-deep-black">The Mission</h2>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-deep-black/70">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Stats Grid */}
              {project.stats && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-deep-black/10">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="space-y-2">
                       <span className="font-mono text-[10px] uppercase tracking-widest text-deep-black/30 font-bold">{stat.label}</span>
                       <p className="font-display text-4xl font-black italic text-deep-black">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="p-8 border-2 border-deep-black bg-deep-black text-white space-y-8 sticky top-32">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase opacity-40">Project Access</span>
                  <h3 className="font-display text-2xl font-black uppercase">Collaborate</h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {project.github && (
                    <a href={project.github} className="flex items-center justify-between p-4 border border-white/20 hover:bg-neon-orange hover:border-neon-orange transition-all group" data-hover="true">
                      <span className="font-mono text-xs uppercase font-bold">Source Code</span>
                      <Github size={20} className="group-hover:rotate-12 transition-transform" />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} className="flex items-center justify-between p-4 border border-white/20 hover:bg-electric-blue hover:border-electric-blue transition-all group" data-hover="true">
                      <span className="font-mono text-xs uppercase font-bold">Live Portal</span>
                      <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                    </a>
                  )}
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30 italic">Encryption level: AES-256</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-30 italic">Status: Fully Operational</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
};
