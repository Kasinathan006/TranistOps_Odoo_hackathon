import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard', category: 'Operations' },
  { path: '/vehicles', label: 'Vehicles', icon: 'directions_car', category: 'Operations' },
  { path: '/drivers', label: 'Drivers', icon: 'badge', category: 'Operations' },
  { path: '/trips', label: 'Trips', icon: 'route', category: 'Operations' },
  { path: '/maintenance', label: 'Maintenance', icon: 'build', category: 'Management' },
  { path: '/fuel', label: 'Fuel & Expenses', icon: 'local_gas_station', category: 'Management' },
  { path: '/reports', label: 'Reports', icon: 'bar_chart', category: 'Management' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const renderNavGroup = (category) => (
    <div key={category}>
      <div className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 px-3 mt-4">{category}</div>
      {navItems.filter(item => item.category === category).map(item => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2.5 rounded-full group transition-colors ${
              isActive 
                ? 'bg-secondary-container text-on-secondary-container' 
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className={`material-symbols-outlined mr-3 ${isActive ? 'icon-fill' : ''}`}>{item.icon}</span>
            <span className="font-label-md flex-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="w-sidebar-width bg-surface-container-low border-r border-outline-variant flex flex-col transition-all duration-300">
      <div className="h-header-height flex items-center px-6 border-b border-outline-variant shrink-0">
        <span className="material-symbols-outlined text-primary text-3xl mr-3">local_shipping</span>
        <span className="font-headline-md text-on-surface">TransitOps</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {renderNavGroup('Operations')}
        {renderNavGroup('Management')}
      </nav>

      <div className="p-4 border-t border-outline-variant bg-surface-container-lowest mt-auto shrink-0">
        <div className="bg-surface-variant rounded-xl p-4">
          <div className="flex items-center mb-2">
            <span className="material-symbols-outlined text-primary mr-2">speed</span>
            <span className="font-label-md text-on-surface">Fleet Status</span>
          </div>
          <div className="flex justify-between text-body-sm text-on-surface-variant mb-1">
            <span>Active</span>
            <span className="font-medium text-tertiary">42/50</span>
          </div>
          <div className="w-full bg-outline-variant rounded-full h-1.5">
            <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
