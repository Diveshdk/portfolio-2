import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  type: string;
  image: string;
  delay: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ id, title, date, excerpt, type, image, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group bg-white/5 border border-white/10 flex flex-col overflow-hidden hover:border-neon-orange transition-all duration-300 relative"
  >
    <Link to={`/blogs/${id}`} className="absolute inset-0 z-20" data-hover="true" />
    <div className="relative h-56 md:h-64 overflow-hidden bg-deep-black">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 bg-deep-black text-white font-mono text-[9px] font-bold px-2 py-1 uppercase tracking-widest z-10 border border-white/10">
        {type}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-deep-black to-transparent opacity-60" />
    </div>
    
    <div className="p-8 flex flex-col flex-grow space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{date}</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-neon-orange/40" />
          ))}
        </div>
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-white group-hover:text-neon-orange transition-colors">
        {title}
      </h3>
      <p className="font-medium text-white/50 leading-relaxed text-sm line-clamp-3">
        {excerpt}
      </p>
      <div className="pt-4 mt-auto border-t border-white/10 flex justify-between items-center relative z-30">
        <button className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-white/60 group-hover:text-neon-orange transition-colors" data-hover="true">
          Read Intelligence <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
        </button>
        <span className="font-mono text-[8px] text-white/10 font-black">ID_0{Math.floor(Math.random() * 9 + 1)}</span>
      </div>
    </div>
  </motion.div>
);
