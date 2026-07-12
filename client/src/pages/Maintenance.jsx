import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Active: 'bg-yellow-100 text-yellow-700',
  Closed: 'bg-green-100 text-green-700',
};

export default function Maintenance() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ vehicle_id: '', description: '', cost: '' });
  const [closing, setClosing] = useState(null);
  const [closeCost, setCloseCost] = useState('');

  const load = async () => {
    const [m, v] = await Promise.all([
      api.get('/maintenance'),
      api.get('/vehicles/available'),
    ]);
    setLogs(m.data);
    setVehicles(v.data);
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
      toast.error(err.response?.data?.error || 'Error');
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
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Maintenance & Service</h2>
        <button onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + New Record
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['ID', 'Vehicle', 'Description', 'Cost', 'Opened', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map(m => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">#{m.id}</td>
                <td className="px-4 py-3">{m.vehicle_name} <span className="text-gray-400">({m.registration_number})</span></td>
                <td className="px-4 py-3">{m.description}</td>
                <td className="px-4 py-3">₹{Number(m.cost).toLocaleString()}</td>
                <td className="px-4 py-3">{m.started_at?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[m.status]}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {m.status === 'Active' && (
                    <button onClick={() => { setClosing(m.id); setCloseCost(m.cost); }}
                      className="text-green-600 hover:underline">Close</button>
                  )}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No maintenance records yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New maintenance modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">New Maintenance Record</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <select required value={form.vehicle_id}
                onChange={e => setForm({ ...form, vehicle_id: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Vehicle *</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.registration_number} — {v.name}</option>
                ))}
              </select>
              {vehicles.length === 0 && (
                <p className="text-xs text-red-500">No available vehicles (on-trip vehicles cannot enter the shop)</p>
              )}
              <textarea placeholder="Description *" required rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Estimated Cost (₹)" type="number" min="0"
                value={form.cost}
                onChange={e => setForm({ ...form, cost: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                  Open Record
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Close maintenance modal */}
      {closing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-4">Close Maintenance #{closing}</h3>
            <form onSubmit={handleClose} className="space-y-3">
              <input placeholder="Final Cost (₹)" type="number" min="0"
                value={closeCost}
                onChange={e => setCloseCost(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                  Close & Restore
                </button>
                <button type="button" onClick={() => setClosing(null)}
                  className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
