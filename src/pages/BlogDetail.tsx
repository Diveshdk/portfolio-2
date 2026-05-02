import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { Section } from '../components/Section';
import { getBlogPostById } from '../services/dataService';
import { BlogPost } from '../data';
import { PageTransition } from '../components/PageTransition';

// Simple markdown-ish renderer: bold, italic, headers, blockquotes, code
function renderMarkdown(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('### ')) return <h3 key={i} className="text-3xl mt-12 mb-6 font-black uppercase tracking-tighter">{line.slice(4)}</h3>;
    if (line.startsWith('## ')) return <h2 key={i} className="text-4xl mt-12 mb-6 font-black uppercase tracking-tighter">{line.slice(3)}</h2>;
    if (line.startsWith('# ')) return <h1 key={i} className="text-5xl mt-12 mb-6 font-black uppercase tracking-tighter">{line.slice(2)}</h1>;
    if (line.startsWith('> ')) return <div key={i} className="p-8 border-l-4 border-neon-orange bg-deep-black/5 italic font-bold my-6">{line.slice(2)}</div>;
    if (line.startsWith('```')) return null;
    if (line.trim() === '') return <br key={i} />;
    // inline bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('*') && part.endsWith('*')) return <em key={j}>{part.slice(1, -1)}</em>;
      return part;
    });
    return <p key={i} className="my-4">{parts}</p>;
  });
}

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBlogPostById(id).then((data) => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-deep-black/10 border-t-neon-orange rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-deep-black/30">Decrypting journal entry...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <Section id="not-found" backgroundColor="bg-white" textColor="text-deep-black" className="h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="font-display text-9xl font-black italic opacity-10">404</h1>
          <p className="font-display text-4xl uppercase tracking-tighter">Journal Entry Lost</p>
          <Link to="/blogs" className="inline-block px-12 py-4 bg-deep-black text-white font-mono uppercase tracking-widest">
            Back to Archives
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        <div className="pt-32 pb-12 px-6 md:px-12 border-b border-deep-black/5">
          <div className="max-w-4xl mx-auto space-y-8">
            <Link to="/blogs" className="flex items-center gap-2 font-mono text-[10px] text-deep-black/40 hover:text-neon-orange transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
              BACK TO ARCHIVES
            </Link>
            
            <div className="space-y-4">
              <span className="font-mono text-xs text-neon-orange font-bold uppercase tracking-widest">{post.type}</span>
              <h1 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-deep-black">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 pt-4 text-deep-black/40 font-mono text-[10px] uppercase">
                <div className="flex items-center gap-2">
                  <Clock size={12} /> 6 MIN READ
                </div>
                <div>{post.date}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-24 px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-video bg-deep-black mb-16 overflow-hidden border-2 border-deep-black"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <article className="prose prose-xl max-w-none prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-deep-black prose-p:font-medium prose-p:text-deep-black/70 prose-p:leading-relaxed text-deep-black">
            <p className="text-2xl font-bold text-deep-black mb-8 italic">
              {post.excerpt}
            </p>
            <div className="text-lg space-y-4 text-deep-black">
              {renderMarkdown(post.content)}
            </div>
          </article>

          <div className="mt-24 pt-12 border-t border-deep-black/10 flex justify-between items-center">
             <div className="flex gap-4">
                <button 
                  className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest hover:text-neon-orange bg-deep-black text-white px-4 py-2" 
                  data-hover="true"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <Share2 size={14} /> Share Transmission
                </button>
             </div>
             <div className="font-mono text-[10px] text-deep-black/20">
               ID: {post.id.toUpperCase()}
             </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
