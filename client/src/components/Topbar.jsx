import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="h-header-height bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center bg-surface-container-high rounded-full px-4 py-2 w-96 border border-outline-variant focus-within:border-primary focus-within:bg-surface-container-lowest transition-colors">
        <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
        <input type="text" placeholder="Search vehicles, drivers, or trips..." className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder-on-surface-variant outline-none" />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-outline-variant"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden md:block">
            <div className="font-label-md text-on-surface group-hover:text-primary transition-colors">{user?.name}</div>
            <div className="text-label-sm text-on-surface-variant">{user?.role}</div>
          </div>
          <button onClick={handleLogout} className="ml-2 text-on-surface-variant hover:text-error" title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
