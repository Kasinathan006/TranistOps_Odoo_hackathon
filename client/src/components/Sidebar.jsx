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
    <aside className="hidden md:flex flex-col h-full border-r border-outline-variant bg-surface fixed left-0 top-0 w-sidebar-width z-50">
      <div className="h-header-height flex items-center px-gutter border-b border-outline-variant shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: `'FILL' 1`}}>local_shipping</span>
          </div>
          <div>
            <h1 className="text-headline-sm font-headline-sm font-bold text-primary truncate">Global Logistics</h1>
            <p className="text-label-sm font-label-sm text-secondary truncate">Fleet Management</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 pb-4">
          <button className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary rounded h-9 px-4 text-label-md font-label-md hover:bg-surface-tint transition-colors duration-150 shadow-sm">
            <span className="material-symbols-outlined text-sm">add</span>
            New Entry
          </button>
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
                    ? 'text-primary border-l-4 border-primary bg-secondary-container/50' 
                    : 'text-secondary hover:bg-surface-container-high border-l-4 border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link className="flex items-center gap-3 px-3 py-2 rounded text-secondary hover:bg-surface-container-high border-l-4 border-transparent transition-colors duration-150 text-label-md font-label-md mt-6" to="/settings">
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
