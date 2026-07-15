import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest dark:bg-[#090d16] text-on-surface dark:text-slate-100 h-screen flex flex-col justify-center items-center relative transition-colors duration-200">
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2.5 rounded-full bg-surface dark:bg-[#1e293b] border border-outline-variant dark:border-[#334155] text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 shadow-sm transition-colors"
        title="Toggle theme"
      >
        <span className="material-symbols-outlined text-[20px] block">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      <div className="w-full max-w-[400px] px-gutter">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-surface-container dark:bg-blue-900/40 flex items-center justify-center rounded-DEFAULT border border-outline-variant dark:border-blue-500/30 mb-4 shadow-sm">
            <span className="material-symbols-outlined text-primary dark:text-blue-400 text-[24px]">local_shipping</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-slate-100">TMS Core</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">Global Logistics Fleet Management</p>
        </div>
        
        <div className="bg-surface-container-lowest dark:bg-[#0f172a] border border-outline-variant dark:border-[#334155] shadow-lg rounded-xl p-container-padding transition-colors">
          <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface dark:text-slate-100 mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-component-gap-dense">
            <div className="flex flex-col">
              <label className="font-label-md text-label-md font-medium text-on-surface dark:text-slate-300 mb-1.5" htmlFor="email">Email Address</label>
              <input
                className="h-[38px] w-full border border-outline-variant dark:border-[#334155] rounded-DEFAULT bg-surface-container-lowest dark:bg-[#1e293b] px-3 font-body-sm text-body-sm text-on-surface dark:text-slate-100 placeholder:text-outline dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-primary transition-all duration-150"
                id="email"
                name="email"
                placeholder="admin@transitops.com"
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            
            <div className="flex flex-col mt-3">
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-label-md text-label-md font-medium text-on-surface dark:text-slate-300" htmlFor="password">Password</label>
                <a className="font-label-sm text-label-sm text-primary dark:text-blue-400 hover:underline" href="#">Forgot password?</a>
              </div>
              <input
                className="h-[38px] w-full border border-outline-variant dark:border-[#334155] rounded-DEFAULT bg-surface-container-lowest dark:bg-[#1e293b] px-3 font-body-sm text-body-sm text-on-surface dark:text-slate-100 placeholder:text-outline dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-primary transition-all duration-150"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
            
            <div className="flex items-center mt-3 mb-4">
              <input
                className="h-4 w-4 rounded border-outline-variant dark:border-[#334155] text-primary focus:ring-primary dark:bg-[#1e293b]"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label className="ml-2 block font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400" htmlFor="remember-me">
                Remember me for 30 days
              </label>
            </div>
            
            <button
              className="w-full h-[38px] bg-primary dark:bg-blue-600 text-on-primary dark:text-white font-label-md text-label-md font-semibold rounded-DEFAULT hover:bg-primary/90 dark:hover:bg-blue-500 transition-colors duration-150 flex items-center justify-center disabled:opacity-50 shadow-sm"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 text-center bg-surface dark:bg-[#1e293b] py-2 px-3 rounded border border-outline-variant dark:border-[#334155]/60">
              Default credentials: <span className="font-mono text-primary dark:text-blue-400">admin@transitops.com</span> / <span className="font-mono text-primary dark:text-blue-400">admin123</span>
            </p>
          </form>
        </div>
        
        <div className="mt-8 text-center flex flex-col gap-2">
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
            Need an account? <a className="text-primary dark:text-blue-400 font-label-md hover:underline" href="#">Contact Administrator</a>
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-500 hover:text-on-surface dark:hover:text-slate-300" href="#">Terms of Service</a>
            <span className="text-outline-variant dark:text-slate-600">•</span>
            <a className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-500 hover:text-on-surface dark:hover:text-slate-300" href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
