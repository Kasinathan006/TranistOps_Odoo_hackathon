import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 bg-surface-bright h-header-height border-b border-outline-variant shadow-sm shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-on-surface-variant p-2 rounded hover:bg-surface-container-high">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="text-headline-sm font-headline-sm font-bold text-primary truncate hidden md:block">
          TMS Core
        </div>

        <div className="flex-1 max-w-md ml-4">
          <div className="relative flex items-center w-full h-9 rounded bg-surface border border-outline-variant focus-within:ring-2 focus-within:ring-primary transition-all duration-150">
            <span className="material-symbols-outlined text-secondary ml-3 text-sm">search</span>
            <input className="w-full h-full bg-transparent border-none text-body-sm font-body-sm text-on-surface placeholder-secondary focus:ring-0 px-2 outline-none" placeholder="Search vehicles, VIN, plates..." type="text"/>
            <div className="pr-2 flex gap-1">
              <span className="bg-surface-container-high text-secondary px-1.5 rounded text-[10px] font-code border border-outline-variant">⌘</span>
              <span className="bg-surface-container-high text-secondary px-1.5 rounded text-[10px] font-code border border-outline-variant">K</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-150 relative">
          <span className="material-symbols-outlined text-[20px]" data-icon="notifications">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface-bright"></span>
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-150 hidden sm:flex">
          <span className="material-symbols-outlined text-[20px]" data-icon="help_outline">help_outline</span>
        </button>
        <div className="h-6 w-px bg-outline-variant mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-2 ml-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-label-sm font-label-sm font-medium text-on-surface leading-tight group-hover:text-primary transition-colors">{user?.name}</div>
              <div className="text-[10px] text-secondary leading-tight">{user?.role}</div>
            </div>
            <button onClick={handleLogout} className="ml-1 text-on-surface-variant hover:text-error transition-colors" title="Logout">
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
        </div>
      </div>
    </header>
  );
}
