import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../../services/dataService';
import { BlogPost } from '../../../data';

const emptyPost: BlogPost = {
  id: '',
  title: '',
  excerpt: '',
  content: '',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
  type: '',
  image: '',
};

export const AdminBlogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    getBlogPosts().then((data) => { setPosts(data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...emptyPost });
    setError('');
    setModalOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing({ ...p });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.id.trim() || !editing.title.trim()) { setError('ID and Title are required.'); return; }
    setSaving(true);
    setError('');
    try {
      const exists = posts.find((p) => p.id === editing.id);
      if (exists) await updateBlogPost(editing.id, editing);
      else await createBlogPost(editing);
      load();
      setModalOpen(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    setDeleting(id);
    try { await deleteBlogPost(id); load(); }
    catch { setError('Failed to delete'); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">Blog Posts ({posts.length})</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#FF4D00]/80 transition-colors"
        >
          <Plus size={14} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-2">
          {posts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                {p.image && (
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-mono text-sm font-bold text-white truncate">{p.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px] text-[#FF4D00]">{p.type}</span>
                    <span className="font-mono text-[10px] text-white/20">•</span>
                    <span className="font-mono text-[10px] text-white/20">{p.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="p-2 text-white/20 hover:text-white transition-colors"><Pencil size={14} /></button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="p-2 text-white/20 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  {deleting === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <div className="py-16 text-center border border-dashed border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">No blog posts yet. Write your first one.</p>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-2xl bg-[#0f0f0f] border border-white/10 p-8 my-8 relative"
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"><X size={20} /></button>
              <h3 className="font-mono text-sm uppercase tracking-widest text-white font-bold mb-8">
                {posts.find((p) => p.id === editing.id) ? 'Edit Post' : 'New Post'}
              </h3>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <F label="ID (slug)" value={editing.id} onChange={(v) => setEditing({ ...editing, id: v })} placeholder="my-post-title" disabled={!!posts.find((p) => p.id === editing.id)} />
                  <F label="Type / Category" value={editing.type} onChange={(v) => setEditing({ ...editing, type: v })} placeholder="Engineering" />
                </div>
                <F label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="Post Title" />
                <F label="Date" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} placeholder="MAY 03, 2026" />
                <F label="Excerpt" value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} placeholder="Brief summary..." textarea rows={2} />
                <F label="Image URL" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} placeholder="https://..." />
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold block">
                    Content (Markdown supported: **bold**, *italic*, ## Headers, &gt; blockquote)
                  </label>
                  <textarea
                    value={editing.content}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    placeholder={"## Introduction\n\nWrite your blog content here...\n\n> A great quote\n\nMore content..."}
                    rows={12}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-xs text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all resize-y"
                  />
                </div>

                {error && <p className="font-mono text-[10px] uppercase tracking-widest text-red-400">{error}</p>}

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-white/10 text-white/40 font-mono text-[10px] uppercase tracking-widest hover:border-white/30 transition-colors">Cancel</button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-3 bg-[#FF4D00] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#FF4D00]/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? 'Saving...' : 'Save Post'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FProps { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean; rows?: number; disabled?: boolean; }
const F: React.FC<FProps> = ({ label, value, onChange, placeholder, textarea, rows = 3, disabled }) => (
  <div className="space-y-1">
    <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold block">{label}</label>
    {textarea ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} disabled={disabled}
        className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-xs text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all resize-none disabled:opacity-40" />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-xs text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all disabled:opacity-40" />
    )}
  </div>
);
