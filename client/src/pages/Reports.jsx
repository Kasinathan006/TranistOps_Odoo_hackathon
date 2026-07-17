import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, CartesianGrid, AreaChart, Area
} from 'recharts';

const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

const KpiCard = ({ title, value, subtitle, icon, color }) => (
  <div className="card p-5 flex items-start gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <span className="material-symbols-outlined text-xl icon-fill">{icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wide truncate">{title}</p>
      <p className="text-2xl font-bold text-on-surface mt-0.5 truncate">{value}</p>
      {subtitle && <p className="text-xs text-on-surface-variant mt-0.5 truncate">{subtitle}</p>}
    </div>
  </div>
);

const SkeletonKpi = () => (
  <div className="card p-5 flex items-start gap-4">
    <div className="skeleton w-11 h-11 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-7 w-32 rounded" />
      <div className="skeleton h-3 w-20 rounded" />
    </div>
  </div>
);

const SkeletonChart = () => (
  <div className="card p-6">
    <div className="skeleton h-5 w-48 rounded mb-4" />
    <div className="skeleton h-[250px] w-full rounded-lg" />
  </div>
);

export default function Reports() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports/analytics')
      .then(r => setAnalytics(r.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
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

  const va = analytics?.vehicle_analytics || [];
  const rvc = analytics?.revenue_vs_cost || [];

  // Compute summary KPIs
  const totalRevenue = va.reduce((s, v) => s + Number(v.total_revenue || 0), 0);
  const totalCost = va.reduce((s, v) => s + Number(v.total_operational_cost || 0), 0);
  const netProfit = totalRevenue - totalCost;
  const avgFuelEff = va.length ? (va.reduce((s, v) => s + Number(v.fuel_efficiency || 0), 0) / va.filter(v => Number(v.fuel_efficiency) > 0).length || 0) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-1.5">
            <span>Analytics</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-medium">Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Reports & Analytics</h1>
          <p className="text-sm text-on-surface-variant mt-1">Fleet performance, ROI breakdown, and financial exports</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { type: 'vehicles', file: 'vehicles.csv', label: 'Vehicles', icon: 'directions_car' },
            { type: 'trips', file: 'trips.csv', label: 'Trips', icon: 'route' },
            { type: 'expenses', file: 'expenses.csv', label: 'Expenses', icon: 'receipt_long' },
          ].map(({ type, file, label, icon }) => (
            <button key={type} onClick={() => exportCSV(type, file)}
              className="btn-ghost gap-1.5 text-xs h-8 px-3">
              <span className="material-symbols-outlined text-base">{icon}</span>
              {label}
            </button>
          ))}
          <button onClick={() => exportCSV('analytics', 'vehicle_analytics.csv')}
            className="btn-primary gap-1.5 text-xs h-8 px-3">
            <span className="material-symbols-outlined text-base">summarize</span>
            Full Report
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading ? (
          [1, 2, 3, 4].map(i => <SkeletonKpi key={i} />)
        ) : (
          <>
            <KpiCard title="Total Revenue" value={fmt(totalRevenue)} subtitle="All completed trips"
              icon="trending_up" color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" />
            <KpiCard title="Total Op. Cost" value={fmt(totalCost)} subtitle="Fuel + Maintenance"
              icon="payments" color="bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400" />
            <KpiCard title="Net Profit" value={fmt(netProfit)} subtitle="Revenue minus cost"
              icon="account_balance_wallet" color={netProfit >= 0
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "bg-orange-100 dark:bg-orange-900/30 text-orange-500"} />
            <KpiCard title="Avg Fuel Efficiency" value={`${avgFuelEff.toFixed(1)} km/L`} subtitle={`Across ${va.length} vehicles`}
              icon="local_gas_station" color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {loading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            {/* Fuel Efficiency Chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-on-surface">Fuel Efficiency (km / liter)</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-base icon-fill">local_gas_station</span>
              </div>
              {va.length === 0
                ? <div className="flex flex-col items-center justify-center h-[250px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-30">bar_chart</span>
                    <p className="text-sm">No fuel data recorded yet</p>
                  </div>
                : (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={va} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="vehicle_name" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        formatter={(v) => [`${v} km/L`, 'Efficiency']}
                        contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--md-sys-color-surface-container)', boxShadow: '0 4px 20px rgb(0 0 0/0.15)' }} />
                      <Bar dataKey="fuel_efficiency" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="km/L" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
            </div>

            {/* Revenue vs Cost */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-on-surface">Revenue vs Cost — Last 6 Months</h3>
                <span className="material-symbols-outlined text-on-surface-variant text-base icon-fill">show_chart</span>
              </div>
              {rvc.length === 0
                ? <div className="flex flex-col items-center justify-center h-[250px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-30">trending_up</span>
                    <p className="text-sm">No monthly data yet</p>
                  </div>
                : (
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={rvc} margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(142,145,143,0.2)" />
                      <XAxis dataKey="month" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false}
                        tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                      <Tooltip
                        formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--md-sys-color-surface-container)', boxShadow: '0 4px 20px rgb(0 0 0/0.15)' }} />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revGradient)" dot={{ r: 4 }} name="Revenue" />
                      <Area type="monotone" dataKey="cost" stroke="#dc2626" strokeWidth={2} fill="url(#costGradient)" dot={{ r: 4 }} name="Cost" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
            </div>
          </>
        )}
      </div>

      {/* Per-Vehicle ROI Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e5f1] dark:border-[#334155] flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-on-surface">Vehicle Performance & ROI</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              ROI = (Revenue − Op. Cost) / Acquisition Cost × 100
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant icon-fill">analytics</span>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3].map(i => <div key={i} className="skeleton h-12 w-full rounded-lg" />)}
            </div>
          ) : (
            <table className="w-full text-sm dense-table">
              <thead>
                <tr>
                  {['Vehicle', 'Reg No.', 'Distance', 'Fuel Eff.', 'Fuel Cost', 'Maint. Cost', 'Total Cost', 'Revenue', 'Net Profit', 'ROI %'].map(h => (
                    <th key={h} className="whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {va.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-12">
                      <span className="material-symbols-outlined block text-4xl text-on-surface-variant opacity-30 mb-2">table_chart</span>
                      <span className="text-on-surface-variant">No vehicle data yet</span>
                    </td>
                  </tr>
                )}
                {va.map(v => {
                  const netP = Number(v.total_revenue) - Number(v.total_operational_cost);
                  const roiNum = Number(v.roi);
                  return (
                    <tr key={v.vehicle_name}>
                      <td className="font-medium text-on-surface">{v.vehicle_name}</td>
                      <td className="text-on-surface-variant font-mono text-xs">{v.registration_number}</td>
                      <td>{Number(v.total_distance).toFixed(0)} km</td>
                      <td>
                        {Number(v.fuel_efficiency) > 0
                          ? <span className="text-sky-500 font-medium">{Number(v.fuel_efficiency).toFixed(1)} km/L</span>
                          : <span className="text-on-surface-variant">—</span>}
                      </td>
                      <td className="text-orange-500">{fmt(v.fuel_cost)}</td>
                      <td className="text-orange-500">{fmt(v.maintenance_cost)}</td>
                      <td className="font-medium text-red-500">{fmt(v.total_operational_cost)}</td>
                      <td className="font-medium text-green-500">{fmt(v.total_revenue)}</td>
                      <td className="font-semibold">
                        <span className={netP >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {netP >= 0 ? '+' : ''}{fmt(netP)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-chip font-bold
                          ${roiNum > 10 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : roiNum >= 0 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                          {roiNum.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
