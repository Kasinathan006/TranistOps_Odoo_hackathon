import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Available: 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/20',
  'On Trip': 'bg-secondary-container text-on-secondary-container border-outline-variant',
  Suspended: 'bg-error/10 text-error border-error/20',
};

const EMPTY = {
  name: '', license_number: '', license_category: 'LMV', license_expiry: '',
  contact_number: '', safety_score: 100, status: 'Available'
};

const isExpired = (d) => new Date(d) <= new Date();

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [filter, setFilter] = useState({ status: '', category: '' });

  const load = async () => {
    const params = new URLSearchParams();
    if (filter.status) params.append('status', filter.status);
    if (filter.category) params.append('category', filter.category);
    const { data } = await api.get(`/drivers?${params}`);
    setDrivers(data);
  };

  useEffect(() => { load(); }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/drivers/${editing}`, form);
        toast.success('Driver updated');
      } else {
        await api.post('/drivers', form);
        toast.success('Driver registered');
      }
      setShowForm(false);
      setForm(EMPTY);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  const handleEdit = (d) => {
    setForm({ ...d, license_expiry: d.license_expiry?.slice(0, 10) });
    setEditing(d.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this driver?')) return;
    try {
      await api.delete(`/drivers/${id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.license_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto p-container-padding">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col gap-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 mb-2">
          <div>
            <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary mb-1">
              <span>Fleet Operations</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface">Drivers</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-on-surface">Drivers Management</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-secondary">search</span>
              <input 
                type="text" 
                placeholder="Search drivers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 h-9 pl-9 pr-4 rounded border border-outline-variant bg-surface text-body-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY); }}
              className="h-9 px-4 flex items-center gap-2 rounded bg-primary-container text-on-primary text-label-md font-label-md hover:bg-surface-tint transition-colors duration-150 shadow-sm whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Driver
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-surface shrink-0">
            <div className="flex gap-4">
              <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}
                className="h-9 px-3 rounded border border-outline-variant bg-surface text-body-sm focus:ring-primary focus:border-primary outline-none">
                <option value="">All Status</option>
                <option>Available</option>
                <option>On Trip</option>
                <option>Suspended</option>
              </select>
              <select value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}
                className="h-9 px-3 rounded border border-outline-variant bg-surface text-body-sm focus:ring-primary focus:border-primary outline-none">
                <option value="">All Categories</option>
                <option>LMV</option>
                <option>HMV</option>
                <option>MCWG</option>
                <option>HGV</option>
              </select>
            </div>
            <div className="flex items-center gap-4 text-body-sm font-body-sm text-secondary">
              <span>Total Drivers: <strong className="text-on-surface">{filteredDrivers.length}</strong></span>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-surface shadow-[0_1px_0_0_#c3c6d7]">
                <tr>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Driver Name</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">License No.</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Category</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Expiry</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Contact</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Safety Score</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary border-b border-outline-variant">Status</th>
                  <th className="px-4 py-2.5 text-label-sm font-label-sm text-secondary w-20 border-b border-outline-variant text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-outline-variant/50">
                {filteredDrivers.map(d => (
                  <tr key={d.id} className="table-row-hover h-[40px] even:bg-surface/50">
                    <td className="px-4 py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                        </div>
                        <span className="font-medium">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-1 font-code">{d.license_number}</td>
                    <td className="px-4 py-1 text-secondary">{d.license_category}</td>
                    <td className={`px-4 py-1 ${isExpired(d.license_expiry) ? 'text-error font-medium' : 'text-secondary'}`}>
                      <div className="flex items-center gap-2">
                        {d.license_expiry?.slice(0, 10)}
                        {isExpired(d.license_expiry) && (
                          <span className="px-1.5 py-0.5 rounded bg-error/10 text-error text-[10px] font-bold uppercase tracking-wider">
                            Expired
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-1 text-secondary">{d.contact_number || '—'}</td>
                    <td className="px-4 py-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`material-symbols-outlined text-[16px] ${d.safety_score >= 90 ? 'text-tertiary-container' : d.safety_score >= 70 ? 'text-primary' : 'text-error'}`}>
                          health_and_safety
                        </span>
                        <span className="font-medium">{d.safety_score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-1">
                      <span className={`status-chip border ${STATUS_COLORS[d.status]}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-1 text-center">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(d)} className="text-secondary hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="text-secondary hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDrivers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-secondary font-body-lg">
                      <div className="flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-[32px] text-outline mb-2">group_off</span>
                        <p>No drivers found</p>
                      </div>
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
                <h3 className="font-headline-sm text-on-surface">{editing ? 'Edit Driver' : 'Register Driver'}</h3>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Full Name *</label>
                  <input required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. John Doe" />
                </div>

                {!editing && (
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">License Number *</label>
                    <input required
                      value={form.license_number}
                      onChange={e => setForm({ ...form, license_number: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-code" placeholder="e.g. DL-1234567890" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Category</label>
                    <select value={form.license_category}
                      onChange={e => setForm({ ...form, license_category: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
                      <option>LMV</option><option>HMV</option><option>MCWG</option><option>HGV</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">License Expiry *</label>
                    <input type="date" required
                      value={form.license_expiry}
                      onChange={e => setForm({ ...form, license_expiry: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Contact No.</label>
                    <input
                      value={form.contact_number || ''}
                      onChange={e => setForm({ ...form, contact_number: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="+91..." />
                  </div>
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Safety Score</label>
                    <input type="number" min="0" max="100"
                      value={form.safety_score}
                      onChange={e => setForm({ ...form, safety_score: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                  </div>
                </div>

                {editing && (
                  <div>
                    <label className="block text-label-md font-medium text-on-surface mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
                      <option>Available</option><option>Suspended</option>
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
