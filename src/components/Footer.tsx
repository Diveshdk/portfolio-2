import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-black p-12 md:p-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24">
        <div className="flex flex-col gap-6">
          <Link to="/" className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white hover:text-neon-orange transition-colors">
            Divesh Kankani.
          </Link>
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 block italic">© 2026 Developed with Brutalist Intent</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/10 block">Engineering // Aesthetics // Sovereignty</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 text-white">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/30">Explore</span>
            <div className="flex flex-col gap-2 font-display text-lg uppercase font-bold tracking-tight">
              <Link to="/projects" className="hover:text-neon-orange transition-colors">Work</Link>
              <Link to="/competitions" className="hover:text-neon-orange transition-colors">Performance</Link>
              <Link to="/blogs" className="hover:text-neon-orange transition-colors">Blogs</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/30">Connect</span>
            <div className="flex flex-col gap-2 font-display text-lg uppercase font-bold tracking-tight">
              <a href="mailto:kankanifivesh6@gmail.com" className="hover:text-neon-orange transition-colors">Email</a>
              <a href="https://linkedin.com/in/divesh-kankani" target="_blank" rel="noopener noreferrer" className="hover:text-neon-orange transition-colors">LinkedIn</a>
              <a href="https://x.com/sastelog" target="_blank" rel="noopener noreferrer" className="hover:text-neon-orange transition-colors">Twitter</a>
              <a href="https://github.com/Diveshdk" target="_blank" rel="noopener noreferrer" className="hover:text-neon-orange transition-colors">GitHub</a>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-4">
             <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/30">Status</span>
             <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-acid-green">
                <div className="w-2 h-2 rounded-full bg-acid-green animate-pulse" />
                SYSTEM_READY
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
