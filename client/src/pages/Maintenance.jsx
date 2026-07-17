import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STATUS_CONFIG = {
  Active: {
    classes: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700/50',
    dot: 'bg-yellow-500',
  },
  Closed: {
    classes: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700/50',
    dot: 'bg-green-500',
  },
};

export default function Maintenance() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ vehicle_id: '', description: '', cost: '' });
  const [closing, setClosing] = useState(null);
  const [closeCost, setCloseCost] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [m, v] = await Promise.all([
        api.get('/maintenance'),
        api.get('/vehicles/available'),
      ]);
      setLogs(m.data);
      setVehicles(v.data);
    } catch {
      toast.error('Failed to load maintenance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/maintenance', form);
      toast.success('Maintenance opened — vehicle moved to In Shop');
      setShowForm(false);
      setForm({ vehicle_id: '', description: '', cost: '' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error creating record');
    }
  };

  const handleClose = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/maintenance/${closing}/close`, { cost: closeCost || undefined });
      toast.success('Maintenance closed — vehicle restored to Available');
      setClosing(null);
      setCloseCost('');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error closing record');
    }
  };

  const activeCount = logs.filter(l => l.status === 'Active').length;
  const closedCount = logs.filter(l => l.status === 'Closed').length;

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-4">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#737686] dark:text-[#64748b] mb-1 font-medium">
              <span>Fleet Operations</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#121c2a] dark:text-[#f1f5f9]">Maintenance</span>
            </div>
            <h2 className="text-xl font-bold text-[#121c2a] dark:text-[#f1f5f9]">Maintenance & Service</h2>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <span className="material-symbols-outlined text-sm">add</span>
            New Record
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1">Total Records</p>
            <p className="text-2xl font-bold text-[#121c2a] dark:text-[#f1f5f9]">{logs.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{activeCount}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{closedCount}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[#737686] dark:text-[#64748b] mb-1">Vehicles in Shop</p>
            <p className="text-2xl font-bold text-[#0d47a1] dark:text-blue-400">{activeCount}</p>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden flex-1">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e5f1] dark:border-[#334155]">
            <h3 className="text-sm font-semibold text-[#121c2a] dark:text-[#f1f5f9]">Maintenance Records</h3>
            <span className="text-xs text-[#737686] dark:text-[#64748b]">{logs.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-[#f8f9ff] dark:bg-[#0f172a]">
                <tr>
                  {['#ID', 'Vehicle', 'Description', 'Est. Cost', 'Opened', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-xs font-semibold text-[#737686] dark:text-[#64748b] border-b border-[#e2e5f1] dark:border-[#334155]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm text-[#121c2a] dark:text-[#f1f5f9] divide-y divide-[#e2e5f1] dark:divide-[#334155]">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(7)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="skeleton h-4 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <span className="material-symbols-outlined text-4xl text-[#c3c6d7] dark:text-[#334155] block mb-2">build_circle</span>
                      <p className="text-sm text-[#737686] dark:text-[#64748b]">No maintenance records yet</p>
                    </td>
                  </tr>
                ) : logs.map(m => {
                  const cfg = STATUS_CONFIG[m.status] || STATUS_CONFIG.Active;
                  return (
                    <tr key={m.id} className="table-row-hover">
                      <td className="px-4 py-3 font-mono text-xs text-[#737686] dark:text-[#64748b]">#{m.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{m.vehicle_name}</div>
                        <div className="text-xs text-[#737686] dark:text-[#64748b]">{m.registration_number}</div>
                      </td>
                      <td className="px-4 py-3 max-w-[200px] truncate" title={m.description}>{m.description}</td>
                      <td className="px-4 py-3 font-mono">₹{Number(m.cost || 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-[#737686] dark:text-[#64748b]">{m.started_at?.slice(0, 10) || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`status-chip ${cfg.classes}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                          {m.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {m.status === 'Active' && (
                          <button
                            onClick={() => { setClosing(m.id); setCloseCost(m.cost || ''); }}
                            className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Close Record
                          </button>
                        )}
                        {m.status === 'Closed' && (
                          <span className="text-xs text-[#737686] dark:text-[#64748b] flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            Closed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Maintenance Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-panel max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">build</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#121c2a] dark:text-[#f1f5f9]">New Maintenance Record</h3>
                  <p className="text-xs text-[#737686] dark:text-[#64748b]">Vehicle will be moved to "In Shop"</p>
                </div>
              </div>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f2fc] dark:hover:bg-[#334155] text-[#737686] dark:text-[#64748b] transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Vehicle *</label>
                <select required value={form.vehicle_id}
                  onChange={e => setForm({ ...form, vehicle_id: e.target.value })}
                  className="form-select">
                  <option value="">Select a vehicle...</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.registration_number} — {v.name}</option>
                  ))}
                </select>
                {vehicles.length === 0 && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    No available vehicles (on-trip vehicles cannot enter the shop)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Issue Description *</label>
                <textarea required rows={3} placeholder="Describe the maintenance issue..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="form-textarea" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Estimated Cost (₹)</label>
                <input type="number" min="0" placeholder="0"
                  value={form.cost}
                  onChange={e => setForm({ ...form, cost: e.target.value })}
                  className="form-input" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
                <button type="submit" className="btn-primary">
                  <span className="material-symbols-outlined text-sm">build</span>
                  Open Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Close Maintenance Modal */}
      {closing && (
        <div className="modal-overlay">
          <div className="modal-panel max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#121c2a] dark:text-[#f1f5f9]">Close Maintenance #{closing}</h3>
                  <p className="text-xs text-[#737686] dark:text-[#64748b]">Vehicle returns to Available status</p>
                </div>
              </div>
              <button onClick={() => setClosing(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f2fc] dark:hover:bg-[#334155] text-[#737686] dark:text-[#64748b] transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleClose} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#121c2a] dark:text-[#f1f5f9] mb-1.5">Final Cost (₹)</label>
                <input type="number" min="0" placeholder="Enter actual repair cost..."
                  value={closeCost}
                  onChange={e => setCloseCost(e.target.value)}
                  className="form-input" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setClosing(null)} className="btn-ghost">Cancel</button>
                <button type="submit" className="btn-success">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Close & Restore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
