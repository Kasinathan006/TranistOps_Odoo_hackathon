import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Trips from './pages/Trips';
import Maintenance from './pages/Maintenance';
import Fuel from './pages/Fuel';
import Reports from './pages/Reports';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Generated UI Components
import DriverManagement from './pages/generated/DriverManagement';
import FleetOverviewDashboard from './pages/generated/FleetOverviewDashboard';
import LogisticsReportsAnalytics from './pages/generated/LogisticsReportsAnalytics';
import MaintenanceServiceScheduler from './pages/generated/MaintenanceServiceScheduler';
import OperationalExpensesLedger from './pages/generated/OperationalExpensesLedger';
import SystemSettingsConfiguration from './pages/generated/SystemSettingsConfiguration';
import TmsLogin from './pages/generated/TmsLogin';
import TripsLogisticsLog from './pages/generated/TripsLogisticsLog';
import VehicleFleetRegistry from './pages/generated/VehicleFleetRegistry';

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen bg-surface">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="w-full h-full bg-background flex">
      <Sidebar />
      <main className="flex-1 flex flex-col md:ml-[260px] w-full md:w-[calc(100%-260px)] h-screen overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-auto bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/vehicles" element={<ProtectedLayout><Vehicles /></ProtectedLayout>} />
          <Route path="/drivers" element={<ProtectedLayout><Drivers /></ProtectedLayout>} />
          <Route path="/trips" element={<ProtectedLayout><Trips /></ProtectedLayout>} />
          <Route path="/maintenance" element={<ProtectedLayout><Maintenance /></ProtectedLayout>} />
          <Route path="/fuel" element={<ProtectedLayout><Fuel /></ProtectedLayout>} />
          <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
          
          {/* Generated UI Routes */}
          <Route path="/ui/driver-management" element={<DriverManagement />} />
          <Route path="/ui/fleet-overview-dashboard" element={<FleetOverviewDashboard />} />
          <Route path="/ui/logistics-reports-analytics" element={<LogisticsReportsAnalytics />} />
          <Route path="/ui/maintenance-service-scheduler" element={<MaintenanceServiceScheduler />} />
          <Route path="/ui/operational-expenses-ledger" element={<OperationalExpensesLedger />} />
          <Route path="/ui/system-settings-configuration" element={<SystemSettingsConfiguration />} />
          <Route path="/ui/tms-login" element={<TmsLogin />} />
          <Route path="/ui/trips-logistics-log" element={<TripsLogisticsLog />} />
          <Route path="/ui/vehicle-fleet-registry" element={<VehicleFleetRegistry />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
