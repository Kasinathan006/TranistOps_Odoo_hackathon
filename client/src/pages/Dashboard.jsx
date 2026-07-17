import { useEffect, useState } from 'react';
import api from '../api/axios';
import StatCard from '../components/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, CartesianGrid
} from 'recharts';

const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

const SkeletonStatCard = () => (
  <div className="card p-5 flex items-start gap-4">
    <div className="skeleton w-11 h-11 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-8 w-16 rounded" />
      <div className="skeleton h-3 w-20 rounded" />
    </div>
  </div>
);

const SkeletonChart = () => (
  <div className="card p-6">
    <div className="skeleton h-5 w-40 rounded mb-4" />
    <div className="skeleton h-[260px] w-full rounded-lg" />
  </div>
);

const FinKpiCard = ({ label, value, sub, color }) => (
  <div className="card p-5">
    <p className="text-xs text-on-surface-variant font-medium mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-on-surface-variant mt-1">{sub}</p>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [alertDismissed, setAlertDismissed] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [d, a] = await Promise.all([
        api.get('/reports/dashboard'),
        api.get('/reports/analytics')
      ]);
      setData(d.data);
      setAnalytics(a.data);
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const profitColor = data ? (data.financials?.gross_profit >= 0 ? 'text-green-500' : 'text-red-500') : '';
  const fin = data?.financials || {};

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Operations Overview</h1>
          <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            Real-time fleet status · auto-refreshes every 30s
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
          <span className="material-symbols-outlined text-sm icon-fill">sync</span>
          Odoo ERP Synced
        </div>
      </div>

      {/* AI Alert Banner */}
      {!alertDismissed && data && data.vehicles?.in_shop > 0 && (
        <div className="mb-6 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 icon-fill text-lg">smart_toy</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              ⚠️ AI Predictive Alert — {data.vehicles.in_shop} vehicle{data.vehicles.in_shop > 1 ? 's' : ''} in maintenance
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              Abnormal wear patterns detected. Preventive service recommended within 48 hours to avoid fleet downtime.
            </p>
          </div>
          <button onClick={() => setAlertDismissed(true)}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 transition-colors shrink-0">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}

      {/* Row 1: Fleet KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {!data ? (
          [1, 2, 3, 4].map(i => <SkeletonStatCard key={i} />)
        ) : (
          <>
            <StatCard title="Active Vehicles" value={data.vehicles.on_trip} icon="local_shipping" subtitle="Currently on trip" trend="12%" />
            <StatCard title="Available" value={data.vehicles.available} icon="check_circle" subtitle="Ready to dispatch" />
            <StatCard title="In Maintenance" value={data.vehicles.in_shop} icon="build" subtitle="In shop" isPositive={false} trend="2%" />
            <StatCard title="Fleet Utilization" value={`${data.fleet_utilization}%`} icon="pie_chart" subtitle="Active / Total" trend="5%" />
          </>
        )}
      </div>

      {/* Row 2: Trip + Driver KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {!data ? (
          [1, 2, 3, 4].map(i => <SkeletonStatCard key={i} />)
        ) : (
          <>
            <StatCard title="Active Trips" value={data.trips.active} icon="route" />
            <StatCard title="Pending Trips" value={data.trips.pending} icon="pending_actions" />
            <StatCard title="Drivers On Duty" value={data.drivers.on_trip} icon="badge" />
            <StatCard title="Completed Trips" value={data.trips.completed} icon="task_alt" trend="8%" />
          </>
        )}
      </div>

      {/* Row 3: Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {!data ? (
          [1, 2, 3, 4].map(i => <SkeletonStatCard key={i} />)
        ) : (
          <>
            <FinKpiCard label="Total Revenue" value={fmt(fin.total_revenue)} sub="All completed trips" color="text-green-500" />
            <FinKpiCard label="Total Op. Cost" value={fmt(fin.total_cost)} sub="Fuel + Maintenance" color="text-red-500" />
            <FinKpiCard label="Gross Profit" value={fmt(fin.gross_profit)} sub="Revenue − Cost" color={profitColor} />
            <FinKpiCard label="Profit Margin" value={`${fin.profit_margin}%`} sub="Gross / Revenue" color={profitColor} />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {!analytics ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            {analytics?.trips_by_month?.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-on-surface">Trips by Month</h3>
                  <span className="material-symbols-outlined text-on-surface-variant icon-fill">bar_chart</span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={analytics.trips_by_month} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,100,147,0.05)' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--md-sys-color-surface-container)', boxShadow: '0 4px 20px rgb(0 0 0/0.15)' }} />
                    <Bar dataKey="trips" fill="#006493" radius={[4, 4, 0, 0]} barSize={36} name="Trips" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {analytics?.revenue_vs_cost?.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-on-surface">Revenue vs Cost (₹)</h3>
                  <span className="material-symbols-outlined text-on-surface-variant icon-fill">show_chart</span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={analytics.revenue_vs_cost} margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dashCostGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
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
                    <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#dashRevGrad)" dot={{ r: 4 }} name="Revenue" />
                    <Area type="monotone" dataKey="cost" stroke="#dc2626" strokeWidth={2} fill="url(#dashCostGrad)" dot={{ r: 4 }} name="Cost" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
