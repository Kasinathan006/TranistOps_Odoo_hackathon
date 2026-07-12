import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/reports/analytics').then(r => setAnalytics(r.data));
  }, []);

  // Authenticated CSV download — fetches with JWT header, then triggers a browser download.
  const exportCSV = async (type) => {
    try {
      const { data } = await api.get(`/reports/export/${type}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error('Export failed');
    }
  };

  if (!analytics) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <div className="flex gap-2">
          <button onClick={() => exportCSV('vehicles')}
            className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            Export Vehicles CSV
          </button>
          <button onClick={() => exportCSV('trips')}
            className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            Export Trips CSV
          </button>
        </div>
      </div>

      {/* Fuel Efficiency Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Fuel Efficiency (km/liter)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={analytics.vehicle_analytics}>
            <XAxis dataKey="vehicle_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="fuel_efficiency" fill="#10b981" radius={[4, 4, 0, 0]} name="km/L" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Vehicle ROI Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Vehicle Performance & ROI</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Vehicle', 'Distance', 'Fuel Cost', 'Maintenance', 'Total Ops Cost', 'Revenue', 'ROI %'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {analytics.vehicle_analytics.map(v => (
              <tr key={v.vehicle_name} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{v.vehicle_name}</td>
                <td className="px-4 py-3">{Number(v.total_distance).toFixed(0)} km</td>
                <td className="px-4 py-3">₹{Number(v.fuel_cost).toFixed(0)}</td>
                <td className="px-4 py-3">₹{Number(v.maintenance_cost).toFixed(0)}</td>
                <td className="px-4 py-3 font-medium text-red-600">₹{Number(v.total_operational_cost).toFixed(0)}</td>
                <td className="px-4 py-3 font-medium text-green-600">₹{Number(v.total_revenue).toFixed(0)}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${v.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(v.roi).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
            {analytics.vehicle_analytics.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
