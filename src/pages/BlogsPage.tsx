import React, { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { BlogCard } from '../components/BlogCard';
import { getBlogPosts } from '../services/dataService';
import { BlogPost } from '../data';
import { PageTransition } from '../components/PageTransition';

export const BlogsPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((data) => {
      setBlogPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <PageTransition>
      <Section id="blogs-hero" backgroundColor="bg-deep-black" textColor="text-white" className="pt-48 pb-24 h-[60vh] flex items-end">
        <div className="space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 font-bold italic">05 / The Archives</span>
          <h1 className="font-display text-7xl md:text-[14rem] font-black uppercase tracking-tighter leading-[0.8] mb-[-0.05em]">
            Memory <br /> <span className="italic text-neon-orange">Leaks.</span>
          </h1>
        </div>
      </Section>

      <Section id="blogs-grid" backgroundColor="bg-deep-black" textColor="text-white" className="py-32 min-h-screen">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-24">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-24">
            {blogPosts.map((post, idx) => (
              <BlogCard 
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                type={post.type}
                image={post.image}
                delay={0.1 * idx}
              />
            ))}
          </div>
        )}
      </Section>

      <Section id="blog-cta" backgroundColor="bg-deep-black" textColor="text-white" className="py-24 text-center">
         <div className="max-w-2xl mx-auto space-y-12">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Receive the Transmission.</h2>
            <p className="font-medium text-white/40 text-lg">Subscribe to the structural feed for weekly technical analysis and design experiments.</p>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="YOUR_EMAIL@MAIL.COM" 
                className="flex-grow bg-white/5 border-2 border-white/10 px-8 py-4 font-mono text-xs uppercase tracking-widest outline-none focus:border-neon-orange transition-colors"
                data-hover="true"
              />
              <button className="px-12 py-4 bg-neon-orange text-white font-display text-xl font-black uppercase tracking-tighter hover:bg-white hover:text-deep-black transition-all">
                Subscribe
              </button>
            </div>
         </div>
      </Section>
    </PageTransition>
  );
};
