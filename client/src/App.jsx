import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Generated UI Components
import TmsLogin from './pages/generated/TmsLogin';

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen bg-surface">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto p-container-padding pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}

// A simple placeholder dashboard for when logged in
function DashboardPlaceholder() {
  return <div className="p-4"><h1 className="text-2xl text-on-surface">Welcome!</h1><p className="text-on-surface-muted">This is a placeholder dashboard for Hour 1.</p></div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedLayout><DashboardPlaceholder /></ProtectedLayout>} />
          
          {/* Generated UI Routes */}
          <Route path="/ui/tms-login" element={<TmsLogin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
