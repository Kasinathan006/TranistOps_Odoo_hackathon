import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/vehicles', label: 'Vehicles', icon: 'local_shipping' },
  { path: '/drivers', label: 'Drivers', icon: 'person' },
  { path: '/trips', label: 'Trips', icon: 'route' },
  { path: '/maintenance', label: 'Maintenance', icon: 'build' },
  { path: '/fuel', label: 'Fuel', icon: 'local_gas_station' },
  { path: '/reports', label: 'Reports', icon: 'assessment' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex flex-col h-full border-r border-outline-variant dark:border-[#334155] bg-surface dark:bg-[#0f172a] fixed left-0 top-0 w-sidebar-width z-50 transition-colors">
      <div className="h-header-height flex items-center px-gutter border-b border-outline-variant dark:border-[#334155] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary-container dark:bg-blue-900/60 text-on-primary-container dark:text-blue-300 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: `'FILL' 1`}}>local_shipping</span>
          </div>
          <div>
            <h1 className="text-headline-sm font-headline-sm font-bold text-primary dark:text-blue-400 truncate">Global Logistics</h1>
            <p className="text-label-sm font-label-sm text-secondary dark:text-slate-400 truncate">Fleet Management</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 pb-4 relative group">
          <button className="w-full flex items-center justify-center gap-2 bg-primary dark:bg-blue-600 text-on-primary dark:text-white rounded h-9 px-4 text-label-md font-label-md hover:bg-primary/90 dark:hover:bg-blue-500 transition-colors duration-150 shadow-sm">
            <span className="material-symbols-outlined text-sm">add</span>
            New Entry
          </button>
          
          <div className="absolute left-3 right-3 top-full mt-1 bg-surface dark:bg-[#1e293b] border border-outline dark:border-[#334155] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="py-1 flex flex-col">
              <Link to="/trips?new=true" className="px-4 py-2 hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md text-on-surface dark:text-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">route</span> New Trip
              </Link>
              <Link to="/vehicles?new=true" className="px-4 py-2 hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md text-on-surface dark:text-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">local_shipping</span> New Vehicle
              </Link>
              <Link to="/drivers?new=true" className="px-4 py-2 hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md text-on-surface dark:text-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">person</span> New Driver
              </Link>
              <Link to="/fuel?new=true" className="px-4 py-2 hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md text-on-surface dark:text-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">local_gas_station</span> Fuel Log
              </Link>
              <Link to="/maintenance?new=true" className="px-4 py-2 hover:bg-surface-container-high dark:hover:bg-slate-800 text-label-md text-on-surface dark:text-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">build</span> Maintenance
              </Link>
            </div>
          </div>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded transition-colors duration-150 text-label-md font-label-md ${
                  isActive 
                    ? 'text-primary dark:text-blue-400 border-l-4 border-primary dark:border-blue-400 bg-secondary-container/50 dark:bg-blue-900/30 font-semibold' 
                    : 'text-secondary dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border-l-4 border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link 
            className={`flex items-center gap-3 px-3 py-2 rounded transition-colors duration-150 text-label-md font-label-md mt-6 ${
              pathname.startsWith('/settings')
                ? 'text-primary dark:text-blue-400 border-l-4 border-primary dark:border-blue-400 bg-secondary-container/50 dark:bg-blue-900/30 font-semibold' 
                : 'text-secondary dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border-l-4 border-transparent'
            }`} 
            to="/settings"
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
