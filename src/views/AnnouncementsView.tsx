import React, { useState } from 'react';
import {
  Megaphone,
  Radio,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  GraduationCap,
  UserCheck,
  Search,
  Plus,
  Filter,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import {
  AnnouncementItem,
  AnnouncementTarget,
  AnnouncementPriority,
  AnnouncementCategory,
} from '../types';

export const AnnouncementsView: React.FC = () => {
  const {
    announcements,
    pushAnnouncement,
    unpushAnnouncement,
    togglePushAnnouncement,
    deleteAnnouncement,
    setIsCreateAnnouncementOpen,
    setActivePage,
    trainers,
    trainees,
  } = usePortal();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUSHED' | 'NOT_PUSHED'>('ALL');
  const [targetFilter, setTargetFilter] = useState<'ALL' | 'TRAINERS' | 'TRAINEES'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Metrics
  const totalAnnouncements = announcements.length;
  const pushedCount = announcements.filter((a) => a.isPushed).length;
  const notPushedCount = totalAnnouncements - pushedCount;
  const totalTrainersTargeted = announcements
    .filter((a) => a.isPushed && (a.target === 'ALL' || a.target === 'TRAINERS'))
    .reduce((acc, curr) => acc + (curr.deliveryStats?.trainersCount || trainers.length), 0);
  const totalTraineesTargeted = announcements
    .filter((a) => a.isPushed && (a.target === 'ALL' || a.target === 'TRAINEES'))
    .reduce((acc, curr) => acc + (curr.deliveryStats?.traineesCount || trainees.length), 0);

  // Filter logic
  const filtered = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'PUSHED'
        ? a.isPushed
        : !a.isPushed;

    const matchesTarget =
      targetFilter === 'ALL' ? true : a.target === targetFilter;

    const matchesCategory =
      categoryFilter === 'ALL' ? true : a.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesTarget && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12" id="announcements-view-root">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>INSTITUTIONAL BROADCAST DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Announcements &amp; Cohort Bulletins
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create administrative notices and push them directly to the Trainer and Trainee portal workspaces.
          </p>
        </div>
        <button
          onClick={() => setIsCreateAnnouncementOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition shadow-xs self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Compose Announcement</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL NOTICES</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{totalAnnouncements}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Registered bulletins</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">PUSHED LIVE</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 tracking-tight">{pushedCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Active broadcasts</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">DRAFTS & PENDING</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 tracking-tight">{notPushedCount}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Awaiting push</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">TOTAL AUDIENCE REACH</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{trainers.length + trainees.length}</div>
          <div className="text-xs text-slate-500 mt-1 font-normal">Trainers &amp; Trainees</div>
        </div>
      </div>

      {/* Quick Portal Jump Helper */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-slate-50/80 border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-slate-900">
              Live Destination Portal Synchronization
            </h3>
            <p className="text-[11px] text-slate-600">
              Announcements marked as <strong>Pushed</strong> automatically appear on the banner of the corresponding page.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActivePage('trainers')}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Open Trainers Page</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={() => setActivePage('trainees')}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Trainees Page</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Status Tabs: All / Pushed Live / Not Pushed (Drafts) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl shrink-0 overflow-x-auto text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Notices ({totalAnnouncements})
            </button>
            <button
              onClick={() => setStatusFilter('PUSHED')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                statusFilter === 'PUSHED'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pushed Live ({pushedCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('NOT_PUSHED')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
                statusFilter === 'NOT_PUSHED'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Not Pushed ({notPushedCount})</span>
            </button>
          </div>

          {/* Search Input & Select Dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search announcements..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Target Filter */}
            <select
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Destinations</option>
              <option value="TRAINERS">Trainers Page</option>
              <option value="TRAINEES">Trainees Page</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Categories</option>
              <option value="Curriculum Update">Curriculum</option>
              <option value="Exam Schedule">Exam Schedule</option>
              <option value="Operational Alert">Operational Alert</option>
              <option value="Administrative">Administrative</option>
              <option value="Workshop & Webinar">Workshops</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {totalAnnouncements === 0 ? (
          <div className="bg-white border border-dashed border-indigo-200 rounded-3xl p-12 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-4 shadow-xs">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">No Announcements Created Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              As an administrator, you can compose directives, exam schedules, or operational alerts and push them directly to the <strong>Trainers portal</strong> and <strong>Trainees portal</strong> in real-time.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsCreateAnnouncementOpen(true)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Announcement</span>
              </button>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-800">No Matching Announcements</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              No circulars match your current search and filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('ALL');
                setTargetFilter('ALL');
                setCategoryFilter('ALL');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((item) => {
            const isPushed = item.isPushed;

            let priorityBadge = 'bg-blue-50 text-blue-700 border border-blue-200';
            if (item.priority === 'HIGH') priorityBadge = 'bg-amber-50 text-amber-700 border border-amber-200';
            if (item.priority === 'URGENT') priorityBadge = 'bg-rose-50 text-rose-700 border border-rose-200';

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-5 shadow-xs transition hover:shadow-md ${
                  isPushed
                    ? 'border-slate-200/90'
                    : 'border-amber-200/90 bg-gradient-to-r from-amber-50/20 via-white to-white'
                }`}
                id={`announcement-card-${item.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Main Content */}
                  <div className="space-y-2.5 flex-1 min-w-0">
                    {/* Status & Badges Line */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* PUSH STATUS INDICATOR */}
                      {isPushed ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>PUSHED LIVE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>NOT PUSHED (DRAFT)</span>
                        </span>
                      )}

                      {/* Target Audience Pill */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {item.target === 'ALL' && (
                          <>
                            <Users className="w-3 h-3" />
                            <span>Trainers &amp; Trainees</span>
                          </>
                        )}
                        {item.target === 'TRAINERS' && (
                          <>
                            <GraduationCap className="w-3 h-3 text-blue-600" />
                            <span>Trainers Page Only</span>
                          </>
                        )}
                        {item.target === 'TRAINEES' && (
                          <>
                            <UserCheck className="w-3 h-3 text-emerald-600" />
                            <span>Trainees Page Only</span>
                          </>
                        )}
                      </span>

                      {/* Priority Pill */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${priorityBadge}`}>
                        {item.priority}
                      </span>

                      {/* Category Pill */}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                    </div>

                    {/* Announcement Title */}
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                      {item.title}
                    </h2>

                    {/* Content Text */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                      {item.content}
                    </p>

                    {/* Footer Info: Author, Created Date, Push Timestamp */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1">
                      <span className="font-semibold text-slate-700">
                        By {item.author}
                      </span>
                      <span>•</span>
                      <span>Created: {item.createdAt}</span>
                      {isPushed && item.pushedAt && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Pushed: {item.pushedAt}
                          </span>
                        </>
                      )}
                      {isPushed && (
                        <>
                          <span>•</span>
                          <span className="text-slate-500 font-medium">
                            Reach: {item.target === 'ALL' || item.target === 'TRAINERS' ? `${trainers.length} Trainers` : ''}
                            {item.target === 'ALL' ? ' + ' : ''}
                            {item.target === 'ALL' || item.target === 'TRAINEES' ? `${trainees.length} Trainees` : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Actions Bar */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {/* PRIMARY PUSH / UNPUSH BUTTON */}
                    {isPushed ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => unpushAnnouncement(item.id)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                          title="Withdraw broadcast from user pages"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Recall / Unpush</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => pushAnnouncement(item.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition shadow-xs flex items-center gap-1.5"
                          title="Broadcast immediately to target page"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Push Now</span>
                        </button>
                      </div>
                    )}

                    {/* Secondary Actions: Quick Target Change or Preview */}
                    <div className="flex items-center gap-2 text-xs">
                      {/* Target Quick switcher */}
                      <select
                        value={item.target}
                        onChange={(e) => pushAnnouncement(item.id, e.target.value as AnnouncementTarget)}
                        className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600"
                        title="Change push destination"
                      >
                        <option value="ALL">Push: Both</option>
                        <option value="TRAINERS">Push: Trainers Only</option>
                        <option value="TRAINEES">Push: Trainees Only</option>
                      </select>

                      {/* View on destination page link */}
                      <button
                        onClick={() => {
                          if (item.target === 'TRAINERS') {
                            setActivePage('trainers');
                          } else {
                            setActivePage('trainees');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                        title="Preview destination page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteAnnouncement(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Callout Strip if Not Pushed */}
                {!isPushed && (
                  <div className="mt-3 pt-3 border-t border-amber-100/80 flex items-center justify-between text-xs text-amber-800 bg-amber-50/50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium text-[11px]">
                        <strong>Not currently visible to users.</strong> Click &ldquo;Push Now&rdquo; to broadcast this notice onto the <strong>{item.target === 'ALL' ? 'Trainers & Trainees' : item.target === 'TRAINERS' ? 'Trainers' : 'Trainees'}</strong> portal banner.
                      </span>
                    </div>
                    <button
                      onClick={() => pushAnnouncement(item.id)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline whitespace-nowrap ml-3"
                    >
                      Push to live portals &rarr;
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
