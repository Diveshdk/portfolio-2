import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { getAwards, createAward, updateAward, deleteAward } from '../../../services/dataService';
import { Award } from '../../../data';

const empty: Omit<Award, 'id'> = { name: '', rank: '', year: new Date().getFullYear().toString(), category: '' };

export const AdminCompetitions: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Award | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    getAwards().then((data) => { setAwards(data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...empty });
    setError('');
    setModalOpen(true);
  };

  const openEdit = (a: Award) => {
    setEditing({ ...a });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.name.trim() || !editing.rank.trim()) { setError('Name and Rank are required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (editing.id) await updateAward(editing.id, editing);
      else await createAward(editing);
      load();
      setModalOpen(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this award?')) return;
    setDeleting(id);
    try { await deleteAward(id); load(); }
    catch { setError('Failed to delete'); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">Competitions & Awards ({awards.length})</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#FF4D00]/80 transition-colors"
        >
          <Plus size={14} /> New Award
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-white/5 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-2">
          {awards.map((a, i) => (
            <motion.div
              key={a.id || a.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] text-white/20 w-10">{a.year}</span>
                <div>
                  <p className="font-mono text-sm font-bold text-white">{a.name}</p>
                  <p className="font-mono text-[10px] text-white/30 uppercase">{a.category}</p>
                </div>
                <span className="font-mono text-xs text-[#FF4D00] font-bold">{a.rank}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(a)} className="p-2 text-white/20 hover:text-white transition-colors"><Pencil size={14} /></button>
                <button
                  onClick={() => a.id && handleDelete(a.id)}
                  disabled={!a.id || deleting === a.id}
                  className="p-2 text-white/20 hover:text-red-400 transition-colors disabled:opacity-30"
                >
                  {deleting === a.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </motion.div>
          ))}
          {awards.length === 0 && (
            <div className="py-16 text-center border border-dashed border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">No awards yet. Add your first one.</p>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-md bg-[#0f0f0f] border border-white/10 p-8 relative"
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"><X size={20} /></button>
              <h3 className="font-mono text-sm uppercase tracking-widest text-white font-bold mb-8">
                {editing.id ? 'Edit Award' : 'New Award'}
              </h3>

              <div className="space-y-4">
                {(['name', 'rank', 'year', 'category'] as const).map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold block">{field}</label>
                    <input
                      type="text"
                      value={editing[field] || ''}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                      placeholder={{ name: 'ETH Global', rank: 'Top 10 Finalist', year: '2025', category: 'Hackathon' }[field]}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2 font-mono text-xs text-white placeholder:text-white/10 focus:border-[#FF4D00]/50 focus:outline-none transition-all"
                    />
                  </div>
                ))}

                {error && <p className="font-mono text-[10px] uppercase tracking-widest text-red-400">{error}</p>}

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-white/10 text-white/40 font-mono text-[10px] uppercase tracking-widest hover:border-white/30 transition-colors">Cancel</button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-3 bg-[#FF4D00] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#FF4D00]/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? 'Saving...' : 'Save Award'}
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
