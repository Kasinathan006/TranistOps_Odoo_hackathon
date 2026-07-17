import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const COMMANDS = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: 'dashboard', path: '/', group: 'Navigate' },
  { id: 'vehicles', label: 'Go to Vehicles', icon: 'directions_car', path: '/vehicles', group: 'Navigate' },
  { id: 'drivers', label: 'Go to Drivers', icon: 'badge', path: '/drivers', group: 'Navigate' },
  { id: 'trips', label: 'Go to Trips', icon: 'route', path: '/trips', group: 'Navigate' },
  { id: 'maintenance', label: 'Go to Maintenance', icon: 'build', path: '/maintenance', group: 'Navigate' },
  { id: 'fuel', label: 'Go to Fuel & Expenses', icon: 'local_gas_station', path: '/fuel', group: 'Navigate' },
  { id: 'reports', label: 'Go to Reports', icon: 'analytics', path: '/reports', group: 'Navigate' },
  { id: 'theme', label: 'Toggle Dark / Light Mode', icon: 'dark_mode', action: 'theme', group: 'Actions' },
  { id: 'logout', label: 'Logout', icon: 'logout', action: 'logout', group: 'Actions' },
];

function CommandPalette({ onClose, onToggleTheme, onLogout }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const run = (cmd) => {
    if (cmd.path) { navigate(cmd.path); onClose(); }
    else if (cmd.action === 'theme') { onToggleTheme(); onClose(); }
    else if (cmd.action === 'logout') { onLogout(); onClose(); }
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) { run(filtered[selected]); }
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => { setSelected(0); }, [query]);

  const groups = [...new Set(filtered.map(c => c.group))];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-[12vh] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-[#e2e5f1] dark:border-[#334155] w-full max-w-xl overflow-hidden animate-fade-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e2e5f1] dark:border-[#334155]">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search commands, pages, actions..."
            className="flex-1 bg-transparent text-on-surface placeholder-on-surface-variant text-sm outline-none"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0f2fc] dark:bg-[#334155] text-on-surface-variant border border-[#c3c6d7] dark:border-[#475569]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-sm text-on-surface-variant">
              <span className="material-symbols-outlined block text-3xl mb-2 opacity-30">search_off</span>
              No commands found
            </div>
          ) : groups.map(group => (
            <div key={group}>
              <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                {group}
              </p>
              {filtered.filter(c => c.group === group).map((cmd, idx) => {
                const globalIdx = filtered.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setSelected(globalIdx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      selected === globalIdx
                        ? 'bg-primary/10 text-primary'
                        : 'text-on-surface hover:bg-[#f0f2fc] dark:hover:bg-[#334155]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg icon-fill ${
                      selected === globalIdx ? 'text-primary' : 'text-on-surface-variant'
                    }`}>{cmd.icon}</span>
                    <span className="text-sm flex-1">{cmd.label}</span>
                    {selected === globalIdx && (
                      <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">↵</kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-[#e2e5f1] dark:border-[#334155] flex items-center gap-4 text-[10px] text-on-surface-variant">
          <span><kbd className="font-mono">↑↓</kbd> Navigate</span>
          <span><kbd className="font-mono">↵</kbd> Select</span>
          <span><kbd className="font-mono">ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

export default function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showPalette, setShowPalette] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(p => !p);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-gutter w-full sticky top-0 z-40 bg-surface-bright dark:bg-[#1e293b] h-header-height border-b border-outline-variant dark:border-[#334155] shadow-sm shrink-0 transition-colors">
        <div className="flex items-center gap-4 flex-1">
          <button className="md:hidden text-on-surface-variant dark:text-slate-300 p-2 rounded hover:bg-surface-container-high dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="text-headline-sm font-headline-sm font-bold text-primary dark:text-blue-400 truncate hidden md:block">
            TMS Core
          </div>

          {/* Search Bar / Command Palette Trigger */}
          <div className="flex-1 max-w-md ml-4">
            <button
              onClick={() => setShowPalette(true)}
              className="relative flex items-center w-full h-9 rounded bg-surface dark:bg-[#0f172a] border border-outline-variant dark:border-[#334155] hover:border-primary dark:hover:border-blue-500 focus:ring-2 focus:ring-primary transition-all duration-150 px-3 gap-2 text-left group"
            >
              <span className="material-symbols-outlined text-secondary dark:text-slate-400 text-sm">search</span>
              <span className="flex-1 text-body-sm font-body-sm text-secondary dark:text-slate-400 group-hover:text-on-surface transition-colors">
                Search or run command...
              </span>
              <div className="flex gap-1 shrink-0">
                <span className="bg-surface-container-high dark:bg-[#1e293b] text-secondary dark:text-slate-300 px-1.5 rounded text-[10px] font-code border border-outline-variant dark:border-[#334155]">⌘</span>
                <span className="bg-surface-container-high dark:bg-[#1e293b] text-secondary dark:text-slate-300 px-1.5 rounded text-[10px] font-code border border-outline-variant dark:border-[#334155]">K</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications */}
          <button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors duration-150 relative">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface-bright dark:border-[#1e293b] animate-pulse" />
          </button>

          {/* Help */}
          <button className="w-9 h-9 flex items-center justify-center rounded text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-colors duration-150 hidden sm:flex">
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          <div className="h-6 w-px bg-outline-variant dark:bg-[#334155] mx-1 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-2 ml-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-primary-container dark:bg-blue-900/50 text-on-primary-container dark:text-blue-200 flex items-center justify-center font-label-sm font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-label-sm font-label-sm font-medium text-on-surface dark:text-slate-100 leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                {user?.name}
              </div>
              <div className="text-[10px] text-secondary dark:text-slate-400 leading-tight">{user?.role}</div>
            </div>
            <button onClick={handleLogout}
              className="ml-1 text-on-surface-variant dark:text-slate-300 hover:text-error dark:hover:text-red-400 transition-colors" title="Logout">
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      {showPalette && (
        <CommandPalette
          onClose={() => setShowPalette(false)}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
