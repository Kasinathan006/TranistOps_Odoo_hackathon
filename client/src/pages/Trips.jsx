import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Draft: 'bg-gray-100 text-gray-700',
  Dispatched: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
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
    const [t, v, d] = await Promise.all([
      api.get('/trips'),
      api.get('/vehicles/available'),
      api.get('/drivers/available')
    ]);
    setTrips(t.data);
    setVehicles(v.data);
    setDrivers(d.data);
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
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  const dispatch = async (id) => {
    try {
      await api.patch(`/trips/${id}/dispatch`);
      toast.success('Trip dispatched — Vehicle and Driver are now On Trip');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error');
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
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  const cancel = async (id) => {
    if (!confirm('Cancel this trip?')) return;
    try {
      await api.patch(`/trips/${id}/cancel`);
      toast.success('Trip cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trip Management</h2>
        <button onClick={() => setShowCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + New Trip
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['ID', 'Route', 'Vehicle', 'Driver', 'Cargo', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trips.map(t => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">#{t.id}</td>
                <td className="px-4 py-3">
                  <span className="font-medium">{t.source}</span>
                  <span className="text-gray-400 mx-1">→</span>
                  <span>{t.destination}</span>
                </td>
                <td className="px-4 py-3">{t.vehicle_name}</td>
                <td className="px-4 py-3">{t.driver_name}</td>
                <td className="px-4 py-3">{t.cargo_weight} kg</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {t.status === 'Draft' && (
                    <>
                      <button onClick={() => dispatch(t.id)} className="text-blue-600 hover:underline">Dispatch</button>
                      <button onClick={() => cancel(t.id)} className="text-red-500 hover:underline">Cancel</button>
                    </>
                  )}
                  {t.status === 'Dispatched' && (
                    <>
                      <button onClick={() => setShowComplete(t.id)} className="text-green-600 hover:underline">Complete</button>
                      <button onClick={() => cancel(t.id)} className="text-red-500 hover:underline">Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {trips.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No trips yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Trip Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">Create New Trip</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <input placeholder="Source *" required value={form.source}
                onChange={e => setForm({ ...form, source: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Destination *" required value={form.destination}
                onChange={e => setForm({ ...form, destination: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <select required value={form.vehicle_id}
                onChange={e => setForm({ ...form, vehicle_id: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Vehicle *</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.registration_number} — {v.name} (Max: {v.max_load_capacity}kg)
                  </option>
                ))}
              </select>
              {vehicles.length === 0 && (
                <p className="text-xs text-red-500">No vehicles available for dispatch</p>
              )}
              <select required value={form.driver_id}
                onChange={e => setForm({ ...form, driver_id: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Driver *</option>
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.license_category} (Exp: {d.license_expiry})
                  </option>
                ))}
              </select>
              {drivers.length === 0 && (
                <p className="text-xs text-red-500">No drivers available for dispatch</p>
              )}
              <input placeholder="Cargo Weight (kg) *" type="number" min="0" required
                value={form.cargo_weight}
                onChange={e => setForm({ ...form, cargo_weight: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Planned Distance (km) *" type="number" min="0" required
                value={form.planned_distance}
                onChange={e => setForm({ ...form, planned_distance: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Revenue (₹)" type="number" min="0"
                value={form.revenue}
                onChange={e => setForm({ ...form, revenue: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">
                  Create Trip
                </button>
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complete Trip Modal */}
      {showComplete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-4">Complete Trip #{showComplete}</h3>
            <form onSubmit={complete} className="space-y-3">
              <input placeholder="Final Odometer (km) *" type="number" min="0" required
                value={completeForm.final_odometer}
                onChange={e => setCompleteForm({ ...completeForm, final_odometer: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Actual Distance (km) *" type="number" min="0" required
                value={completeForm.actual_distance}
                onChange={e => setCompleteForm({ ...completeForm, actual_distance: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Fuel Consumed (liters) *" type="number" min="0" required
                value={completeForm.fuel_consumed}
                onChange={e => setCompleteForm({ ...completeForm, fuel_consumed: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium">
                  Complete Trip
                </button>
                <button type="button" onClick={() => setShowComplete(null)}
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
