import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back, Admin!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setEmail('kram56447@gmail.com');
    setPassword('admin12345');
    toast.success('Filled admin credentials!');
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal Sign In | Dream Computer Patna</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0A101E] flex items-center justify-center p-4 cyber-grid-bg">
        <div className="w-full max-w-md bg-[#121826] border border-[#303746] rounded-2xl shadow-2xl overflow-hidden p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#0A101E] border border-[#BEF8A1] flex items-center justify-center mx-auto mb-3 shadow-glow-subtle">
              <span className="font-orbitron font-black text-xl text-[#BEF8A1]">D</span>
            </div>
            <h1 className="font-orbitron font-bold text-xl text-[#F5F5F7] tracking-wider uppercase">
              DREAM COMPUTER ADMIN
            </h1>
            <p className="text-xs text-[#8B929E] mt-1 font-inter">
              Secure Management Console • Patna HQ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kram56447@gmail.com"
                  className="w-full bg-[#191F2D] border border-[#303746] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-rajdhani uppercase font-bold text-[#B7BBC5] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8B929E] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#191F2D] border border-[#303746] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#BEF8A1]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#BEF8A1] hover:bg-[#C3FFA5] text-[#0A101E] font-rajdhani font-bold text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-glow-subtle transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-[#303746] text-center">
            <button
              type="button"
              onClick={fillTestCredentials}
              className="text-xs text-[#BEF8A1] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Default Demo Credentials</span>
            </button>
            <div className="text-[11px] text-[#8B929E] mt-1 font-mono">
              kram56447@gmail.com / admin12345
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
