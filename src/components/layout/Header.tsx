import React, { useState } from 'react';
import { Search, Bell, Sun, ChevronRight, X, UserCheck, BookOpen, AlertTriangle, LogOut, Shield } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    globalSearch,
    setGlobalSearch,
    setCommandOpen,
    users,
    trainers,
    trainees,
    currentUser,
    logout,
  } = usePortal();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pendingUsersCount = users.filter((u) => u.status === 'Pending').length;
  const pendingTrainersCount = trainers.filter((t) => t.status === 'Pending').length;
  const pendingTraineesCount = trainees.filter((t) => t.trainingStatus === 'Pending').length;
  const totalPending = pendingUsersCount + pendingTrainersCount + pendingTraineesCount;

  // Derive Breadcrumb
  const getBreadcrumbs = () => {
    switch (activePage) {
      case 'dashboard':
        return { parent: 'Administrator', current: 'Governance Dashboard' };
      case 'users':
        return { parent: 'Administration', current: 'User Directory & Access Control' };
      case 'announcements':
        return { parent: 'Administration', current: 'Institutional Announcements' };
      case 'courses':
        return { parent: 'Learning Governance', current: 'Courses & Curriculum' };
      case 'competencies':
        return { parent: 'Learning Governance', current: 'Competency Models' };
      case 'assessments':
        return { parent: 'Learning Governance', current: 'Assessments Oversight' };
      case 'trainers':
        return { parent: 'Capacity Building', current: 'Domain Trainers Directory' };
      case 'trainees':
        return { parent: 'Capacity Building', current: 'Capacity Trainees Cohort' };
      case 'resources':
        return { parent: 'Capacity Building', current: 'Learning Resources' };
      case 'analytics':
        return { parent: 'Intelligence', current: 'Analytics Command Center' };
      case 'ai-insights':
        return { parent: 'Intelligence', current: 'AI Insights & Explainability' };
      case 'settings':
        return { parent: 'System', current: 'Settings & Configuration' };
      case 'audit-logs':
        return { parent: 'System', current: 'Audit Logs Trail' };
      default:
        return { parent: 'Portal', current: 'Overview' };
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span className="hover:text-slate-800 transition cursor-default">
          {breadcrumbs.parent}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">{breadcrumbs.current}</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search curricula, personnel..."
              className="w-64 pl-9 pr-12 py-1.5 bg-slate-50/80 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
            <button
              onClick={() => setCommandOpen(true)}
              className="absolute right-2 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-200/70 border border-slate-300/60 hover:text-slate-700 transition"
              title="Command Palette (Cmd+K)"
            >
              ⌘K
            </button>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative cursor-pointer border border-transparent hover:border-slate-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {totalPending > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <div className="font-bold text-xs text-slate-900">Governance Alerts</div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 transition p-1 rounded hover:bg-slate-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div
                  onClick={() => {
                    setActivePage('users');
                    setShowNotifications(false);
                  }}
                  className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/70 hover:bg-amber-100/70 cursor-pointer transition flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-amber-900">
                      {pendingUsersCount} Pending Registrations
                    </div>
                    <div className="text-[11px] text-amber-700">
                      Staff members require administrative approval.
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActivePage('ai-insights');
                    setShowNotifications(false);
                  }}
                  className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200/70 hover:bg-indigo-100/70 cursor-pointer transition flex items-start gap-2.5"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-indigo-900">
                      Forgetting Curve Alert
                    </div>
                    <div className="text-[11px] text-indigo-700">
                      24 learners flagged for spaced repetition review.
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActivePage('trainers');
                    setShowNotifications(false);
                  }}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100/70 cursor-pointer transition flex items-start gap-2.5"
                >
                  <UserCheck className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-800">
                      {pendingTrainersCount > 0 ? `${pendingTrainersCount} Faculty Instructor Reviews` : 'Faculty Instructor Directory'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Accreditation verification in NWP & Radar.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MoES • IMD Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50/80 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 select-none">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>MoES • IMD</span>
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            id="header-profile-avatar"
            className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs transition ring-2 ring-transparent hover:ring-indigo-300"
            title={`${currentUser.name} (${currentUser.role})`}
          >
            {currentUser.initials || 'A'}
          </button>

          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-100"
              id="header-profile-menu"
            >
              <div className="p-3 border-b border-slate-100 bg-slate-50/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                    {currentUser.role}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    {currentUser.department}
                  </span>
                </div>
              </div>

              <div className="p-1 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('dashboard');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Governance Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  id="header-signout-btn"
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition flex items-center gap-2 cursor-pointer mt-0.5"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
