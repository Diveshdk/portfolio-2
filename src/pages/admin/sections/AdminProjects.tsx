import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, Loader2, ExternalLink, Github } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject } from '../../../services/dataService';
import { Project } from '../../../data';

const emptyProject: Omit<Project, 'id'> & { id: string } = {
  id: '',
  title: '',
  description: '',
  fullDescription: '',
  tags: [],
  date: new Date().getFullYear().toString(),
  github: '',
  link: '',
  isFeatured: false,
  image: '',
  stats: [],
};

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof emptyProject | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [statsInput, setStatsInput] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    getProjects().then((data) => { setProjects(data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...emptyProject });
    setTagsInput('');
    setStatsInput('');
    setError('');
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing({ ...p, id: p.id, fullDescription: p.fullDescription || '', github: p.github || '', link: p.link || '', image: p.image || '', stats: p.stats || [] });
    setTagsInput(p.tags.join(', '));
    setStatsInput((p.stats || []).map((s) => `${s.label}:${s.value}`).join(', '));
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.id.trim() || !editing.title.trim()) { setError('ID and Title are required.'); return; }
    setSaving(true);
    setError('');
    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
      const stats = statsInput.split(',').map((s) => {
        const [label, value] = s.split(':').map((x) => x.trim());
        return label && value ? { label, value } : null;
      }).filter(Boolean) as { label: string; value: string }[];

      const payload = { ...editing, tags, stats };
      const exists = projects.find((p) => p.id === editing.id);
      if (exists) await updateProject(editing.id, payload);
      else await createProject(payload);
      load();
      setModalOpen(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    try { await deleteProject(id); load(); }
    catch { setError('Failed to delete'); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">Projects ({projects.length})</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#FF4D00]/80 transition-colors"
        >
          <Plus size={14} /> New Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {p.image && (
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-sm font-bold text-white truncate">{p.title}</p>
                    {p.isFeatured && <span className="px-2 py-0.5 bg-[#FF4D00]/20 text-[#FF4D00] font-mono text-[8px] uppercase tracking-widest flex-shrink-0">Featured</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px] text-white/20">{p.date}</span>
                    <span className="font-mono text-[10px] text-white/20">•</span>
                    <span className="font-mono text-[10px] text-white/20 truncate">{p.tags.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-2 text-white/20 hover:text-white transition-colors"><Github size={14} /></a>}
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="p-2 text-white/20 hover:text-white transition-colors"><ExternalLink size={14} /></a>}
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
          {projects.length === 0 && (
            <div className="py-16 text-center border border-dashed border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">No projects yet. Add your first one.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-2xl bg-[#0f0f0f] border border-white/10 p-8 my-8 relative"
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <h3 className="font-mono text-sm uppercase tracking-widest text-white font-bold mb-8">
                {projects.find((p) => p.id === editing.id) ? 'Edit Project' : 'New Project'}
              </h3>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="ID (slug)" value={editing.id} onChange={(v) => setEditing({ ...editing, id: v })} placeholder="my-project" disabled={!!projects.find((p) => p.id === editing.id)} />
                  <Field label="Year" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} placeholder="2025" />
                </div>
                <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="Project Name" />
                <Field label="Short Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} placeholder="Brief description..." textarea />
                <Field label="Full Description" value={editing.fullDescription || ''} onChange={(v) => setEditing({ ...editing, fullDescription: v })} placeholder="Detailed description..." textarea />
                <Field label="Image URL" value={editing.image || ''} onChange={(v) => setEditing({ ...editing, image: v })} placeholder="https://..." />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="GitHub URL" value={editing.github || ''} onChange={(v) => setEditing({ ...editing, github: v })} placeholder="https://github.com/..." />
                  <Field label="Live URL" value={editing.link || ''} onChange={(v) => setEditing({ ...editing, link: v })} placeholder="https://..." />
                </div>
                <Field label="Tags (comma separated)" value={tagsInput} onChange={setTagsInput} placeholder="React, TypeScript, Node.js" />
                <Field label="Stats (Label:Value, comma separated)" value={statsInput} onChange={setStatsInput} placeholder="Users:10K+, Uptime:99.9%" />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={editing.isFeatured || false} onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-[#FF4D00]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Mark as Featured (spans 2 columns)</span>
                </label>

                {error && <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 flex items-center gap-2"><X size={10} />{error}</p>}

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-white/10 text-white/40 font-mono text-[10px] uppercase tracking-widest hover:border-white/30 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-3 bg-[#FF4D00] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#FF4D00]/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? 'Saving...' : 'Save Project'}
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

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  disabled?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, placeholder, textarea, disabled }) => (
  <div className="space-y-1">
    <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold block">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        disabled={disabled}
        className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-xs text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all resize-none disabled:opacity-40"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-xs text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all disabled:opacity-40"
      />
    )}
  </div>
);
