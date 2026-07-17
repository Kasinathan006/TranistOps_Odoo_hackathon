import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STATUS_MAP = {
  Dispatched: {
    label: 'In Transit',
    cls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500 animate-pulse',
    icon: null,
  },
  Cancelled: {
    label: 'Cancelled',
    cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    dot: 'bg-red-500',
    icon: null,
  },
  Completed: {
    label: 'Completed',
    cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    dot: null,
    icon: 'check_circle',
  },
  Draft: {
    label: 'Pending',
    cls: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
    dot: null,
    icon: 'schedule',
  },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.Draft;
  return (
    <span className={`status-chip border text-xs font-medium ${s.cls}`}>
      {s.dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />}
      {s.icon && <span className="material-symbols-outlined text-[12px] icon-fill">{s.icon}</span>}
      {s.label}
    </span>
  );
};

const ModalInput = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-on-surface-variant mb-1">{label}</label>
    {children}
  </div>
);

const EMPTY_FORM = {
  source: '', destination: '', vehicle_id: '', driver_id: '',
  cargo_weight: '', planned_distance: '', revenue: ''
};

const EMPTY_COMPLETE = { final_odometer: '', fuel_consumed: '', actual_distance: '' };

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showComplete, setShowComplete] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [completeForm, setCompleteForm] = useState(EMPTY_COMPLETE);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    try {
      const [t, v, d] = await Promise.all([
        api.get('/trips'),
        api.get('/vehicles/available'),
        api.get('/drivers/available')
      ]);
      setTrips(t.data);
      setVehicles(v.data);
      setDrivers(d.data);
    } catch {
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/trips', form);
      toast.success('Trip created successfully');
      setShowCreate(false);
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error creating trip');
    }
  };

  const dispatch = async (id) => {
    try {
      await api.patch(`/trips/${id}/dispatch`);
      toast.success('Trip dispatched — Vehicle & Driver now On Trip');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error dispatching trip');
    }
  };

  const complete = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/trips/${showComplete}/complete`, completeForm);
      toast.success('Trip completed — Vehicle & Driver now Available');
      setShowComplete(null);
      setCompleteForm(EMPTY_COMPLETE);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error completing trip');
    }
  };

  const cancel = async (id) => {
    if (!confirm('Cancel this trip?')) return;
    try {
      await api.patch(`/trips/${id}/cancel`);
      toast.success('Trip cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error cancelling trip');
    }
  };

  const counts = {
    all: trips.length,
    active: trips.filter(t => t.status === 'Dispatched').length,
    pending: trips.filter(t => t.status === 'Draft').length,
    completed: trips.filter(t => t.status === 'Completed').length,
    cancelled: trips.filter(t => t.status === 'Cancelled').length,
  };

  const filtered = filter === 'all' ? trips
    : filter === 'active' ? trips.filter(t => t.status === 'Dispatched')
    : filter === 'pending' ? trips.filter(t => t.status === 'Draft')
    : filter === 'completed' ? trips.filter(t => t.status === 'Completed')
    : trips.filter(t => t.status === 'Cancelled');

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-1.5">
            <span>Logistics</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-medium">Trips</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Trips & Logistics Log</h1>
          <p className="text-sm text-on-surface-variant mt-1">End-to-end dispatch tracking & proof of delivery</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary gap-2">
          <span className="material-symbols-outlined text-base">add</span>
          New Trip
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="skeleton h-3 w-16 rounded" />
                <div className="skeleton h-6 w-8 rounded" />
              </div>
            </div>
          ))
        ) : (
          <>
            {[
              { label: 'Total Trips', val: counts.all, icon: 'route', cls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
              { label: 'In Transit', val: counts.active, icon: 'local_shipping', cls: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
              { label: 'Completed', val: counts.completed, icon: 'check_circle', cls: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
              { label: 'Cancelled', val: counts.cancelled, icon: 'cancel', cls: 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400' },
            ].map(({ label, val, icon, cls }) => (
              <div key={label} className="card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
                  <span className="material-symbols-outlined text-lg icon-fill">{icon}</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-medium">{label}</p>
                  <p className="text-2xl font-bold text-on-surface">{val}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 bg-[#f0f2fc] dark:bg-[#1e293b] p-1 rounded-xl w-fit">
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'In Transit' },
          { key: 'pending', label: 'Pending' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              filter === key
                ? 'bg-white dark:bg-[#0f172a] text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {label} <span className={`ml-1 text-[10px] ${filter === key ? 'text-primary' : 'text-on-surface-variant'}`}>({counts[key]})</span>
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-14 w-full rounded-xl" />)}
            </div>
          ) : (
            <table className="w-full text-sm dense-table">
              <thead>
                <tr>
                  <th className="w-20">Trip ID</th>
                  <th>Status</th>
                  <th>Vehicle / Driver</th>
                  <th>Route</th>
                  <th>Cargo & Distance</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <span className="material-symbols-outlined block text-4xl text-on-surface-variant opacity-30 mb-2">route</span>
                      <span className="text-on-surface-variant">No trips found</span>
                    </td>
                  </tr>
                )}
                {filtered.map(t => (
                  <tr key={t.id}>
                    <td>
                      <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        #{t.id}
                      </span>
                    </td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400 icon-fill">local_shipping</span>
                        </div>
                        <div>
                          <p className="font-medium text-on-surface text-xs leading-tight">{t.vehicle_name}</p>
                          <p className="text-[11px] text-on-surface-variant leading-tight">{t.driver_name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-medium text-on-surface truncate max-w-[100px]">{t.source}</span>
                        <span className="material-symbols-outlined text-on-surface-variant text-base shrink-0">arrow_right_alt</span>
                        <span className="font-medium text-on-surface truncate max-w-[100px]">{t.destination}</span>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs text-on-surface">{t.cargo_weight} kg</p>
                      <p className="text-[11px] text-on-surface-variant">{t.planned_distance} km</p>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {t.status === 'Draft' && (
                          <>
                            <button onClick={() => dispatch(t.id)}
                              className="btn-primary h-7 px-2.5 text-xs gap-1">
                              <span className="material-symbols-outlined text-xs">send</span>
                              Dispatch
                            </button>
                            <button onClick={() => cancel(t.id)}
                              className="btn-ghost h-7 px-2.5 text-xs text-red-500 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                              Cancel
                            </button>
                          </>
                        )}
                        {t.status === 'Dispatched' && (
                          <>
                            <button onClick={() => setShowComplete(t.id)}
                              className="btn-success h-7 px-2.5 text-xs gap-1">
                              <span className="material-symbols-outlined text-xs">check_circle</span>
                              Complete
                            </button>
                            <button onClick={() => cancel(t.id)}
                              className="btn-ghost h-7 px-2.5 text-xs text-red-500 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                              Cancel
                            </button>
                          </>
                        )}
                        {(t.status === 'Completed' || t.status === 'Cancelled') && (
                          <span className="text-xs text-on-surface-variant italic">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create Trip Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="modal-panel max-w-lg w-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Create New Trip</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Fill out route and logistics details</p>
              </div>
              <button onClick={() => setShowCreate(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f2fc] dark:hover:bg-[#334155] text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <ModalInput label="Origin City">
                  <input className="form-input" placeholder="e.g. Mumbai" required value={form.source}
                    onChange={e => setForm({ ...form, source: e.target.value })} />
                </ModalInput>
                <ModalInput label="Destination City">
                  <input className="form-input" placeholder="e.g. Delhi" required value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })} />
                </ModalInput>
              </div>

              <ModalInput label="Assign Vehicle">
                <select className="form-select" required value={form.vehicle_id}
                  onChange={e => setForm({ ...form, vehicle_id: e.target.value })}>
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.registration_number} — {v.name} (Max: {v.max_load_capacity} kg)
                    </option>
                  ))}
                </select>
                {vehicles.length === 0 && <p className="text-xs text-red-500 mt-1">No vehicles available</p>}
              </ModalInput>

              <ModalInput label="Assign Driver">
                <select className="form-select" required value={form.driver_id}
                  onChange={e => setForm({ ...form, driver_id: e.target.value })}>
                  <option value="">Select Driver</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>{d.name} — {d.license_category}</option>
                  ))}
                </select>
                {drivers.length === 0 && <p className="text-xs text-red-500 mt-1">No drivers available</p>}
              </ModalInput>

              <div className="grid grid-cols-3 gap-3">
                <ModalInput label="Cargo Weight (kg)">
                  <input className="form-input" placeholder="e.g. 5000" type="number" min="0" required
                    value={form.cargo_weight} onChange={e => setForm({ ...form, cargo_weight: e.target.value })} />
                </ModalInput>
                <ModalInput label="Distance (km)">
                  <input className="form-input" placeholder="e.g. 1400" type="number" min="0" required
                    value={form.planned_distance} onChange={e => setForm({ ...form, planned_distance: e.target.value })} />
                </ModalInput>
                <ModalInput label="Revenue (₹)">
                  <input className="form-input" placeholder="Optional" type="number" min="0"
                    value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })} />
                </ModalInput>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1">
                  <span className="material-symbols-outlined text-base">send</span>
                  Create Trip
                </button>
                <button type="button" onClick={() => setShowCreate(false)} className="btn-ghost flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complete Trip Modal */}
      {showComplete && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowComplete(null)}>
          <div className="modal-panel max-w-sm w-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Complete Trip #{showComplete}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Enter final trip metrics</p>
              </div>
              <button onClick={() => setShowComplete(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f2fc] dark:hover:bg-[#334155] text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form onSubmit={complete} className="space-y-4">
              <ModalInput label="Final Odometer (km)">
                <input className="form-input" placeholder="e.g. 45200" type="number" min="0" required
                  value={completeForm.final_odometer}
                  onChange={e => setCompleteForm({ ...completeForm, final_odometer: e.target.value })} />
              </ModalInput>
              <ModalInput label="Actual Distance (km)">
                <input className="form-input" placeholder="e.g. 1380" type="number" min="0" required
                  value={completeForm.actual_distance}
                  onChange={e => setCompleteForm({ ...completeForm, actual_distance: e.target.value })} />
              </ModalInput>
              <ModalInput label="Fuel Consumed (liters)">
                <input className="form-input" placeholder="e.g. 180" type="number" min="0" required
                  value={completeForm.fuel_consumed}
                  onChange={e => setCompleteForm({ ...completeForm, fuel_consumed: e.target.value })} />
              </ModalInput>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-success flex-1">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Mark Complete
                </button>
                <button type="button" onClick={() => setShowComplete(null)} className="btn-ghost flex-1">
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
