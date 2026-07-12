import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    <div className="bg-surface-container-lowest text-on-surface h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-[400px] px-gutter">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-DEFAULT border border-outline-variant mb-4">
            <span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">TMS Core</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Global Logistics Fleet Management</p>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[6px] p-container-padding">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-component-gap-dense">
            <div className="flex flex-col">
              <label className="font-label-md text-label-md text-on-surface mb-1" htmlFor="email">Email Address</label>
              <input
                className="h-[36px] w-full border border-outline-variant rounded-DEFAULT bg-surface-container-lowest px-3 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
                id="email"
                name="email"
                placeholder="user@logistics.com"
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            
            <div className="flex flex-col mt-3">
              <div className="flex justify-between items-center mb-1">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <input
                className="h-[36px] w-full border border-outline-variant rounded-DEFAULT bg-surface-container-lowest px-3 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
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
                className="h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label className="ml-2 block font-body-sm text-body-sm text-on-surface-variant" htmlFor="remember-me">
                Remember me for 30 days
              </label>
            </div>
            
            <button
              className="w-full h-[36px] bg-primary-container text-on-primary font-label-md text-label-md rounded-DEFAULT hover:bg-primary transition-colors duration-150 flex items-center justify-center disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <p className="text-xs text-on-surface-variant mt-2 text-center">
              Default: admin@transitops.com / admin123
            </p>
          </form>
        </div>
        
        <div className="mt-8 text-center flex flex-col gap-2">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Need an account? <a className="text-primary font-label-md hover:underline" href="#">Contact Administrator</a>
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface" href="#">Terms of Service</a>
            <span className="text-outline-variant">•</span>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface" href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
