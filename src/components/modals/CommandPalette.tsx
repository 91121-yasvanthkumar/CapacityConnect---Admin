import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  Users,
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
  X,
  PlusCircle,
  Megaphone,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { PageId } from '../../types';
import { BotSvgIcon } from '../chat/BotSvgIcon';

export const CommandPalette: React.FC = () => {
  const {
    commandOpen,
    setCommandOpen,
    setActivePage,
    setIsInviteUserOpen,
    setIsCreateCourseOpen,
    setIsAddCompetencyOpen,
    setIsCreateAssessmentOpen,
    setIsUploadResourceOpen,
    setIsCreateAnnouncementOpen,
    setIsChatBotOpen,
  } = usePortal();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (e.key === 'Escape' && commandOpen) {
        setCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandOpen, setCommandOpen]);

  if (!commandOpen) return null;

  const pages: { id: PageId; label: string; icon: React.ElementType; section: string }[] = [
    { id: 'dashboard', label: 'Governance Dashboard', icon: LayoutDashboard, section: 'Governance' },
    { id: 'announcements', label: 'Announcements & Broadcasts', icon: Megaphone, section: 'Governance' },
    { id: 'users', label: 'User Directory & Access Control', icon: Users, section: 'Governance' },
    { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen, section: 'Learning' },
    { id: 'competencies', label: 'Competency Models & Frameworks', icon: Brain, section: 'Learning' },
    { id: 'assessments', label: 'Assessments Oversight', icon: FileCheck, section: 'Learning' },
    { id: 'trainers', label: 'Domain Trainers Directory', icon: GraduationCap, section: 'Capacity' },
    { id: 'trainees', label: 'Capacity Trainees Cohort', icon: UserCheck, section: 'Capacity' },
    { id: 'resources', label: 'Learning Resources & Media', icon: Library, section: 'Capacity' },
    { id: 'analytics', label: 'Institutional Analytics Command Center', icon: BarChart3, section: 'Intelligence' },
    { id: 'ai-insights', label: 'AI Skill-Gap & Revision Intelligence', icon: Sparkles, section: 'Intelligence' },
    { id: 'settings', label: 'System Settings', icon: Settings, section: 'System' },
    { id: 'audit-logs', label: 'Platform Audit Trail', icon: Activity, section: 'System' },
  ];

  const filteredPages = pages.filter(
    (p) =>
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.section.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Search header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or jump to page..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={() => setCommandOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-2 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => {
              setCommandOpen(false);
              setIsChatBotOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition cursor-pointer"
          >
            <BotSvgIcon className="w-3.5 h-3.5 text-white" />
            Capacity AI Desk
          </button>
          <button
            onClick={() => {
              setCommandOpen(false);
              setIsCreateAnnouncementOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-700 font-medium transition"
          >
            <Megaphone className="w-3.5 h-3.5 text-indigo-600" />
            New Announcement
          </button>
          <button
            onClick={() => {
              setCommandOpen(false);
              setIsInviteUserOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-700 font-medium transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
            Invite User
          </button>
          <button
            onClick={() => {
              setCommandOpen(false);
              setIsCreateCourseOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-700 font-medium transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
            Create Course
          </button>
          <button
            onClick={() => {
              setCommandOpen(false);
              setIsAddCompetencyOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-700 font-medium transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
            Add Competency
          </button>
        </div>

        {/* Results list */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filteredPages.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setCommandOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.section}</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 font-medium">
                  Jump ↵
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
