import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Dispatched':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-highest text-on-surface text-label-sm font-label-sm border border-outline-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
          In Transit
        </span>
      );
    case 'Cancelled':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded bg-error-container text-on-error-container text-label-sm font-label-sm border border-error/20">
          <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
          Cancelled
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-low text-tertiary text-label-sm font-label-sm border border-outline-variant">
          <span className="material-symbols-outlined text-[12px] mr-1">check</span>
          Completed
        </span>
      );
    case 'Draft':
    default:
      return (
        <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface-variant text-label-sm font-label-sm border border-outline-variant">
          <span className="material-symbols-outlined text-[12px] mr-1">schedule</span>
          Pending
        </span>
      );
  }
};

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showComplete, setShowComplete] = useState(null);
  const [form, setForm] = useState({
    source: '', destination: '', vehicle_id: '', driver_id: '',
    cargo_weight: '', planned_distance: '', revenue: ''
  });
  const [completeForm, setCompleteForm] = useState({
    final_odometer: '', fuel_consumed: '', actual_distance: ''
  });

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
    } catch (err) {
      toast.error('Failed to load trips');
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/trips', form);
      toast.success('Trip created');
      setShowCreate(false);
      setForm({ source: '', destination: '', vehicle_id: '', driver_id: '', cargo_weight: '', planned_distance: '', revenue: '' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error creating trip');
    }
  };

  const dispatch = async (id) => {
    try {
      await api.patch(`/trips/${id}/dispatch`);
      toast.success('Trip dispatched — Vehicle and Driver are now On Trip');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error dispatching trip');
    }
  };

  const complete = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/trips/${showComplete}/complete`, completeForm);
      toast.success('Trip completed — Vehicle and Driver are now Available');
      setShowComplete(null);
      setCompleteForm({ final_odometer: '', fuel_consumed: '', actual_distance: '' });
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

  return (
    <div className="p-container-padding">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary mb-2">
          <span>Logistics</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-medium">Active Trips</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-display-lg font-display-lg text-on-background">Trips & Logistics Log</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-surface-container-highest text-on-surface text-label-md font-label-md rounded border border-outline-variant hover:bg-surface-variant transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button 
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-primary-container text-on-primary text-label-md font-label-md rounded shadow-sm hover:bg-primary transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Entry
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Total Trips</p>
            <p className="text-headline-md font-headline-md text-on-surface mt-1">{trips.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined fill">route</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Active / Draft</p>
            <p className="text-headline-md font-headline-md text-on-surface mt-1">
              {trips.filter(t => t.status === 'Dispatched' || t.status === 'Draft').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined fill">local_shipping</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Completed</p>
            <p className="text-headline-md font-headline-md text-on-surface mt-1">
              {trips.filter(t => t.status === 'Completed').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined fill">check_circle</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="text-label-sm font-label-sm text-secondary uppercase tracking-wide">Cancelled</p>
            <p className="text-headline-md font-headline-md text-error mt-1">
              {trips.filter(t => t.status === 'Cancelled').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined fill">cancel</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-label-md font-label-md text-on-surface-variant h-[40px]">
                <th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10 w-[100px]">Trip ID</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Status</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Vehicle / Driver</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Origin -&gt; Destination</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10">Cargo & Dist</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap sticky top-0 bg-surface z-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-sm font-body-sm text-on-surface">
              {trips.map(t => (
                <tr key={t.id} className="border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors h-[56px]">
                  <td className="px-4 py-2 font-code text-primary font-medium">#{t.id}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-secondary border border-outline-variant">
                        <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                      </div>
                      <div>
                        <p className="font-medium text-on-surface">{t.vehicle_name}</p>
                        <p className="text-label-sm text-secondary">{t.driver_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t.source}</span>
                      <span className="material-symbols-outlined text-secondary text-[16px]">arrow_right_alt</span>
                      <span className="font-medium">{t.destination}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-on-surface">{t.cargo_weight} kg</p>
                    <p className="text-label-sm text-secondary">{t.planned_distance} km</p>
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    {t.status === 'Draft' && (
                      <>
                        <button onClick={() => dispatch(t.id)} className="text-primary hover:underline font-medium">Dispatch</button>
                        <button onClick={() => cancel(t.id)} className="text-error hover:underline font-medium ml-3">Cancel</button>
                      </>
                    )}
                    {t.status === 'Dispatched' && (
                      <>
                        <button onClick={() => setShowComplete(t.id)} className="text-tertiary hover:underline font-medium">Complete</button>
                        <button onClick={() => cancel(t.id)} className="text-error hover:underline font-medium ml-3">Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {trips.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-secondary">No trips available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Trip Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md shadow-xl border border-outline-variant">
            <h3 className="text-headline-sm font-headline-sm font-bold mb-4 text-on-background">Create New Trip</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-secondary mb-1">Source</label>
                  <input placeholder="Enter source" required value={form.source}
                    onChange={e => setForm({ ...form, source: e.target.value })}
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-secondary mb-1">Destination</label>
                  <input placeholder="Enter destination" required value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })}
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              
              <div>
                <label className="block text-label-sm font-label-sm text-secondary mb-1">Vehicle</label>
                <select required value={form.vehicle_id}
                  onChange={e => setForm({ ...form, vehicle_id: e.target.value })}
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.registration_number} — {v.name} (Max: {v.max_load_capacity}kg)
                    </option>
                  ))}
                </select>
                {vehicles.length === 0 && <p className="text-xs text-error mt-1">No vehicles available</p>}
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-secondary mb-1">Driver</label>
                <select required value={form.driver_id}
                  onChange={e => setForm({ ...form, driver_id: e.target.value })}
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Select Driver</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.license_category}
                    </option>
                  ))}
                </select>
                {drivers.length === 0 && <p className="text-xs text-error mt-1">No drivers available</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-secondary mb-1">Cargo Weight (kg)</label>
                  <input placeholder="Weight" type="number" min="0" required
                    value={form.cargo_weight}
                    onChange={e => setForm({ ...form, cargo_weight: e.target.value })}
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-secondary mb-1">Planned Distance (km)</label>
                  <input placeholder="Distance" type="number" min="0" required
                    value={form.planned_distance}
                    onChange={e => setForm({ ...form, planned_distance: e.target.value })}
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-secondary mb-1">Revenue (Optional)</label>
                <input placeholder="Revenue" type="number" min="0"
                  value={form.revenue}
                  onChange={e => setForm({ ...form, revenue: e.target.value })}
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary text-on-primary py-2 rounded-lg text-label-md font-label-md hover:bg-primary/90 transition-colors">
                  Create Trip
                </button>
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 border border-outline-variant py-2 rounded-lg text-label-md font-label-md hover:bg-surface-variant transition-colors text-on-surface">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complete Trip Modal */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-sm shadow-xl border border-outline-variant">
            <h3 className="text-headline-sm font-headline-sm font-bold mb-4 text-on-background">Complete Trip #{showComplete}</h3>
            <form onSubmit={complete} className="space-y-4">
              <div>
                <label className="block text-label-sm font-label-sm text-secondary mb-1">Final Odometer (km)</label>
                <input placeholder="Final odometer" type="number" min="0" required
                  value={completeForm.final_odometer}
                  onChange={e => setCompleteForm({ ...completeForm, final_odometer: e.target.value })}
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-secondary mb-1">Actual Distance (km)</label>
                <input placeholder="Actual distance" type="number" min="0" required
                  value={completeForm.actual_distance}
                  onChange={e => setCompleteForm({ ...completeForm, actual_distance: e.target.value })}
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-secondary mb-1">Fuel Consumed (liters)</label>
                <input placeholder="Fuel consumed" type="number" min="0" required
                  value={completeForm.fuel_consumed}
                  onChange={e => setCompleteForm({ ...completeForm, fuel_consumed: e.target.value })}
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-3 py-2 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-tertiary text-on-primary py-2 rounded-lg text-label-md font-label-md hover:bg-tertiary/90 transition-colors">
                  Complete Trip
                </button>
                <button type="button" onClick={() => setShowComplete(null)}
                  className="flex-1 border border-outline-variant py-2 rounded-lg text-label-md font-label-md hover:bg-surface-variant transition-colors text-on-surface">
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
