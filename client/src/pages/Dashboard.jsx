import { useEffect, useState } from 'react';
import api from '../api/axios';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-headline-sm text-on-surface">Operations Overview</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Real-time fleet status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Active Vehicles" value={data.vehicles.on_trip} icon="local_shipping" subtitle="Currently on trip" trend="12%" />
        <StatCard title="Available" value={data.vehicles.available} icon="check_circle" subtitle="Ready to dispatch" />
        <StatCard title="In Maintenance" value={data.vehicles.in_shop} icon="build" subtitle="In shop" isPositive={false} trend="2%" />
        <StatCard title="Fleet Utilization" value={`${data.fleet_utilization}%`} icon="pie_chart" subtitle="Active / Total" trend="5%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Active Trips" value={data.trips.active} icon="route" />
        <StatCard title="Pending Trips" value={data.trips.pending} icon="pending_actions" />
        <StatCard title="Drivers On Duty" value={data.drivers.on_trip} icon="badge" />
        <StatCard title="Completed Trips" value={data.trips.completed} icon="task_alt" trend="8%" />
      </div>

      {analytics?.trips_by_month?.length > 0 && (
        <div className="card p-6">
          <h3 className="font-title-lg text-on-surface mb-6">Trips by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.trips_by_month} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#8e918f" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8e918f" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#e1e3e1' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="trips" fill="#006493" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
