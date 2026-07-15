import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 bg-surface-bright dark:bg-[#1e293b] h-header-height border-b border-outline-variant dark:border-[#334155] shadow-sm shrink-0 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-on-surface-variant dark:text-slate-300 p-2 rounded hover:bg-surface-container-high dark:hover:bg-slate-800">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="text-headline-sm font-headline-sm font-bold text-primary dark:text-blue-400 truncate hidden md:block">
          TMS Core
        </div>

        <div className="flex-1 max-w-md ml-4">
          <div className="relative flex items-center w-full h-9 rounded bg-surface dark:bg-[#0f172a] border border-outline-variant dark:border-[#334155] focus-within:ring-2 focus-within:ring-primary transition-all duration-150">
            <span className="material-symbols-outlined text-secondary dark:text-slate-400 ml-3 text-sm">search</span>
            <input className="w-full h-full bg-transparent border-none text-body-sm font-body-sm text-on-surface dark:text-slate-100 placeholder-secondary dark:placeholder-slate-400 focus:ring-0 px-2 outline-none" placeholder="Search vehicles, VIN, plates..." type="text"/>
            <div className="pr-2 flex gap-1">
              <span className="bg-surface-container-high dark:bg-[#1e293b] text-secondary dark:text-slate-300 px-1.5 rounded text-[10px] font-code border border-outline-variant dark:border-[#334155]">⌘</span>
              <span className="bg-surface-container-high dark:bg-[#1e293b] text-secondary dark:text-slate-300 px-1.5 rounded text-[10px] font-code border border-outline-variant dark:border-[#334155]">K</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <button 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors duration-150"
        >
          <span className="material-symbols-outlined text-[20px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors duration-150 relative">
          <span className="material-symbols-outlined text-[20px]" data-icon="notifications">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface-bright dark:border-[#1e293b]"></span>
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors duration-150 hidden sm:flex">
          <span className="material-symbols-outlined text-[20px]" data-icon="help_outline">help_outline</span>
        </button>
        <div className="h-6 w-px bg-outline-variant dark:bg-[#334155] mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-2 ml-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-primary-container dark:bg-blue-900/50 text-on-primary-container dark:text-blue-200 flex items-center justify-center font-label-sm font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-label-sm font-label-sm font-medium text-on-surface dark:text-slate-100 leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{user?.name}</div>
              <div className="text-[10px] text-secondary dark:text-slate-400 leading-tight">{user?.role}</div>
            </div>
            <button onClick={handleLogout} className="ml-1 text-on-surface-variant dark:text-slate-300 hover:text-error dark:hover:text-red-400 transition-colors" title="Logout">
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
        </div>
      </div>
    </header>
  );
}
