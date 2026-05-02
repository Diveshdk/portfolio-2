import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { BlogCard } from './BlogCard';
import { getBlogPosts } from '../services/dataService';
import { BlogPost } from '../data';

export const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((data) => {
      setBlogPosts(data);
      setLoading(false);
    });
  }, []);

  const homePosts = blogPosts.slice(0, 2);

  return (
    <Section id="blogs" backgroundColor="bg-deep-black" textColor="text-white" className="py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold block">05 / Output Stream</span>
            <h2 className="font-display text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8]">
              <span className="italic text-neon-orange">Blogs.</span>
            </h2>
          </div>
          <p className="text-xl font-medium leading-relaxed text-white/60 max-w-sm">
            Archiving mental models and structural experiments in real-time. Exploration of software aesthetics and decentralized primitives.
          </p>
          <div className="pt-12">
            <Link 
              to="/blogs" 
              className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white hover:text-neon-orange transition-colors flex items-center gap-2 group/cta"
              data-hover="true"
            >
              ACCESS ALL ARCHIVES <span className="text-lg transition-transform group-hover/cta:translate-x-2">→</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="h-72 bg-white/5 border border-white/10 animate-pulse" />
            ))
          ) : (
            homePosts.map((post, idx) => (
              <BlogCard 
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                type={post.type}
                image={post.image}
                delay={0.1 * (idx + 1)}
                id={post.id}
              />
            ))
          )}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-2 border-dashed border-white/20 p-8 flex flex-col justify-center items-center text-center space-y-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">System Overflow</span>
            <p className="font-display font-black uppercase text-xl text-white/20">Knowledge Base Expansion</p>
            <div className="animate-spin text-white/10">
              <Globe size={48} />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
