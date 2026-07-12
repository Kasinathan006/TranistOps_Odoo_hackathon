import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SettingsSidebar = () => {
    const location = useLocation();
    
    const tabs = [
        { name: 'Company Profile', path: '/settings', icon: 'domain' },
        { name: 'User Management', path: '/settings/users', icon: 'group' },
        { name: 'Fleet Parameters', path: '/settings/fleet', icon: 'local_shipping' },
        { name: 'System Integrations', path: '/settings/integrations', icon: 'api' },
    ];

    return (
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-outline flex-shrink-0 bg-surface-container-lowest rounded-tl-xl md:rounded-bl-xl">
            <nav className="flex flex-row md:flex-col p-4 gap-2 overflow-x-auto md:overflow-visible">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link 
                            key={tab.name} 
                            to={tab.path} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md transition-all duration-200 shrink-0 text-left ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? 'icon-fill text-primary' : ''}`}>{tab.icon}</span>
                            {tab.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SettingsSidebar;
