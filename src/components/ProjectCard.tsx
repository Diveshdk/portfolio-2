import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  github?: string;
  link?: string;
  isFeatured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  theme?: 'dark' | 'light';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.8, 
        ease: "circOut" 
      }}
      className={cn(
        "group relative transition-all duration-500 overflow-hidden flex flex-col",
        isDark 
          ? "bg-white/5 border border-white/10 hover:border-neon-orange" 
          : "bg-deep-black/5 border border-deep-black/10 hover:border-neon-orange",
        project.isFeatured ? "col-span-1 lg:col-span-2 p-8 md:p-12" : "p-6 md:p-8"
      )}
    >
      <Link to={`/projects/${project.id}`} className="absolute inset-0 z-20" data-hover="true" />
      
      {/* Background Subtle Layer */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100",
        isDark ? "bg-white/[0.02]" : "bg-deep-black/[0.02]"
      )} />
      
      {/* Content */}
      <div className="relative z-30 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-6 pointer-events-auto">
          <span className={cn(
            "font-mono text-[10px] tracking-widest uppercase",
            isDark ? "text-white/30" : "text-deep-black/30"
          )}>{project.date}</span>
          <div className="flex gap-3">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn("transition-colors", isDark ? "text-white/40 hover:text-white" : "text-deep-black/40 hover:text-deep-black")} 
                data-hover="true"
              >
                <Github size={18} />
              </a>
            )}
            {project.link && (
              <a 
                href={project.link} 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn("transition-colors", isDark ? "text-white/40 hover:text-neon-orange" : "text-deep-black/40 hover:text-neon-orange")} 
                data-hover="true"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={cn(
            "font-display font-black uppercase tracking-tighter leading-none transition-all duration-500 group-hover:tracking-normal",
            project.isFeatured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl",
            isDark ? "text-white" : "text-deep-black"
          )}>
            {project.title}
          </h3>
          
          <p className={cn(
            "font-medium leading-relaxed max-w-md line-clamp-3",
            project.isFeatured ? "text-base md:text-lg" : "text-sm",
            isDark ? "text-white/50" : "text-deep-black/50"
          )}>
            {project.description}
          </p>
        </div>

        <div className="mt-auto pt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className={cn(
              "px-2 py-1 border font-mono text-[9px] uppercase tracking-widest transition-colors",
              isDark 
                ? "bg-white/5 border-white/10 text-white/40 group-hover:border-neon-orange/30 group-hover:text-neon-orange" 
                : "bg-deep-black/5 border-deep-black/10 text-deep-black/40 group-hover:border-neon-orange/30 group-hover:text-neon-orange"
            )}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Frame Effect */}
      <div className="absolute top-0 left-0 w-1 h-0 bg-neon-orange group-hover:h-full transition-all duration-700" />
      <div className="absolute top-0 left-0 w-0 h-1 bg-neon-orange group-hover:w-full transition-all duration-700 delay-100" />
    </motion.div>
  );
};
