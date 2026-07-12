import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Available: 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/20',
  'On Trip': 'bg-secondary-container text-on-secondary-container border-outline-variant',
  'In Shop': 'bg-error/10 text-error border-error/20',
  Retired: 'bg-surface-variant text-on-surface-variant border-outline-variant',
};

const EMPTY = {
  registration_number: '', name: '', type: 'Truck', max_load_capacity: '',
  odometer: 0, acquisition_cost: '', region: '', status: 'Available'
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({ status: '', type: '' });

  const load = async () => {
    const params = new URLSearchParams();
    if (filter.status) params.append('status', filter.status);
    if (filter.type) params.append('type', filter.type);
    const { data } = await api.get(`/vehicles?${params}`);
    setVehicles(data);
  };

  useEffect(() => { load(); }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/vehicles/${editing}`, form);
        toast.success('Vehicle updated');
      } else {
        await api.post('/vehicles', form);
        toast.success('Vehicle registered');
      }
      setShowForm(false);
      setForm(EMPTY);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  const handleEdit = (v) => {
    setForm(v);
    setEditing(v.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this vehicle?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="flex-1 overflow-auto p-container-padding">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col gap-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mb-2">
          <div>
            <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary mb-1">
              <span>Fleet Operations</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface">Vehicles</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface">Vehicles Management</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY); }}
              className="h-9 px-4 flex items-center gap-2 rounded bg-primary-container text-on-primary text-label-md font-label-md hover:bg-surface-tint transition-colors duration-150 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Vehicle
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-surface shrink-0">
            <div className="flex gap-4">
              <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}
                className="h-9 px-3 rounded border border-outline-variant bg-surface text-body-sm focus:ring-primary focus:border-primary outline-none">
                <option value="">All Status</option>
                <option>Available</option><option>On Trip</option>
                <option>In Shop</option><option>Retired</option>
              </select>
              <select value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })}
                className="h-9 px-3 rounded border border-outline-variant bg-surface text-body-sm focus:ring-primary focus:border-primary outline-none">
                <option value="">All Types</option>
                <option>Truck</option><option>Van</option>
                <option>Car</option><option>Bike</option>
              </select>
            </div>
            <div className="flex items-center gap-4 text-body-sm font-body-sm text-secondary">
              <span>Total Vehicles: <strong className="text-on-surface">{vehicles.length}</strong></span>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-surface shadow-[0_1px_0_0_#c3c6d7]">
                <tr>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Reg No.</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Name</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Type</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant text-right">Capacity (kg)</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant text-right">Odometer (km)</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant text-right">Acq. Cost</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Status</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary w-20 border-b border-outline-variant text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-outline-variant/50">
                {vehicles.map(v => (
                  <tr key={v.id} className="table-row-hover h-[40px] even:bg-surface/50">
                    <td className="px-4 py-1 font-medium">{v.registration_number}</td>
                    <td className="px-4 py-1">{v.name}</td>
                    <td className="px-4 py-1 text-secondary">{v.type}</td>
                    <td className="px-4 py-1 text-right font-code">{v.max_load_capacity}</td>
                    <td className="px-4 py-1 text-right font-code">{v.odometer}</td>
                    <td className="px-4 py-1 text-right font-code">₹{Number(v.acquisition_cost).toLocaleString()}</td>
                    <td className="px-4 py-1">
                      <span className={`status-chip border ${STATUS_COLORS[v.status]}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-1 text-center">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(v)} className="text-secondary hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(v.id)} className="text-secondary hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-secondary font-body-lg">
                      No vehicles found matching criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-scrim/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-xl p-6 w-full max-w-md shadow-lg border border-outline-variant">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-sm text-on-surface">{editing ? 'Edit Vehicle' : 'Register Vehicle'}</h3>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!editing && (
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Registration Number *</label>
                    <input required
                      value={form.registration_number}
                      onChange={e => setForm({ ...form, registration_number: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. MH-01-AB-1234" />
                  </div>
                )}
                
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Vehicle Name/Model *</label>
                  <input required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Tata Ace" />
                </div>

                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Vehicle Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option>Truck</option><option>Van</option><option>Car</option><option>Bike</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Capacity (kg) *</label>
                    <input type="number" min="0" required
                      value={form.max_load_capacity}
                      onChange={e => setForm({ ...form, max_load_capacity: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Cost (₹) *</label>
                    <input type="number" min="0" required
                      value={form.acquisition_cost}
                      onChange={e => setForm({ ...form, acquisition_cost: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Region</label>
                  <input
                    value={form.region || ''} onChange={e => setForm({ ...form, region: e.target.value })}
                    className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. North Zone" />
                </div>

                {editing && (
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
                      <option>Available</option><option>On Trip</option><option>In Shop</option><option>Retired</option>
                    </select>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 mt-6">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="h-9 px-4 rounded text-label-md font-label-md text-secondary hover:bg-surface-variant transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="h-9 px-4 rounded bg-primary-container text-on-primary text-label-md font-label-md hover:bg-surface-tint transition-colors shadow-sm">
                    {editing ? 'Update' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

