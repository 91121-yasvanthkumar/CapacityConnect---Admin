import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  BookOpen,
  Brain,
  FileCheck,
  GraduationCap,
  UserCheck,
  Library,
  BarChart3,
  Sparkles,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldAlert,
  Megaphone,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageId } from '../../types';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    sidebarCollapsed,
    setSidebarCollapsed,
    announcements,
    currentUser,
    logout,
  } = usePortal();

  const pushedCount = announcements.filter((a) => a.isPushed).length;

  const navGroups: NavGroup[] = [
    {
      title: 'GOVERNANCE',
      items: [
        { id: 'dashboard', label: 'Governance Dashboard', icon: LayoutDashboard },
        { id: 'announcements', label: 'Announcements', icon: Megaphone },
        { id: 'users', label: 'User Directory', icon: Users },
      ],
    },
    {
      title: 'LEARNING GOVERNANCE',
      items: [
        { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen },
        { id: 'competencies', label: 'Competency Models', icon: Brain },
        { id: 'assessments', label: 'Assessments', icon: FileCheck },
      ],
    },
    {
      title: 'CAPACITY BUILDING',
      items: [
        { id: 'trainers', label: 'Trainers', icon: GraduationCap },
        { id: 'trainees', label: 'Trainees', icon: UserCheck },
        { id: 'resources', label: 'Learning Resources', icon: Library },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'ai-insights', label: 'AI Insights', icon: Sparkles },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'audit-logs', label: 'Audit Logs', icon: Activity },
      ],
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between select-none z-30 shrink-0 h-full ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActivePage('dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xs">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="font-extrabold text-slate-900 text-sm leading-tight tracking-tight">
                  Capacity Connect
                </div>
                <div className="text-[9.5px] font-bold text-blue-600 tracking-wider uppercase">
                  MOES / IMD PORTAL
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav Groups */}
        <div className="px-2.5 py-1.5 flex-1 overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-0.5">
                {!sidebarCollapsed && (
                  <div className="px-2 py-0.5 text-[9px] font-bold text-slate-400 tracking-wider">
                    {group.title}
                  </div>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-indigo-600' : 'text-slate-400'
                          }`}
                        />
                        {!sidebarCollapsed && (
                          <div className="flex items-center justify-between flex-1 min-w-0">
                            <span className="truncate">{item.label}</span>
                            {item.id === 'announcements' && pushedCount > 0 && (
                              <span className="px-1.5 py-0.2 text-[9px] font-black rounded-full bg-emerald-100 text-emerald-700">
                                {pushedCount}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 shrink-0">
        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-1 px-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium transition mb-1.5 cursor-pointer"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[11px]">Collapse</span>
            </>
          )}
        </button>

        {/* User Card */}
        <div
          className={`flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
          title={`${currentUser.name} (${currentUser.role})`}
        >
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
            {currentUser.initials || 'A'}
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentUser.email}
              </div>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <button
            onClick={() => logout()}
            id="sidebar-signout-btn"
            className="w-full mt-1.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg py-1 font-medium transition cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
};
