import { useEffect, useState } from 'react';
import api from '../api/axios';
import StatCard from '../components/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, CartesianGrid
} from 'recharts';

const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [analytics, setAnalytics] = useState(null);

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

  if (!data) return <div className="text-center py-20 text-on-surface-variant">Loading...</div>;

  const fin = data.financials || {};
  const profitColor = fin.gross_profit >= 0 ? 'text-green-600' : 'text-red-500';

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-headline-sm text-on-surface">Operations Overview</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Real-time fleet status · auto-refreshes every 30s</p>
      </div>

      {/* Row 1: Fleet KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="Active Vehicles" value={data.vehicles.on_trip} icon="local_shipping" subtitle="Currently on trip" trend="12%" />
        <StatCard title="Available" value={data.vehicles.available} icon="check_circle" subtitle="Ready to dispatch" />
        <StatCard title="In Maintenance" value={data.vehicles.in_shop} icon="build" subtitle="In shop" isPositive={false} trend="2%" />
        <StatCard title="Fleet Utilization" value={`${data.fleet_utilization}%`} icon="pie_chart" subtitle="Active / Total" trend="5%" />
      </div>

      {/* Row 2: Trip + Driver KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="Active Trips" value={data.trips.active} icon="route" />
        <StatCard title="Pending Trips" value={data.trips.pending} icon="pending_actions" />
        <StatCard title="Drivers On Duty" value={data.drivers.on_trip} icon="badge" />
        <StatCard title="Completed Trips" value={data.trips.completed} icon="task_alt" trend="8%" />
      </div>

      {/* Row 3: Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-body-sm text-on-surface-variant mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">{fmt(fin.total_revenue)}</p>
          <p className="text-body-sm text-on-surface-variant mt-1">All completed trips</p>
        </div>
        <div className="card p-5">
          <p className="text-body-sm text-on-surface-variant mb-1">Total Op. Cost</p>
          <p className="text-2xl font-bold text-red-500">{fmt(fin.total_cost)}</p>
          <p className="text-body-sm text-on-surface-variant mt-1">Fuel + Maintenance</p>
        </div>
        <div className="card p-5">
          <p className="text-body-sm text-on-surface-variant mb-1">Gross Profit</p>
          <p className={`text-2xl font-bold ${profitColor}`}>{fmt(fin.gross_profit)}</p>
          <p className="text-body-sm text-on-surface-variant mt-1">Revenue − Cost</p>
        </div>
        <div className="card p-5">
          <p className="text-body-sm text-on-surface-variant mb-1">Profit Margin</p>
          <p className={`text-2xl font-bold ${profitColor}`}>{fin.profit_margin}%</p>
          <p className="text-body-sm text-on-surface-variant mt-1">Gross / Revenue</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trips by Month */}
        {analytics?.trips_by_month?.length > 0 && (
          <div className="card p-6">
            <h3 className="font-title-lg text-on-surface mb-6">Trips by Month</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analytics.trips_by_month} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#e1e3e1' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="trips" fill="#006493" radius={[4, 4, 0, 0]} barSize={36} name="Trips" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Revenue vs Cost by Month */}
        {analytics?.revenue_vs_cost?.length > 0 && (
          <div className="card p-6">
            <h3 className="font-title-lg text-on-surface mb-6">Revenue vs Cost (₹)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={analytics.revenue_vs_cost} margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e1" />
                <XAxis dataKey="month" stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8e918f" fontSize={11} tickLine={false} axisLine={false}
                  tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                <Tooltip
                  formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} name="Revenue" />
                <Line type="monotone" dataKey="cost" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} name="Cost" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
