import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, CartesianGrid
} from 'recharts';

const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export default function Reports() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/reports/analytics').then(r => setAnalytics(r.data)).catch(() => toast.error('Failed to load analytics'));
  }, []);

  const exportCSV = async (type, filename) => {
    const tid = toast.loading(`Exporting ${filename}...`);
    try {
      const { data } = await api.get(`/reports/export/${type}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`${filename} downloaded`, { id: tid });
    } catch {
      toast.error('Export failed', { id: tid });
    }
  };

  if (!analytics) return <div className="text-center py-20 text-on-surface-variant">Loading analytics...</div>;

  const va = analytics.vehicle_analytics || [];
  const rvc = analytics.revenue_vs_cost || [];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-headline-sm text-on-surface">Reports &amp; Analytics</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Fleet performance, ROI, and financial exports</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => exportCSV('vehicles', 'vehicles.csv')}
            className="inline-flex items-center gap-2 border border-outline px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-base">download</span>Vehicles
          </button>
          <button onClick={() => exportCSV('trips', 'trips.csv')}
            className="inline-flex items-center gap-2 border border-outline px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-base">download</span>Trips
          </button>
          <button onClick={() => exportCSV('expenses', 'expenses.csv')}
            className="inline-flex items-center gap-2 border border-outline px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-base">download</span>Expenses
          </button>
          <button onClick={() => exportCSV('analytics', 'vehicle_analytics.csv')}
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-base">summarize</span>Full Analytics
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Fuel Efficiency Chart */}
        <div className="card p-6">
          <h3 className="font-title-lg text-on-surface mb-4">Fuel Efficiency (km / liter)</h3>
          {va.length === 0
            ? <p className="text-center py-12 text-on-surface-variant text-sm">No fuel data recorded yet</p>
            : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={va} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="vehicle_name" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(v) => [`${v} km/L`, 'Efficiency']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                  <Bar dataKey="fuel_efficiency" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="km/L" />
                </BarChart>
              </ResponsiveContainer>
            )}
        </div>

        {/* Revenue vs Cost Line Chart */}
        <div className="card p-6">
          <h3 className="font-title-lg text-on-surface mb-4">Revenue vs Cost — Last 6 Months</h3>
          {rvc.length === 0
            ? <p className="text-center py-12 text-on-surface-variant text-sm">No monthly data yet</p>
            : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={rvc} margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e1" />
                  <XAxis dataKey="month" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false}
                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip
                    formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} name="Revenue" />
                  <Line type="monotone" dataKey="cost" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} name="Cost" />
                </LineChart>
              </ResponsiveContainer>
            )}
        </div>
      </div>

      {/* Per-Vehicle ROI Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <h3 className="font-title-lg text-on-surface">Vehicle Performance &amp; ROI</h3>
          <p className="text-body-sm text-on-surface-variant mt-0.5">
            ROI = (Revenue − Op. Cost) / Acquisition Cost × 100
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container border-b border-outline-variant">
              <tr>
                {['Vehicle', 'Reg No.', 'Distance', 'Fuel Eff.', 'Fuel Cost', 'Maint. Cost', 'Total Cost', 'Revenue', 'Net Profit', 'ROI %'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-on-surface-variant font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {va.length === 0 && (
                <tr><td colSpan={10} className="text-center py-12 text-on-surface-variant">No vehicle data yet</td></tr>
              )}
              {va.map(v => {
                const netProfit = Number(v.total_revenue) - Number(v.total_operational_cost);
                const roiNum = Number(v.roi);
                return (
                  <tr key={v.vehicle_name} className="hover:bg-surface-container transition-colors">
                    <td className="px-4 py-3 font-medium text-on-surface">{v.vehicle_name}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{v.registration_number}</td>
                    <td className="px-4 py-3">{Number(v.total_distance).toFixed(0)} km</td>
                    <td className="px-4 py-3">
                      {Number(v.fuel_efficiency) > 0
                        ? <span className="text-sky-600 font-medium">{Number(v.fuel_efficiency).toFixed(1)} km/L</span>
                        : <span className="text-on-surface-variant">—</span>}
                    </td>
                    <td className="px-4 py-3 text-orange-600">{fmt(v.fuel_cost)}</td>
                    <td className="px-4 py-3 text-orange-600">{fmt(v.maintenance_cost)}</td>
                    <td className="px-4 py-3 font-medium text-red-600">{fmt(v.total_operational_cost)}</td>
                    <td className="px-4 py-3 font-medium text-green-600">{fmt(v.total_revenue)}</td>
                    <td className="px-4 py-3 font-semibold">
                      <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {netProfit >= 0 ? '+' : ''}{fmt(netProfit)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold
                        ${roiNum > 10 ? 'bg-green-100 text-green-700'
                          : roiNum >= 0 ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'}`}>
                        {roiNum.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
