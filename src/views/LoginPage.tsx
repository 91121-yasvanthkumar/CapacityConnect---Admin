import React, { useState } from 'react';
import {
  CloudSun,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, showToast, trainees, setTrainees } = usePortal();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('admin@enterprise.com');
  const [password, setPassword] = useState('GovtSecure#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Trainee Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCenter, setRegCenter] = useState('IMD HQ New Delhi');
  const [regSpecialization, setRegSpecialization] = useState('Numerical Weather Prediction (NWP)');
  const [regSubmitted, setRegSubmitted] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your official email address.', {
        title: 'Input Required',
        type: 'warning',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Determine role from email
      let role: UserRole = 'ADMIN';
      if (email.toLowerCase().includes('trainer') || email.toLowerCase().includes('faculty')) {
        role = 'TRAINER';
      } else if (email.toLowerCase().includes('trainee') || email.toLowerCase().includes('cadet')) {
        role = 'TRAINEE';
      }

      login(email, password, role);
      setIsLoading(false);
    }, 450);
  };

  const handleQuickLogin = (role: UserRole, demoEmail: string) => {
    setEmail(demoEmail);
    setIsLoading(true);
    setTimeout(() => {
      login(demoEmail, 'demoPassword', role);
      setIsLoading(false);
    }, 300);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      showToast('Please provide your full name and official email.', {
        title: 'Missing Fields',
        type: 'warning',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newTrainee = {
        id: `trn-${Date.now()}`,
        name: regName,
        email: regEmail,
        initials: regName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        department: regCenter,
        enrolledCurricula: 1,
        competencyScore: 60,
        trainingStatus: 'Pending' as const,
        riskIndicator: 'Healthy' as const,
      };

      setTrainees([newTrainee, ...trainees]);
      setIsLoading(false);
      setRegSubmitted(true);
      showToast(`Registration submitted for ${regName}. Awaiting Admin accreditation approval.`, {
        title: 'Registration Pending Approval',
        type: 'success',
        badge: 'Pending',
      });
    }, 500);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-[#080d1a] relative overflow-hidden font-sans"
      id="login-page"
    >
      {/* Subtle Ambient Radial Glows matching screenshot */}
      <div className="absolute -top-36 -left-36 w-[520px] h-[520px] bg-indigo-950/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-36 -right-36 w-[540px] h-[540px] bg-[#0c1c44]/50 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Login Card */}
      <div
        className="w-full max-w-[390px] bg-white rounded-[24px] p-5 sm:p-6 shadow-2xl shadow-black/50 border border-slate-100/90 relative z-10"
        id="login-card"
      >
        {/* Top MoES / IMD Pill Badge */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f4ff] border border-[#dbe4fe] text-[#3c52c4] text-[11px] font-semibold select-none"
            id="login-portal-badge"
          >
            <CloudSun className="w-3.5 h-3.5 text-[#4945e4]" />
            <span>MoES / IMD Capacity Building Portal</span>
          </div>
        </div>

        {/* Shield Emblem Logo + Title Header */}
        <div className="flex items-center justify-center gap-2.5 mt-3.5" id="login-header-group">
          <div
            className="w-10 h-10 rounded-xl bg-[#4945e4] flex items-center justify-center text-white shadow-md shadow-indigo-600/25 shrink-0"
            id="login-logo-container"
          >
            <ShieldCheck className="w-5 h-5 stroke-[2.3]" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
              Capacity Connect
            </h1>
            <p className="text-[11px] font-bold text-slate-500">
              Atmospheric & Climate Sciences LMS
            </p>
          </div>
        </div>

        {/* Header Description */}
        <p className="text-center text-[11px] text-slate-500 font-normal mt-2.5 max-w-[320px] mx-auto leading-relaxed">
          Official learning management, competency certification, and operational meteorological training.
        </p>

        {/* Segmented Control Tabs */}
        <div
          className="grid grid-cols-2 p-1 bg-[#f1f5f9] rounded-xl mt-4 text-xs"
          id="login-tab-switcher"
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin');
              setRegSubmitted(false);
            }}
            id="tab-official-signin"
            className={`py-1.5 px-2.5 rounded-lg font-bold transition-all cursor-pointer text-center text-xs ${
              activeTab === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Official Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            id="tab-trainee-registration"
            className={`py-1.5 px-2.5 rounded-lg font-bold transition-all cursor-pointer text-center text-xs ${
              activeTab === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Trainee Registration
          </button>
        </div>

        {/* Tab 1: Official Sign In Form */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="mt-4 space-y-3" id="official-signin-form">
            {/* Email Address */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-slate-800 mb-1"
              >
                Official Email Address
              </label>
              <div className="relative rounded-xl border border-[#dbe3ee] bg-[#f2f6fc] focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition shadow-2xs">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@enterprise.com"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs text-slate-800 font-medium bg-transparent placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-slate-800 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-xl border border-[#dbe3ee] bg-[#f2f6fc] focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  className="w-full pl-9 pr-9 py-2 text-xs text-slate-800 font-medium bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  id="toggle-password-visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 transition cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              id="btn-signin-submit"
              className="w-full mt-4 py-2.5 px-4 bg-[#4945e4] hover:bg-[#3d39cf] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 stroke-[2.3]" />
                  <span>Sign In to Capacity Connect</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Trainee Registration Form */}
        {activeTab === 'register' && (
          <div className="mt-5" id="trainee-registration-container">
            {regSubmitted ? (
              <div className="text-center py-6 px-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.3]" />
                </div>
                <h3 className="text-sm font-bold text-emerald-950">Registration Submitted</h3>
                <p className="text-xs text-emerald-800 mt-1.5 leading-relaxed">
                  Your registration dossier has been routed to the Institutional Registrar. You will receive an official notification once approved.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signin');
                    setRegSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  Return to Official Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Cadet / Trainee Full Name
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Lt. Rajat Vardhan"
                    required
                    className="w-full px-3.5 py-2 text-xs text-slate-800 font-medium bg-[#f2f6fc] border border-[#dbe3ee] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Official Govt. / IMD Email
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="rajat.vardhan@imd.gov.in"
                    required
                    className="w-full px-3.5 py-2 text-xs text-slate-800 font-medium bg-[#f2f6fc] border border-[#dbe3ee] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Center / Station
                    </label>
                    <select
                      value={regCenter}
                      onChange={(e) => setRegCenter(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-slate-800 font-medium bg-[#f2f6fc] border border-[#dbe3ee] rounded-xl focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option>IMD HQ New Delhi</option>
                      <option>IMD Pune Climate Centre</option>
                      <option>DWR Chennai Station</option>
                      <option>Cyclone Centre Kolkata</option>
                      <option>Agromet Hyderabad Cell</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Cohort Track
                    </label>
                    <select
                      value={regSpecialization}
                      onChange={(e) => setRegSpecialization(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-slate-800 font-medium bg-[#f2f6fc] border border-[#dbe3ee] rounded-xl focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option>Numerical Weather Prediction</option>
                      <option>Radar & Severe Storms</option>
                      <option>Satellite Meteorology</option>
                      <option>Aviation Weather Operations</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  id="btn-register-submit"
                  className="w-full mt-4 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Submit Trainee Registration Request</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Info (Govt. Enterprise RBAC & MoES • IMD Digital Portal) */}
        <div
          className="flex items-center justify-between text-[10.5px] text-slate-500 pt-3.5 mt-4 border-t border-slate-100"
          id="login-card-footer"
        >
          <div className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
            <Lock className="w-3.5 h-3.5 text-emerald-600 stroke-[2.4]" />
            <span>Govt. Enterprise RBAC</span>
          </div>
          <span className="text-slate-400 font-medium select-none">
            MoES • IMD Digital Portal
          </span>
        </div>
      </div>

      {/* Quick Demo Role Switcher (Positioned subtly outside login card) */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 relative z-10 select-none">
        <span className="text-slate-400 text-[10.5px]">Demo quick access:</span>
        <button
          type="button"
          onClick={() => handleQuickLogin('ADMIN', 'admin@enterprise.com')}
          className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer text-[10.5px] font-medium"
        >
          Admin
        </button>
        <button
          type="button"
          onClick={() => handleQuickLogin('TRAINER', 'trainer.radar@imd.gov.in')}
          className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer text-[10.5px] font-medium"
        >
          Trainer
        </button>
        <button
          type="button"
          onClick={() => handleQuickLogin('TRAINEE', 'trainee.delhi@imd.gov.in')}
          className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer text-[10.5px] font-medium"
        >
          Trainee
        </button>
      </div>
    </div>
  );
};
